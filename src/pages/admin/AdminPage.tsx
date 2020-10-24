import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { getOrders } from "services/api";
import { Order } from "../../models";

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>();
  useEffect(() => {
    getOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

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
