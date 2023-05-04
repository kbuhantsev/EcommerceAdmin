import { mongooseConnect } from "@/lib/connectMongo";
import { User } from "@/models/User";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    // if (req.query?.id) {
    //   const product = await Product.findById(req.query.id);
    //   res.status(200).json(product);
    // } else {
    const users = await User.find();
    res.status(200).json(users);
    // }
  }
}
