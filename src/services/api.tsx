import {
  SubmittedCard,
  Order,
  User,
  OrderStatus,
  SubmissionLevel,
} from "../models";
import { auth, firestore, storage } from "./firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

const ordersCollection =
  process.env.NODE_ENV === "development" ? "devOrders" : "orders";

const userDocCollection =
  process.env.NODE_ENV === "development" ? "devUserDocs" : "userDocs";

/********
 **AUTH**
 ********/

export const useUser = () => {
  return useAuthState(auth);
};

export const login = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const register = async (user: User & { password: string }) => {
  return await auth
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(async (userDoc) => {
      return await createUserProfile({
        id: userDoc.user!.uid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      });
    });
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

export const createUserProfile = async (user: User) => {
  return await firestore.collection(userDocCollection).add({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
  });
};

export const updateUserProfile = async (updatedUser: User) => {
  return await firestore
    .collection(userDocCollection)
    .doc(updatedUser.email)
    .update({
      firstname: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phoneNumber: updatedUser.phoneNumber,
    });
};

export const useUserProfile = (email: string | undefined) => {
  return useDocumentData<Pick<User, "firstName" | "lastName" | "phoneNumber" | "id">>(
    firestore.collection(userDocCollection).doc(email ?? "doesnot@exist.com"),
    {
      idField: "id",
    }
  );
};

export const getUserProfile = async (email: string) => {
  return await firestore.collection(userDocCollection).doc(email).get().then(profileDoc => {
    if(profileDoc.exists) {
      let profile = profileDoc.data() as User;
      profile.email = profileDoc.id;
      return profile;
    } else {
      return undefined;
    }
  })
}

/********
 **CRUD**
 ********/

export const saveOrder = async (
  submissionLevel: SubmissionLevel,
  cards: SubmittedCard[],
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

  return await firestore.collection(ordersCollection).add(order);
};

export const updateOrder = async (updatedOrder: Order) => {
  return await firestore
    .collection(ordersCollection)
    .doc(updatedOrder.id)
    .update(updatedOrder);
};

export const uploadAttachment = async (orderID: string, file: File) => {
  const metadata = {
    customMetadata: {
      userViewable: "false",
    },
  };

  return await storage
    .ref(`/orders/${orderID}/attachments/${file.name}`)
    .put(file, metadata);
};

export const listOrderAttachments = async (orderID: string) => {
  return await storage.ref(`/orders/${orderID}/attachments/`).listAll();
};

export const setAttachmentViewability = async (
  viewable: boolean,
  attachment: firebase.default.storage.Reference
) => {
  const newMetadata = {
    customMetadata: {
      userViewable: String(viewable),
    },
  };

  return await attachment.updateMetadata(newMetadata);
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

export const deleteAttachment = async (
  attachment: firebase.default.storage.Reference
) => {
  return await attachment.delete();
};

export const getOrders = async () => {
  return await firestore
    .collection(ordersCollection)
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
  return useCollectionData<Order>(firestore.collection(ordersCollection), {
    idField: "id",
  });
};

export const getOrder = async (orderID: string) => {
  return await firestore
    .collection(ordersCollection)
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
  return useDocumentData<Order>(
    firestore.collection(ordersCollection).doc(orderID),
    {
      idField: "id",
    }
  );
};

export const deleteOrder = async (orderID: string) => {
  return await firestore.collection(ordersCollection).doc(orderID).delete();
};
