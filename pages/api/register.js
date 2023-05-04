import { mongooseConnect } from "@/lib/connectMongo";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  await mongooseConnect();

  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(422).json({ error: "Email in use!" }).end();
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      hashedPassword,
      image: "",
      emailVerified: new Date(),
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
