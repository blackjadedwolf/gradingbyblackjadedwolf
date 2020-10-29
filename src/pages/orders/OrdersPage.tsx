import { Card, Collapse } from "antd";
import React from "react";
import { useOrders, useUser } from "services/api";

const OrdersPage = () => {
  const [user] = useUser();
  const [orders, ordersLoading, ordersError] = useOrders();

  const userOrders = user?.email === "blackjadedwolf@aol.com" ? orders : orders?.filter((order) => order.email === user?.email);

  const {Panel} = Collapse;

  return (
    <>
      <ul>
        {!ordersLoading ? (
          userOrders &&
          userOrders.map((order) => {
            return (
              <>
                <p>
                  {order.id} | {order.email} | {order.lastName} |{" "}
                  {order.firstName}
                </p>
                <Collapse>
                <Panel header="Cards" key="1">
                  {order.cards.map((card) => {
                    return <Card type="inner">{card.player_name}</Card>;
                  })}
                  </Panel>
                </Collapse>
              </>
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
