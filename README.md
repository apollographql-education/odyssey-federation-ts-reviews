# (Odyssey Course) Federation with TypeScript - Reviews Subgraph

Welcome to the starter code for the **reviews** subgraph in the Odyssey course, **Federation with TypeScript**. You can find the [course lessons and instructions](https://apollographql.com/tutorials/federation-typescript) on Odyssey, [Apollo](https://apollographql.com)'s learning platform.

## How to use this repo

The course will walk you step by step on what to do. This is the `reviews` subgraph, which we'll introduce into our newborn supergraph as we go through the course.

In order to install and run the project locally, navigate into the `reviews` directory and run:

```shell
npm install && npm run dev
```

Right now, `reviews` is a GraphQL server that reads and writes review data, running on `http://localhost:4001`. You can use visit `http://localhost:4001` directly, or use [Apollo Sandbox](https://studio.apollographql.com/sandbox?endpoint=http://localhost:5059/graphql) to connect to the endpoint and send queries.

Try running this query:

```graphql
query GetAllReviews {
  allReviews {
    id
    text
    rating
  }
}
```

The `final-code` branch of the [course's starter code repo](https://github.com/apollographql-education/odyssey-federation-typescript/commits/final-code/) contains the final state of this repo, with all of the steps and code completed! If you get stuck, you can refer to it and compare your code.

## Getting Help

This repo is _not regularly monitored_.

For any issues or problems concerning the course content, please refer to the [Odyssey topic in our community forums](https://community.apollographql.com/tags/c/help/6/odyssey). You can also [join the Apollo Discord](https://discord.gg/graphos).
