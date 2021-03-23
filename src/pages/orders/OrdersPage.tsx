import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { useOrders, useUser } from "services/api";
import { Link } from "react-router-dom";
import { OrderStatus } from "models";
import { updateOrder } from "services/api";
import { isOrderBeforeMar232021 } from "services/compatibility";

const OrdersPage = () => {
  enum SearchTypes {
    Email = "email",
    LastName = "lastName",
    Order = "id",
    PSAID = "psaid",
  }
  const [user] = useUser();
  const [orders, ordersLoading, ordersError] = useOrders();
  const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.Email);
  const [searchTerm, setSearchTerm] = useState<string>();

  const isAdmin =
    user?.email === "gradingbyblackjadedwolf@gmail.com" ||
    (process.env.NODE_ENV === "development" && user?.email === "test@test.com");

  let userOrders = isAdmin
    ? orders
    : orders?.filter(
        (order) => order.email.toLowerCase() === user?.email?.toLowerCase()
      );

  userOrders =
    isAdmin && searchTerm
      ? userOrders?.filter((order) => {
          switch (searchType) {
            case SearchTypes.Email:
              return order.email
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            case SearchTypes.LastName:
              return order.lastName
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            case SearchTypes.Order:
              return order.id!.toLowerCase().includes(searchTerm.toLowerCase());
            case SearchTypes.PSAID:
              return String(order.psa_id).includes(searchTerm);
            default:
              throw new Error("Invalid search type");
          }
        })
      : userOrders;

  // Display orders in reverse chronological order (newest first)
  userOrders?.sort((a, b) =>
    new Date(a.dateCreated) > new Date(b.dateCreated) ? -1 : 1
  );

  return (
    <div className="orders-wrap">
      {ordersError && <p>Error loading orders, please try again later</p>}
      <div className="orders-header pt-5">{isAdmin ? "All" : "My"} Orders</div>
      {isAdmin && (
        <Form>
          <Form.Group>
            <Form.Control
              required
              as="select"
              onChange={(event) => {
                let newSearchType: SearchTypes;

                switch (event.target.value) {
                  case SearchTypes.Email.toString():
                    newSearchType = SearchTypes.Email;
                    break;
                  case SearchTypes.LastName.toString():
                    newSearchType = SearchTypes.LastName;
                    break;
                  case SearchTypes.Order.toString():
                    newSearchType = SearchTypes.Order;
                    break;
                  case SearchTypes.PSAID.toString():
                    newSearchType = SearchTypes.PSAID;
                    break;
                  default:
                    throw new Error(
                      "invalid argument in search type change switch statement"
                    );
                }

                setSearchType(newSearchType);
              }}
            >
              {Object.entries(SearchTypes).map((entry) => {
                return (
                  <option key={entry[0]} value={entry[1]}>
                    {entry[0]}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              placeholder={`Search By ${searchType}`}
              style={{ width: "15rem" }}
              onChange={(event) => {
                setSearchTerm(event.target.value);
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
          {isAdmin && <div className="table-heading order-hide">Email</div>}
          {isAdmin && (
            <div className="table-heading order-hide" id="lastname-heading">
              Last Name
            </div>
          )}
          {/*
          {isAdmin && (
            <div className="table-heading order-hide">First Name</div>
          )}
        
          {isAdmin && (
            <div className="table-heading order-hide">Phone Number</div>
          )}
          */}
          <div className="table-heading order-hide" id="date-heading">
            Date Submitted
          </div>
          <div className="table-heading order-hide">Submission Level</div>
          {isAdmin && (
            <div className="table-heading order-hide" id="psa-heading">
              PSA ID
            </div>
          )}
          <div className="table-heading order-hide" id="status-form">
            Order Status
          </div>
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
                    {isAdmin && (
                      <div className="order order-hide">{order.email}</div>
                    )}
                    {isAdmin && (
                      <div className="order order-hide" id="lastname-heading">
                        {order.lastName}
                      </div>
                    )}
                    {/*
                    {isAdmin && (
                      <div className="order order-hide">{order.firstName}</div>
                    )}
                      {/*
                    {isAdmin && (
                      <div className="order order-hide">
                        {order.phoneNumber}
                      </div
                      >
                    )}
                    */}
                    <div className="order order-hide" id="date-heading">
                      {new Date(order.dateCreated).toISOString().split("T")[0]}
                    </div>
                    <div className="order order-hide">
                      {" "}
                      {isOrderBeforeMar232021(order)
                        ? String(order.submissionLevel)
                        : order.submissionLevel.name}
                    </div>
                    {isAdmin && (
                      <div className="order order-hide" id="psa-heading">
                        {order.psa_id ?? <p>No ID yet</p>}
                      </div>
                    )}
                    {isAdmin ? (
                      <Form
                        className="order form-style order-hide"
                        id="status-form"
                      >
                        <Form.Control
                          style={{ width: "12.5rem" }}
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
                              case OrderStatus.MailedOut.toString():
                                newStatus = OrderStatus.MailedOut;
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
                            return (
                              <option key={entry[0]} value={entry[1]}>
                                {entry[1]}
                              </option>
                            );
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
  color: "white",
  minHeight: "37.5rem",
  width: "90rem",
  display: "block !important",
} as React.CSSProperties;
