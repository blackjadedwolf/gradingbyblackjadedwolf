import { Card } from "antd";
import React from "react";
import { useOrders } from "services/api";

const Admin = () => {
  const [orders, ordersLoading, ordersError] = useOrders();

  return (
    <>
      <ul>
        {orders ? (
          orders.map((order) => {
            return (
              <Card>
                <p>
                  {order.id} | {order.email} | {order.lastName} |{" "}
                  {order.firstName}
                </p>
                {order.cards.map((card) => {
                  return <Card type="inner">{card.player_name}</Card>;
                })}
              </Card>
            );
          })
        ) : (
          <p>Loading orders...</p>
        )}
      </ul>
    </>
  );
};

export default Admin;
