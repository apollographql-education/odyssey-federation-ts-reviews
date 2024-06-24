import { Resolvers } from './types'

export const resolvers: Resolvers = {
  Query: {
    allReviews: async (_, __, {dataSources}) => {
      return dataSources.reviewsDb.getAllReviews();
    },
  },
  Mutation: {
    submitReview: (_, {listingId, review}, ) => {

      return {
        code: 200,
        success: true,
        message: 'worked',
        review: {
          id: '7',
          ...review
        }
      }
    }
    },
};