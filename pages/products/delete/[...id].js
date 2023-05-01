import axios from "axios";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DeleteProductPage = () => {
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

  const goBack = () => {
    router.push("/products");
  };
  const deleteProduct = async () => {
    await axios.delete("/api/products?id=" + id);
    goBack();
  };

  return (
    <Layout>
      {productInfo && (
        <>
          <h1 className="text-center">
            Do you really want to delete product {productInfo.title} ?
          </h1>
          <div className="flex gap-2 justify-center">
            <button className="btn-red" type="button" onClick={deleteProduct}>
              Yes
            </button>
            <button className="btn-default" type="button" onClick={goBack}>
              No
            </button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default DeleteProductPage;
