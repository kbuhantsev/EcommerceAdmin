import { DeleteSVG, EditSVG } from "@/components/Icons";
import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link href={"products/new"} className="btn-primary">
        New product
      </Link>
      <table className="basic">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map(({ title, _id }) => (
            <tr key={_id}>
              <td>{title}</td>
              <td>
                <Link href={"/products/edit/" + _id}>
                  <EditSVG />
                  Edit
                </Link>
                <Link href={"/products/delete/" + _id}>
                  <DeleteSVG />
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
