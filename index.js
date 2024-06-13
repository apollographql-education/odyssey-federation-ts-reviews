const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const { readFileSync } = require("fs");
const axios = require("axios");
const gql = require("graphql-tag");

const { AuthenticationError } = require("./utils/errors");

const typeDefs = gql(readFileSync("./reviews.graphql", { encoding: "utf-8" }));
const resolvers = require("./resolvers");
const ListingsAPI = require("./datasources/listings");
const ReviewsDb = require("./datasources/reviews");
const BookingsDb = require("./datasources/bookings");

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,
    }),
  });

  const port = process.env.PORT || 4005;
  const subgraphName = "reviews";

  try {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const userId = token.split(" ")[1]; // get the user name after 'Bearer '

        let userInfo = {};
        if (userId) {
          const { data } = await axios
            .get(
              `https://rt-airlock-services-account.herokuapp.com/login/${userId}`
            )
            .catch((error) => {
              throw AuthenticationError();
            });

          userInfo = { userId: data.id, userRole: data.role };
        }

        return {
          ...userInfo,
          dataSources: {
            listingsAPI: new ListingsAPI(),
            reviewsDb: new ReviewsDb(),
            bookingsDb: new BookingsDb(),
          },
        };
      },
      listen: {
        port,
      },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();
