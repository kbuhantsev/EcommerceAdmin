import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [
      {
        folder: String,
        format: String,
        height: Number,
        width: Number,
        original_filename: String,
        public_id: String,
        url: String,
        secure_url: String,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const Product = models.Product || model("Product", ProductSchema);
