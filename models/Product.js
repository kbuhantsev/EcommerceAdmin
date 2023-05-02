import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
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
    properties: { type: Object },
  },
  {
    versionKey: false,
  }
);

export const Product = models.Product || model("Product", ProductSchema);
