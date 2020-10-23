import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Order } from "models";
import { getOrder } from "services/api";

import { Invoice } from "./Invoice";

interface RouteParams {
  orderID: string;
}

const InvoicePage = () => {
  const { orderID } = useParams<RouteParams>();
  const [order, setOrder] = useState<Order>();
  useEffect(() => {
    getOrder(orderID).then((order) => {
      setOrder(order);
    });
  }, [orderID]);
  return (
    <>
      <p>View Invoice here....</p>
      {order ? <Invoice order={order} /> : <p>Loading order...</p>}
    </>
  );
};

export default InvoicePage;
