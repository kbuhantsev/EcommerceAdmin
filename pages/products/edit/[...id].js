import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditProductPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { id } = router.query;

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get("/api/products?id=" + id);
      setProductInfo(response.data);
    }
    getProduct();
  }, []);

  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
};

export default EditProductPage;
