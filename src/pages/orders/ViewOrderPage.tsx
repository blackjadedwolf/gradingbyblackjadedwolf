import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import React, { useState } from "react";
import { useUser, deleteOrder, useOrder, updateOrder } from "services/api";
import { OrderStatus } from "models";
import { Invoice } from "./Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { UploadAndViewAttachments } from "./UploadAndViewAttachments";

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
            <Modal.Body>This will permanently delete the order!</Modal.Body>
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
              <div className="indiv-mobile-heading">
                <span className="indiv-order-caption"> Order #: &nbsp; </span>
                {order.id}
              </div>

              <div className="indiv-mobile-heading">
                <span className="indiv-order-caption"> Status: &nbsp; </span>
                {isAdmin ? (
                  <Form className="indiv-order-form">
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
                        return (
                          <option key={entry[0]} value={entry[1]}>
                            {entry[1]}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form>
                ) : (
                  order.status
                )}
              </div>
            </div>

            <div className="container-fluid indiv-order-customer-info indiv-order-section mt-5">
              <div className="indiv-mobile-section-header">
                <span className="indiv-order-caption">
                  Customer Information:
                </span>
              </div>
              <br></br>
              <div className="indiv-order-address-wrap">
                <div>
                  {order.firstName} {order.lastName}
                </div>
                <div> {order.email} </div>
                <div> {order.phoneNumber} </div>
              </div>
            </div>

            <div className="container-fluid indiv-order-products-info indiv-order-section mt-5">
              <div className="indiv-mobile-section-header">
                <span className="indiv-order-caption">
                  Products Information:
                </span>
              </div>
              <br></br>
              <div className="indiv-order-product-wrap">
                <div className="indiv-mobile-product-show">
                  {" "}
                  Please visit our desktop website to view your order items{" "}
                </div>
                <div
                  className="indiv-order-product-row indiv-mobile-product-hide"
                  style={{ backgroundColor: "#052922" }}
                >
                  <div className="indiv-order-product-name "> Name </div>
                  <div className="indiv-order-product-card-number">
                    Card Number
                  </div>
                  <div className="indiv-order-product-brand"> Brand </div>
                  <div className="indiv-order-product-quantity"> Quantity </div>
                  <div className="indiv-order-product-price"> Value </div>
                </div>
                {cards?.map((card) => {
                  return (
                    <div
                      className="indiv-order-product-row mt-4 indiv-mobile-product-hide"
                      key={card.player_name + card.card_number}
                    >
                      <div className="indiv-order-product-name">
                        {card.player_name}
                      </div>
                      <div className="indiv-order-product-card-number">
                        {card.card_number}
                      </div>
                      <div className="indiv-order-product-brand">
                        {card.brand}
                      </div>
                      <div className="indiv-order-product-quantity">
                        {card.quantity}
                      </div>
                      <div className="indiv-order-product-quantity">
                        ${card.estimated_value.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="container-fluid indiv-order-options-info indiv-order-section mt-5">
              <div className="indiv-mobile-section-header">
                <span className="indiv-order-caption">
                  Submission Cost: &nbsp;
                </span>
                {order.submissionLevel.split("|")[1]}
              </div>
            </div>

            {/* Wait for attachments to be loaded, as re-rendering PDFDownloadLink causes problems */}
            <div className="container-fluid indiv-order-options-info indiv-order-section mt-5">
              <div className="indiv-mobile-section-header">
                <PDFDownloadLink
                  className="custom-download-invoice"
                  document={<Invoice order={order} />}
                  fileName={`BlackJadedWolf_Invoice_${orderID}.pdf`}
                >
                  <Button>Download Invoice</Button>
                </PDFDownloadLink>
              </div>
            </div>

            <div className="container-fluid indiv-order-options-info indiv-order-section mt-5">
              <div>
                <UploadAndViewAttachments isAdmin={isAdmin} orderID={orderID} />
              </div>
            </div>

            {isAdmin && (
              <div className="container-fluid indiv-order-options-info indiv-order-section mt-5">
                <Form>
                  <Form.Group>
                    <Form.Label>Order Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      defaultValue={order.notes}
                      onChange={(event) => {
                        updateOrder({
                          ...order,
                          notes: event.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Form>
              </div>
            )}

            <div className="indiv-mobile-heading mt-5">
              {isAdmin && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <Button
                    onClick={() => {
                      setShowDeleteModal(true);
                    }}
                    className="mt-3"
                  >
                    Delete Order
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewOrderPage;
