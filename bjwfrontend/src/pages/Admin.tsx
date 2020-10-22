import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Order } from "../models";

interface FetchedOrder extends Order {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

const Admin = () => {
  const [orders, setOrders] = useState<FetchedOrder[]>();
  useEffect(() => {
    axios.get("/backend/order").then(
      (response: AxiosResponse) => {
        setOrders(response.data as FetchedOrder[]);
      },
      (error: AxiosError) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <ul>
        {orders?.map((order) => {
          return <li key={order._id}>{order._id}</li>;
        })}
      </ul>
    </>
  );
};

export default Admin;
