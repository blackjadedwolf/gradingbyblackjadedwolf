import { Card, Order, User } from "../models";
import { auth, db } from "./firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

/********
 **AUTH**
 ********/

export const useUser = () => {
  return useAuthState(auth);
};

export const login = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const register = async (email: string, password: string) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  return await auth.signOut().catch(() => {
    throw new Error("Error while signing out");
  });
};

export const resetPassword = async (email: string) => {
  return await auth.sendPasswordResetEmail(email).catch(() => {
    throw new Error("Error while sending password reset email");
  });
};

/********
 **CRUD**
 ********/

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

export const useOrders = () => {
  return useCollectionData<Order>(db.collection("orders"),
  {idField: "id"});
};

export const getOrder = async (orderID: string) => {
  return await db
    .collection("orders")
    .doc(orderID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let tempOrder = doc.data() as Order;
        tempOrder.id = doc.id;
        return tempOrder;
      } else {
        throw new Error("Invalid order number");
      }
    });
};

export const useOrder = async (orderID: string) => {
  return useDocumentData<Order>(db.collection("orders").doc(orderID));
};
