import { Schema, model, models } from "mongoose";

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: "",
    },
    emailVerified: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

export const User = models.User || model("User", UsersSchema);
