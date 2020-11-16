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
          <div className="table-heading"></div>
        </div>
        <div className="table-row mt-3 text-center">
          <div>8457287HFV3</div>
          <div>niaz151@gmail.com</div>
          <div>Ahmed</div>
          <div> Niaz </div>
          <div>3473223039</div>
          <div>20 Day</div>
          <div><Link to={`/invoice/1`}><Button>View Invoice</Button></Link></div>
        </div>
        {!ordersLoading ? (
          userOrders && (
            <tbody style={{display:"none"}}>
              {userOrders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.email}</td>
                    <td>{order.lastName}</td>
                    <td>{order.firstName}</td>
                    <td>{order.phoneNumber}</td>
                    <td>{order.submissionLevel}</td>
                    <td><Link to={`/invoice/${order.id}`}><Button>View Invoice</Button></Link></td>
                  </tr>
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
