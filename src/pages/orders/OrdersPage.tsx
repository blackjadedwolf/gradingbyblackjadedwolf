import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { useOrders, useUser, updateOrder } from "services/api";
import { Link } from "react-router-dom";
import { OrderStatus } from "models";

const OrdersPage = () => {
  const [user] = useUser();
  const [orders, ordersLoading, ordersError] = useOrders();
  const [search, setSearch] = useState<string>();

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
      <div className="orders-header pt-5">{isAdmin ? "All" : "My"} Orders</div>
      {isAdmin && (
        <Form>
          <Form.Group>
            <Form.Control
              required
              placeholder="Searh By Email"
              style={{ width: "15rem" }}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </Form.Group>
        </Form>
      )}
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
                    <Link className="order" to={`/orders/${order.id}`}>
                      {order.id}
                    </Link>
                    <div className="order order-hide">{order.email}</div>
                    <div className="order order-hide">{order.lastName}</div>
                    <div className="order order-hide">{order.firstName}</div>
                    <div className="order order-hide">{order.phoneNumber}</div>
                    <div className="order order-hide"> {order.submissionLevel}</div>
                    {isAdmin ? (
                      <Form className="order order-hide">
                        <Form.Control
                          as="select"
                          defaultValue={order.status}
                          onChange={(event) => {
                            let newStatus: OrderStatus;

                            switch (event.target.value) {
                              case OrderStatus.OrderArrived.toString():
                                newStatus = OrderStatus.OrderArrived;
                                break;
                              case OrderStatus.OrderReady.toString():
                                newStatus = OrderStatus.OrderReady;
                                break;
                              case OrderStatus.Grading.toString():
                                newStatus = OrderStatus.Grading;
                                break;
                              case OrderStatus.ShippedToGrader.toString():
                                newStatus = OrderStatus.ShippedToGrader;
                                break;
                              case OrderStatus.Processing.toString():
                                newStatus = OrderStatus.Processing;
                                break;
                              case OrderStatus.Received.toString():
                                newStatus = OrderStatus.Received;
                                break;
                              case OrderStatus.Waiting.toString():
                                newStatus = OrderStatus.Waiting;
                                break;
                              default:
                                throw new Error(
                                  "invalid argument in order change switch statement"
                                );
                             }

                            updateOrder({
                              ...order,
                              status: newStatus,
                            });
                          }}
                        >
                          {Object.entries(OrderStatus).map((entry) => {
                            return <option key= {entry[0]} value={entry[1]}>{entry[1]}</option>;
                          })}
                        </Form.Control>
                      </Form>
                    ) : (
                      <div className="order order-hide">{order.status}</div>
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
