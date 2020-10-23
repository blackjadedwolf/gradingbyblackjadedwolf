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
            return <div>
              <p>{order.id} | {order.email} | {order.lastName} | {order.firstName}</p>
              <ul>
              {order.cards.map(card => {
                return <li>{card.player_name}</li>
})}
              </ul>
              
            </div>;
          })
        ) : (
          <p>Loading orders...</p>
        )}
      </ul>
    </>
  );
};

export default Admin;
