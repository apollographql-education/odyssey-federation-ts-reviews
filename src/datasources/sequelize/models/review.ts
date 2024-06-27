"use strict";
import { Model } from "sequelize";

export interface ReviewAttributes {
  id: string;
  rating: number;
  text: string;
  listingId: string;
}

export class Review extends Model<ReviewAttributes> implements ReviewAttributes{

  // Use declare so we don't shadow Sequelize's getters and setters
  declare id: string;
  declare text: string;
  declare rating: number;
  declare listingId: string;
}

export const ReviewModel = (sequelize: any, DataTypes: any): typeof Review => {

  
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