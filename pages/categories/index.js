import { DeleteSVG, EditSVG } from "@/components/Icons";
import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const result = await axios.get("/api/categories");
    setCategories(result.data);
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      const _id = editedCategory._id;
      await axios.put("api/categories", { ...data, _id });
    } else {
      await axios.post("api/categories", data);
    }
    setName("");
    getCategories();
  };

  const editCategory = (categorie) => {
    setEditedCategory(categorie);
    setName(categorie.name);
    setParentCategory(categorie.parent?._id);
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category: ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form className="flex gap-1" onSubmit={saveCategory}>
        <input
          className="mb-0"
          type="text"
          placeholder={"Category name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td className="flex gap-2">
                  <button
                    className="btn-primary"
                    onClick={() => editCategory(category)}
                  >
                    <EditSVG h={6} />
                    Edit
                  </button>
                  <button className="btn-primary">
                    <DeleteSVG h={6} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default CategoriesPage;
