import { Sequelize, DataTypes } from "sequelize";
import config from "./sequelize/config/config.js"
import { v4 as uuidv4 } from "uuid" 

import { ReviewModel, Review } from "./sequelize/models/review"

const env = process.env.NODE_ENV || 'development'
const configEnv = config[env as keyof typeof config]

class ReviewsDB {
  constructor() {
     this.db = this.initializeSequelizeDb();
  }

  db;

  initializeSequelizeDb(): {
    Review: typeof Review;
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
} {
    let sequelize;


    sequelize = new Sequelize(
      configEnv.database,
      configEnv.username,
      configEnv.password,
      { dialect: 'sqlite', storage: 'src/datasources/reviews.db'}
    )

    const db = {
      Review: ReviewModel(sequelize, DataTypes),
      sequelize: sequelize,
      Sequelize: Sequelize,
    }

    return db;

  }

  async getReview(id: string) {
    return this.db.Review.findByPk(id);
  }

  async getAllReviews() {
    return this.db.Review.findAll();
  }

  async getReviewsByListing(id: string) {
    return this.db.Review.findAll({where: { listingId: id }})
  }

  async createReviewForListing({ listingId, text, rating }: { listingId: string, text: string, rating: number }) {
    const review = await this.db.Review.create({
      id: uuidv4(),
      text,
      rating,
      listingId
    })

    return review;
  }

  async getOverallRatingForListing(listingId: string) {
    const review = await this.db.Review.findOne({
      where: { listingId },
      attributes: [
        [
          this.db.sequelize.fn("AVG", this.db.sequelize.col("rating")),
          "avg_rating",
        ],
      ],
    });

    // @ts-ignore
    return review.getDataValue("avg_rating") as number;
  }
}

export default ReviewsDB;
