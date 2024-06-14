"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      rating: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      listingId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
      timestamps: false,
    }
  );
  return Review;
};
