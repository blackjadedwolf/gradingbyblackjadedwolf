import { Button, Table } from "react-bootstrap";
import React, { useState } from "react";
import { useOrders, useUser } from "services/api";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [user] = useUser();
  const [orders, ordersLoading, ordersError] = useOrders();
  const [isEditing, setEditing] = useState(false);
  const isAdmin = user?.email === "blackjadedwolf@aol.com";

  const userOrders = isAdmin
    ? orders
    : orders?.filter((order) => order.email === user?.email);

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      {ordersError && <p>Error loading orders, please try again later</p>}
      <div className="orders-header">
        My Orders
      </div>
      <Table style={PageStyles}>
        <thead>
          <th>Order #</th>
          <th>Email</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Phone Number</th>
          <th>Submission Level</th>
        </thead>

        {!ordersLoading ? (
          userOrders && (
            <tbody>
              {userOrders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.email}</td>
                    <td>{order.lastName}</td>
                    <td>{order.firstName}</td>
                    <td>{order.phoneNumber}</td>
                    <td>{order.submissionLevel}</td>
                    <td><Link to={`/invoice/${order.id}`}>View Invoice</Link></td>
                  </tr>
                );
              })}
            </tbody>
          )
        ) : (
          <p>Loading orders...</p>
        )}
      </Table>
    </>
  );
};

export default OrdersPage;

const PageStyles = {
  backgroundColor:"black",
  color:"white",
  minHeight:"37.5rem"
} as React.CSSProperties