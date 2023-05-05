import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { UploadSVG } from "./Icons";
import FadeSpinner from "./FadeSpinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || 0);
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );

  const router = useRouter();

  if (goToProducts) {
    router.push("/products");
  }

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const result = await axios.get("/api/categories");
    setCategories(result.data);
  };

  const saveProduct = async (event) => {
    event.preventDefault();

    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };

  const uploadImages = async (e) => {
    const files = e.target?.files;

    if (files?.length > 0) {
      setUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data];
      });
    }
    setUploading(false);
  };

  function updateImagesOrder(images) {
    setImages(images);
  }

  const setProductProp = (propName, value) => {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  };

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
      </select>

      {propertiesToFill.length > 0 &&
        propertiesToFill.map((property) => (
          <div key={property._id} className="flex gap-1">
            <div key={property.name}>{property.name}</div>
            <select
              key={property._id}
              value={productProperties[property.name]}
              onChange={(e) => setProductProp(property.name, e.target.value)}
            >
              {property.values.map((val, idx) => (
                <option key={idx} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        ))}

      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {images.length > 0 &&
            images.map((image) => (
              <div key={image.public_id} className="h-24">
                <img
                  src={image.url}
                  alt={image.original_filename}
                  className="rounded-lg"
                />
              </div>
            ))}
        </ReactSortable>
        {uploading && (
          <div className="flex justify-center items-center h-24">
            <FadeSpinner />
          </div>
        )}
        <label
          className="flex flex-col justify-center items-center 
        gap-1 text-gray-500 w-24 h-24 rounded-lg bg-gray-200 cursor-pointer"
        >
          <UploadSVG />
          Upload
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
      </div>

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
