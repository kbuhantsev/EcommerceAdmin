import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { UploadSVG } from "./Icons";
import FadeSpinner from "./FadeSpinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || 0);
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const saveProduct = async (event) => {
    event.preventDefault();

    const data = { title, description, price, images };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };

  if (goToProducts) {
    router.push("/products");
  }

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
