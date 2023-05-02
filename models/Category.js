import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true, //
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null, //
    },
    properties: [{ type: Object }],
  },
  {
    versionKey: false,
  }
);

export const Category = models.Category || model("Category", CategorySchema);
