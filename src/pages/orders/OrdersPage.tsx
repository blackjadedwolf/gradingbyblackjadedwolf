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
    <>
      {isAdmin && (
        <Modal show={showDeleteModal}>
          <Modal.Header>
            <Modal.Title>Confirm your choice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Deleting this order will permanently delete the record of this order
          </Modal.Body>
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
                deleteOrder(orderID!);
                setShowDeleteModal(false);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {ordersError && <p>Error loading orders, please try again later</p>}
      <div className="orders-header">{isAdmin ? "All" : "My"} Orders</div>
      {isAdmin && (
        <Form>
          <Form.Group>
            <Form.Label>Search by Email</Form.Label>
            <Form.Control
              required
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </Form.Group>
        </Form>
      )}
      <Table style={PageStyles}>
        <thead>
          <th>Order #</th>
          <th>Email</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Phone Number</th>
          <th>Submission Level</th>
        </thead>

        {!ordersLoading ? (
          userOrders && (
            <tbody>
              {userOrders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.email}</td>
                    <td>{order.lastName}</td>
                    <td>{order.firstName}</td>
                    <td>{order.phoneNumber}</td>
                    <td>{order.submissionLevel}</td>
                    <td>
                      <Link to={`/invoice/${order.id}`}>View Invoice</Link>
                    </td>
                    {isAdmin && (
                      <td>
                        <Button
                          onClick={() => {
                            setShowDeleteModal(true);
                            setOrderID(order.id);
                          }}
                        >
                          <Trash />
                        </Button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          )
        ) : (
          <p>Loading orders...</p>
        )}
      </Table>
    </>
  );
};

export default OrdersPage;

const PageStyles = {
  backgroundColor: "black",
  color: "white",
  minHeight: "37.5rem",
} as React.CSSProperties;
