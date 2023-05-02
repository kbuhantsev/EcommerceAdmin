import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState } from "react";

const CategoriesPage = () => {
  const [name, setName] = useState("");

  const saveCategory = async (e) => {
    e.preventDefault();
    await axios.post("api/categories", { name });
    setName("");
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form className="flex gap-1" onSubmit={saveCategory}>
        <input
          className="mb-0"
          type="text"
          placeholder={"Category name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
    </Layout>
  );
};

export default CategoriesPage;
