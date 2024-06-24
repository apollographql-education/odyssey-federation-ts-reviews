import ReviewsDB from "./datasources/reviews";

export type DataSourceContext = {
  dataSources: {
    reviewsDb: ReviewsDB;
  };
};