"use strict";
import { Model } from "sequelize";

interface ReviewAttributes {
  id: string;
  rating: number;
  text: string;
  listingId: string;
}

// @ts-ignore
export const ReviewModel = (sequelize: any, DataTypes: any): any => {

  class Review extends Model<ReviewAttributes> implements ReviewAttributes{

    // Use declare so we don't shadow Sequelize's getters and setters
    declare id: string;
    declare text: string;
    declare rating: number;
    declare listingId: string;
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
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