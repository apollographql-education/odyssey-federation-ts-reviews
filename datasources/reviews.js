const { v4: uuidv4 } = require("uuid");
const Sequelize = require("sequelize");
const Review = require("../sequelize/models/review");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../sequelize/config/config.json")[env];

class ReviewsDb {
  constructor() {
    const db = this.initializeSequelizeDb();
    this.db = db;
  }

  initializeSequelizeDb() {
    let sequelize;
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
      );
    }

    const db = {};
    db.Review = Review(sequelize, Sequelize.DataTypes);
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
  }

  async getReview(id) {
    return this.db.Review.findByPk(id);
  }

  async getReviewsByUser(userId) {
    return this.db.Review.findAll({ where: { authorId: userId } });
  }

  async getOverallRatingForListing(listingId) {
    const overallRating = await this.db.Review.findOne({
      where: { targetType: "LISTING", targetId: listingId },
      attributes: [
        [
          this.db.sequelize.fn("AVG", this.db.sequelize.col("rating")),
          "avg_rating",
        ],
      ],
    });

    return overallRating.getDataValue("avg_rating");
  }

  async getOverallRatingForHost(hostId) {
    const overallRating = await this.db.Review.findOne({
      where: { targetType: "HOST", targetId: hostId },
      attributes: [
        [
          this.db.sequelize.fn("AVG", this.db.sequelize.col("rating")),
          "avg_rating",
        ],
      ],
    });

    return overallRating.getDataValue("avg_rating");
  }

  async getReviewsForListing(listingId) {
    const reviews = await this.db.Review.findAll({
      where: { targetType: "LISTING", targetId: listingId },
    });
    return reviews;
  }

  async getReviewForBooking(targetType, bookingId) {
    // booking review submitted by guest about a host or a listing
    const review = await this.db.Review.findOne({
      where: { targetType, bookingId },
    });
    return review;
  }

  async createReviewForGuest({ bookingId, guestId, authorId, text, rating }) {
    // todo: don't allow creating more than 1 review?
    const review = await this.db.Review.create({
      id: uuidv4(),
      bookingId,
      targetId: guestId,
      targetType: "GUEST",
      authorId,
      rating,
      text,
    });

    return review;
  }

  async createReviewForHost({ bookingId, hostId, authorId, text, rating }) {
    // todo: don't allow creating more than 1 review?
    const review = await this.db.Review.create({
      id: uuidv4(),
      bookingId,
      targetId: hostId,
      targetType: "HOST",
      authorId,
      text,
      rating,
    });

    return review;
  }

  async createReviewForListing({
    bookingId,
    listingId,
    authorId,
    text,
    rating,
  }) {
    // todo: don't allow creating more than 1 review?
    const review = await this.db.Review.create({
      id: uuidv4(),
      bookingId,
      targetId: listingId,
      targetType: "LISTING",
      authorId,
      text,
      rating,
    });

    return review;
  }
}

module.exports = ReviewsDb;
