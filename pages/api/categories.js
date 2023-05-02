import { mongooseConnect } from "@/lib/connectMongo";
import { Category } from "@/models/Category";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    // if (req.query?.id) {
    //   const product = await Product.findById(req.query.id);
    //   res.status(200).json(product);
    // } else {
    const categories = await Category.find().populate("parent");
    res.status(200).json(categories);
    // }
  }

  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    const categorie = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    res.status(201).json(categorie);
  }

  if (method === "PUT") {
    const { _id, name, parentCategory, properties } = req.body;
    const categorie = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
        properties,
      }
    );
    res.status(200).json(categorie);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Category.deleteOne({ _id: req.query.id });
      res.status(200).json(true);
    }
  }
}
