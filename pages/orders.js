import Layout from '@/components/Layout';
import React from 'react';
import useSWR from 'swr';

const OrdersPage = () => {
  const { data: orders = [] } = useSWR('/api/orders');

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map(order => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                  {order.paid ? 'YES' : 'NO'}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode} {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items?.map((line, idx) => (
                    <div key={idx}>
                      {line.price_data?.product_data?.name} x {line.quantity}
                      <br />
                    </div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default OrdersPage;
