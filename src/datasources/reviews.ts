import { Sequelize, DataTypes } from "sequelize";
import config from "../sequelize/config/config.js"

import { ReviewModel, Review } from "../sequelize/models/review"

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
}

export default ReviewsDB;