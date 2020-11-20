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
        </div>
      )}
    </>
  );
};

export default ViewOrderPage;
