import { mongooseConnect } from "@/lib/connectMongo";
import { User } from "@/models/User";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    const users = await User.find();
    res.status(200).json(users);
  }

  if (method === "PUT") {
    const { _id, admin } = req.body;
    const user = await User.updateOne(
      { _id },
      {
        admin,
      }
    );
    res.status(200).json(user);
  }
}
