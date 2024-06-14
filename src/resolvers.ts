import { Resolvers } from './types'

const allReviews = [
  { id: '1', text: 'Wow, what an experience! I"ve never stayed in a cave before, so I was a little unprepared. Luckily, this listing had all the amenities I needed to feel safe and prepared for anything.', rating: 4, listingId: 'listing-1'},
    { id: '2', text: '100% enjoyed the wilderness experience. Do not book if you are not an adventurer and lover of the outdoors.', rating: 5, listingId: 'listing-1'},
    { id: '3',  text: 'I thought this was going to be a cozy cave, but I was sorely disappointed. The mattress was hard, I could feel stones digging into my back. And it was COLD. They need to be more clear about this on the description.', rating: 1, listingId: 'listing-1'},
    { id: '4',  text: 'The COOLEST yurt I"ve ever been in!!! Check it out, you won"t regret it. The force shield is next level, we had a meteor shower come in the last night and besides a few rumbles, you couldn"t even tell!', rating: 5, listingId: 'listing-2'},
    { id: '5',  text: 'Meh, could be better honestly. I was expecting more. The lake was the only good part.', rating: 2, listingId: 'listing-3'},
    { id: '6',  text: 'Description was accurate. It was indeed a cave campsite in the snowy part of the planet. Exactly what I needed.', rating: 5, listingId: 'listing-1'},
    { id: '7',  text: 'I had a really long stay in Origae-6 for a work trip. The pod was small, but it had all I needed. Although I was starting to get space-crazy by the last week, I managed to survive.', rating: 4, listingId: 'listing-8'}
]

export const resolvers: Resolvers = {
  Query: {
    allReviews: () => {
      return allReviews;
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
    }
};