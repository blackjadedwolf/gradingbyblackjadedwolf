import { Button, Form, Modal, Table } from "react-bootstrap";
import { useParams } from "react-router";
import React, { useState } from "react";
import { useUser, deleteOrder, useOrder, updateOrder } from "services/api";
import { Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";

interface RouteParams {
  orderID: string;
}

const ViewOrderPage = () => {
  const { orderID } = useParams<RouteParams>();
  const [user] = useUser();
  const [order, orderLoading, orderError] = useOrder(orderID);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isAdmin = user?.email === "blackjadedwolf@aol.com";
  var cards = order?.cards

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
                <div className="indiv-mobile-heading"> <span className="indiv-order-caption"> Order #: &nbsp;  </span> {order.id} </div>
                <div className="indiv-mobile-heading"> <span className="indiv-order-caption"> Status: &nbsp; </span> {order.status} </div>
            </div>

            <div className="container-fluid indiv-order-customer-info indiv-order-section mt-5">
                <div className="indiv-mobile-section-header"> <span className="indiv-order-caption"> Customer Information: </span> </div> <br></br>
                <div className="indiv-order-address-wrap">
                  <div> {order.firstName} {order.lastName} </div>  
                  <div> {order.email} </div>
                  <div> {order.phoneNumber} </div>
                </div>
            </div>

            <div className="container-fluid indiv-order-products-info indiv-order-section mt-5">
                <div className="indiv-mobile-section-header"> <span className="indiv-order-caption"> Product Information: </span> </div> <br></br>
                <div className="indiv-order-product-wrap">
                    <div className="indiv-mobile-product-show"> Please visit our desktop website to view your order items </div>
                    <div className="indiv-order-product-row indiv-mobile-product-hide" style={{border:'1px solid white'}}> 
                      <div className="indiv-order-product-name "> Name </div>
                      <div className="indiv-order-product-card-number"> Card Number </div>
                      <div className="indiv-order-product-brand"> Brand </div>
                      <div className="indiv-order-product-quantity"> Quantity </div>
                      <div className="indiv-order-product-price"> Value </div>
                    </div>
                  {cards?.map( card => {
                    return(
                      <div className="indiv-order-product-row mt-4 indiv-mobile-product-hide"> 
                        <div className="indiv-order-product-name"> {card.player_name} </div>
                        <div className="indiv-order-product-card-number"> {card.card_number} </div>
                        <div className="indiv-order-product-brand"> {card.brand} </div>
                        <div className="indiv-order-product-quantity"> {card.quantity} </div>
                        <div className="indiv-order-product-quantity"> ${card.estimated_value.toFixed(2)} </div>
                      </div>
                    )
                  })}
                </div>
            </div>
 
            <div className="container-fluid indiv-order-options-info indiv-order-section mt-5">
                <div className="indiv-mobile-section-header"> <span className="indiv-order-caption"> Submission Cost: &nbsp; </span>
                  {order.submissionLevel.split("|")[1]}
                </div> 
                <br></br>
            </div>
 

            {/*
            <div>{order.id}</div>
            <div>{order.email}</div>
            <div>{order.lastName}</div>
            <div>{order.firstName}</div>
            <div>{order.phoneNumber}</div>
            <div>{order.submissionLevel}</div>
            {isAdmin ? <Form>
              <Form.Control as="select" defaultValue={order.status} onChange={async (event) => {
                await updateOrder({...order, status: event.target.value})
              }}>
                <option value="Awaiting Cards">Awaiting Cards</option>
                <option value="Received">Received</option>
                <option value="Under Review">Under Review</option>
                <option value="Shipping Back">Shipping Back</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form> : <div>{order.status}</div>}
            {isAdmin && (
              <Button
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                <Trash />
              </Button>
            )}
            */}


          </div>
        </div>
      )}
    </>
  );
};

export default ViewOrderPage;
