import { mongooseConnect } from "@/lib/connectMongo";
import { Category } from "@/models/Category";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  // if (method === "GET") {
  //   if (req.query?.id) {
  //     const product = await Product.findById(req.query.id);
  //     res.status(200).json(product);
  //   } else {
  //     const product = await Product.find();
  //     res.status(200).json(product);
  //   }
  // }

  if (method === "POST") {
    const { name } = req.body;
    const categorie = await Category.create({
      name,
    });
    res.status(201).json(categorie);
  }

  // if (method === "PUT") {
  //   const { title, description, price, images, _id } = req.body;
  //   const poduct = await Product.updateOne(
  //     { _id },
  //     {
  //       title,
  //       description,
  //       price,
  //       images,
  //     }
  //   );
  //   res.status(200).json(poduct);
  // }

  // if (method === "DELETE") {
  //   if (req.query?.id) {
  //     await Product.deleteOne({ _id: req.query.id });
  //     res.status(200).json(true);
  //   }
  // }
}
