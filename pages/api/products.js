import { mongooseConnect } from "@/lib/connectMongo";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findById(req.query.id));
    }
    res.json(await Product.find());
  }

  if (method === "POST") {
    const { title, description, price } = req.body;
    const poductDoc = await Product.create({ title, description, price });
    res.status(201).json(poductDoc);
  }

  res.status(400);
}
