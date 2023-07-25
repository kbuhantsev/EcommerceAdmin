import { DeleteSVG, EditSVG } from "@/components/Icons";
import Layout from "@/components/Layout";
import Link from "next/link";
import useSWR from "swr";

const Products = () => {
  const { data: products = [] } = useSWR("api/products");

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
                <Link href={"/products/edit/" + _id} className="btn-default">
                  <EditSVG h={6} />
                  Edit
                </Link>
                <Link href={"/products/delete/" + _id} className="btn-red">
                  <DeleteSVG h={6} />
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
