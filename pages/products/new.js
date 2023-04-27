import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState } from "react";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const createProduct = async (event) => {
    event.preventDefault();

    const data = { title, description, price };

    await axios.post("/api/products", data);

    alert("Заебись!");
  };

  return (
    <Layout>
      <h1>New product</h1>
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
    </Layout>
  );
};

export default NewProduct;
