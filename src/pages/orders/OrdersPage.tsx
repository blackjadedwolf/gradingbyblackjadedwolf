import { Card } from "antd";
import React from "react";
import { useOrders, useUser } from "services/api";

const OrdersPage = () => {
  const [user] = useUser();
  const [orders, ordersLoading, ordersError] = useOrders();

  const userOrders = orders?.filter(order => order.email === user?.email);

  return (
    <>
      <ul>
        {userOrders ? (
          userOrders.map((order) => {
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
        {ordersError && <p>Error loading orders, please try again later</p>}
      </ul>
    </>
  );
};

export default OrdersPage;
