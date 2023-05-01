import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ProductForm = ({
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || 0);
  const [goToProducts, setGoToProducts] = useState(false);

  const router = useRouter();

  const createProduct = async (event) => {
    event.preventDefault();

    const data = { title, description, price };
    await axios.post("/api/products", data);
    setGoToProducts(true);
  };

  if (goToProducts) {
    router.push("/products");
  }

  return (
    <form onSubmit={createProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label>Product decription</label>
      <textarea
        placeholder="decription..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <label>Product price</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <div className="flex w-full">
        <button className="btn-primary ml-auto" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
