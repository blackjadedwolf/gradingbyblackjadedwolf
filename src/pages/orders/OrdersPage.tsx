import { Button, Form, Modal, Table } from "react-bootstrap";
import React, { useState } from "react";
import { useOrders, useUser, deleteOrder } from "services/api";
import { Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";

const OrdersPage = () => {
  const [user] = useUser();
  const [orders, ordersLoading, ordersError] = useOrders();
  const [search, setSearch] = useState<string>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderID, setOrderID] = useState<string>();

  const isAdmin = user?.email === "blackjadedwolf@aol.com";

  let userOrders = isAdmin
    ? orders
    : orders?.filter((order) => order.email === user?.email);

  userOrders =
    isAdmin && search
      ? userOrders?.filter((order) => order.email.includes(search))
      : userOrders;

  return (
    <div className="orders-wrap">
      {ordersError && <p>Error loading orders, please try again later</p>}
      <div className="orders-header pt-5">
        My Orders
      </div>
      <div style={PageStyles} className="mt-3 text-center">
        <div className="table-headings">
          <div className="table-heading">Order #</div>
          <div className="table-heading">Email</div>
          <div className="table-heading">Last Name</div>
          <div className="table-heading">First Name</div>
          <div className="table-heading">Phone Number</div>
          <div className="table-heading">Submission Level</div>
        </div>
        {!ordersLoading ? (
          userOrders && (
            <tbody >
              {userOrders.map((order) => {
                return (
                  <div className="table-row mt-3 text-center" key={order.id} >
                    <div>{order.id}</div>
                    <div>{order.email}</div>
                    <div>{order.lastName}</div>
                    <div>{order.firstName}</div>
                    <div>{order.phoneNumber}</div>
                    <div>{order.submissionLevel}</div>
                  </div>
                );
              })}
            </tbody>
          )
        ) : (
          <p>Loading orders...</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

const PageStyles = {
  backgroundColor:"black",
  color:"white",
  minHeight:"37.5rem",
  width:"90rem",
  display:"block !important"
} as React.CSSProperties
