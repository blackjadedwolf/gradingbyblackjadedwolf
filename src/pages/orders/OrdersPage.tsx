import { Button, Form, Modal, Table } from "react-bootstrap";
import React, { useState } from "react";
import { useOrders, useUser, deleteOrder, updateOrder } from "services/api";
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
      <div className="orders-header pt-5">My Orders</div>
      <div
        style={PageStyles}
        className=" container-fluid mt-3 text-center order-flex"
      >
        <div className="container-fluid table-headings">
          <div className="table-heading">Order #</div>
          <div className="table-heading order-hide">Email</div>
          <div className="table-heading order-hide">Last Name</div>
          <div className="table-heading order-hide">First Name</div>
          <div className="table-heading order-hide">Phone Number</div>
          <div className="table-heading order-hide">Submission Level</div>
          <div className="table-heading order-hide">Order Status</div>
        </div>
        {!ordersLoading ? (
          userOrders && (
            <div>
              {userOrders.map((order) => {
                return (
                  <div
                    className="container-fluid table-row mt-3 text-center dynamic-order-data"
                    key={order.id}
                  >
                    <Link className="order" to={`/orders/${order.id}`}>{order.id}</Link>
                    <div className="order order-hide">{order.email}</div>
                    <div className="order order-hide">{order.lastName}</div>
                    <div className="order order-hide">{order.firstName}</div>
                    <div className="order order-hide">{order.phoneNumber}</div>
                    <div className="order order-hide">{order.submissionLevel}</div>
                    <div className="order order-hide"> Status </div>
                    {isAdmin ? (
                      <Form>
                        <Form.Control
                          as="select"
                          defaultValue={order.status}
                          onChange={async (event) => {
                            await updateOrder({
                              ...order,
                              status: event.target.value,
                            });
                          }}
                        >
                          <option value="Awaiting Cards">Awaiting Cards</option>
                          <option value="Received">Received</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shipping Back">Shipping Back</option>
                          <option value="Completed">Completed</option>
                        </Form.Control>
                      </Form>
                    ) : (
                      <div className="order-hide">{order.status}</div>
                    )}
                  </div>
                );
              })}
            </div>
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
  backgroundColor: "black",
  color: "white",
  minHeight: "37.5rem",
  width: "90rem",
  display: "block !important",
} as React.CSSProperties;
