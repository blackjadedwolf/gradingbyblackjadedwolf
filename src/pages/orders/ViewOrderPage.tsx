import { Button, Form, Modal, Table } from "react-bootstrap";
import { useParams } from "react-router";
import React, { useState } from "react";
import { useUser, deleteOrder, useOrder, updateOrder } from "services/api";
import { Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";
import { OrderStatus } from "models";

interface RouteParams {
  orderID: string;
}

const ViewOrderPage = () => {
  const { orderID } = useParams<RouteParams>();
  const [user] = useUser();
  const [order, orderLoading, orderError] = useOrder(orderID);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isAdmin = user?.email === "blackjadedwolf@aol.com";
  var cards = order?.cards;

  return (
    <>
      {orderError && <p>Error loading order</p>}
      {orderLoading && <p>Loading order...</p>}
      {order && (
        <div className="indiv-order-page-wrap pt-5">
          <Modal show={showDeleteModal}>
            <Modal.Header>
              <Modal.Title>Confirm your choice</Modal.Title>
            </Modal.Header>
            <Modal.Body>This will permanently delete the unit!</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  deleteOrder(orderID);
                  setShowDeleteModal(false);
                  window.location.reload();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="container indiv-order-data-wrap pt-5">
            <div className="container-fluid indiv-order-header indiv-order-section">
              <div>
                {" "}
                <span className="indiv-order-caption"> Order #: </span>{" "}
                {order.id}{" "}
              </div>
              <div>
                {" "}
                <span className="indiv-order-caption"> Status: </span>{" "}
                {isAdmin ? (
                  <Form>
                  <Form.Control
                    as="select"
                    defaultValue={order.status}
                    onChange={(event) => {
                      let newStatus: OrderStatus;

                      switch (event.target.value) {
                        case OrderStatus.Completed.toString():
                          newStatus = OrderStatus.Completed;
                          break;
                        case OrderStatus.Received.toString():
                          newStatus = OrderStatus.Received;
                          break;
                        case OrderStatus.Shipping.toString():
                          newStatus = OrderStatus.Shipping;
                          break;
                        case OrderStatus.UnderReview.toString():
                          newStatus = OrderStatus.UnderReview;
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
                      return <option key={entry[0]} value={entry[0]}>{entry[1]}</option>;
                    })}
                  </Form.Control>
                </Form>
                ) : (
                  order.status
                )}{" "}
              </div>
              {isAdmin && (
                <div>
                  <span className="indiv-order-caption">Delete Order</span>{" "}
                  <Button
                    onClick={() => {
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash />
                  </Button>
                </div>
              )}
            </div>

            <div className="container-fluid indiv-order-customer-info indiv-order-section mt-5">
              <div>
                {" "}
                <span className="indiv-order-caption">
                  {" "}
                  Customer Information:{" "}
                </span>{" "}
              </div>{" "}
              <br></br>
              <div className="indiv-order-address-wrap">
                <div>
                  {" "}
                  {order.firstName} {order.lastName}{" "}
                </div>
                <div> {order.email} </div>
                <div> {order.phoneNumber} </div>
              </div>
            </div>

            <div className="container-fluid indiv-order-products-info indiv-order-section mt-5">
              <div>
                {" "}
                <span className="indiv-order-caption">
                  {" "}
                  Products Information:{" "}
                </span>{" "}
              </div>{" "}
              <br></br>
              <div className="indiv-order-product-wrap">
                <div className="indiv-order-product-row">
                  <div className="indiv-order-product-name "> Name </div>
                  <div className="indiv-order-product-card-number">
                    {" "}
                    Card Number{" "}
                  </div>
                  <div className="indiv-order-product-brand"> Brand </div>
                  <div className="indiv-order-product-quantity"> Quantity </div>
                  <div className="indiv-order-product-price"> Value </div>
                </div>
                {cards?.map((card) => {
                  return (
                    <div className="indiv-order-product-row mt-4" key={card.player_name + card.card_number}>
                      <div className="indiv-order-product-name">
                        {" "}
                        {card.player_name}{" "}
                      </div>
                      <div className="indiv-order-product-card-number">
                        {" "}
                        {card.card_number}{" "}
                      </div>
                      <div className="indiv-order-product-brand">
                        {" "}
                        {card.brand}{" "}
                      </div>
                      <div className="indiv-order-product-quantity">
                        {" "}
                        {card.quantity}{" "}
                      </div>
                      <div className="indiv-order-product-quantity">
                        {" "}
                        ${card.estimated_value.toFixed(2)}{" "}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="container-fluid indiv-order-options-info indiv-order-section mt-5">
              <div>
                {" "}
                <span className="indiv-order-caption">
                  {" "}
                  Submission Cost{" "}
                </span>{" "}
              </div>{" "}
              <br></br>
              <div className="indiv-order-address-wrap">
                <div> {order.submissionLevel} </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewOrderPage;
