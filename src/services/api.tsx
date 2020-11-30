import { Card, Order, User, OrderStatus } from "../models";
import { auth, firestore, storage } from "./firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

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

export const saveOrder = async (
  submissionLevel: string,
  cards: Card[],
  userDetails: User
) => {
  const order: Order = {
    submissionLevel: submissionLevel,
    cards: cards,
    email: userDetails.email,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    phoneNumber: userDetails.phoneNumber,
    status: OrderStatus.Waiting,
    dateCreated: new Date(Date.now()).toISOString(),
  };

  return await firestore.collection("orders").add(order);
};

export const updateOrder = async (updatedOrder: Order) => {
  return await firestore
    .collection("orders")
    .doc(updatedOrder.id)
    .update(updatedOrder);
};

export const uploadAttachment = async (orderID: string, file: File) => {
  return await storage
    .ref(`/orders/${orderID}/attachments/${file.name}`)
    .put(file);
};

export const listOrderAttachments = async (orderID: string) => {
  return await storage.ref(`/orders/${orderID}/attachments/`).listAll();
};

export const downloadAttachment = async (orderID: string, filename: string) => {
  return await storage
    .ref(`/orders/${orderID}/attachments/${filename}`)
    .getDownloadURL()
    .then(async (url) => {
      return await axios.get(url).then(
        (value) => {
          console.log("download value", value);
        },
        (error) => {
          console.log("download error", error);
        }
      );
    });
};

export const deleteAttachment = async (attachment: firebase.storage.Reference) => {
  return await attachment.delete()
}

export const getOrders = async () => {
  return await firestore
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
  return useCollectionData<Order>(firestore.collection("orders"), {
    idField: "id",
  });
};

export const getOrder = async (orderID: string) => {
  return await firestore
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

export const useOrder = (orderID: string) => {
  return useDocumentData<Order>(firestore.collection("orders").doc(orderID), {
    idField: "id",
  });
};

export const deleteOrder = async (orderID: string) => {
  return await firestore.collection("orders").doc(orderID).delete();
};
