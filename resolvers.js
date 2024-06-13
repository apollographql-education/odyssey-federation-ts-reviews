const { AuthenticationError } = require("./utils/errors");

const resolvers = {
  Mutation: {
    submitGuestReview: async (
      _,
      { bookingId, guestReview },
      { dataSources, userId }
    ) => {
      if (!userId) throw AuthenticationError();

      const { rating, text } = guestReview;
      const guestId = await dataSources.bookingsDb.getGuestIdForBooking(
        bookingId
      );

      const createdReview = await dataSources.reviewsDb.createReviewForGuest({
        bookingId,
        guestId,
        authorId: userId,
        text,
        rating,
      });
      return {
        code: 200,
        success: true,
        message: "Successfully submitted review for guest",
        guestReview: createdReview,
      };
    },
    submitHostAndLocationReviews: async (
      _,
      { bookingId, hostReview, locationReview },
      { dataSources, userId }
    ) => {
      if (!userId) throw AuthenticationError();

      const listingId = await dataSources.bookingsDb.getListingIdForBooking(
        bookingId
      );
      const createdLocationReview =
        await dataSources.reviewsDb.createReviewForListing({
          bookingId,
          listingId,
          authorId: userId,
          text: locationReview.text,
          rating: locationReview.rating,
        });

      const { hostId } = await dataSources.listingsAPI.getListing(listingId);
      const createdHostReview = await dataSources.reviewsDb.createReviewForHost(
        {
          bookingId,
          hostId,
          authorId: userId,
          text: hostReview.text,
          rating: hostReview.rating,
        }
      );

      return {
        code: 200,
        success: true,
        message: "Successfully submitted review for host and location",
        hostReview: createdHostReview,
        locationReview: createdLocationReview,
      };
    },
  },
  Listing: {
    overallRating: async ({ id }, _, { dataSources }) => {
      return await dataSources.reviewsDb.getOverallRatingForListing(id);
    },
    reviews: async ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getReviewsForListing(id);
    },
  },
  Booking: {
    guestReview: async ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getReviewForBooking("GUEST", id);
    },
    hostReview: async ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getReviewForBooking("HOST", id);
    },
    locationReview: async ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getReviewForBooking("LISTING", id);
    },
  },
  Review: {
    __resolveReference: async ({ id }, { dataSources }) => {
      return dataSources.reviewsDb.getReview(id);
    },
    author: async (parent, _, { dataSources }) => {
      const role = parent.targetType === "LISTING" ? "Guest" : "Host";
      return { __typename: role, id: parent.authorId };
    },
  },
  Host: {
    overallRating: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getOverallRatingForHost(id);
    },
  },
};

module.exports = resolvers;
