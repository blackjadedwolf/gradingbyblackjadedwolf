import { Card, Order, User } from "../models";
import { db } from "./firebase";

export const saveOrder = async (cards: Card[], userDetails: User) => {
  const order: Order = {
    cards: cards,
    email: userDetails.email,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    phoneNumber: userDetails.phoneNumber,
    fulfilled: false,
  };

  return await db
    .collection("orders")
    .add(order)
    .then((doc) => {
      return doc.id;
    });
};

export const getOrders = async () => {
  return await db
    .collection("orders")
    .get()
    .then((querySnapshot) => {
      let orders: Order[] = [];
      querySnapshot.forEach((order) => {
        let tempOrder = order.data() as Order;
        tempOrder.id = order.id;
        orders.push(tempOrder);
      });

      return orders;
    });
};

export const getOrder = async(orderID: string) => {
  return await db
    .collection("orders")
    .doc(orderID)
    .get()
    .then(doc => {
      if(doc.exists) {
        let tempOrder = doc.data() as Order
        tempOrder.id = doc.id;
        return tempOrder;
      } else {
        throw new Error("Invalid order number")
      }
    })
}