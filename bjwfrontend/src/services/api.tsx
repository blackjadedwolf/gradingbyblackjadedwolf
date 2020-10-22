import axios, { AxiosResponse, AxiosError } from "axios";
import { Card, Order, User } from "../models";

export const saveOrder = async (cards: Card[], userDetails: User) => {
  console.log("about to send ", cards, userDetails)
  await axios
    .post("/backend/order", {
      "cards": {...cards},
      "userDetails": {...userDetails}
    })
    .then(
      (response: AxiosResponse) => {
        console.log(response);
        return response.data;
      },
      (error: AxiosError) => {
        return error.message;
      }
    );
};

export const getOrders = async() => {
  await axios.get("/backend/order").then(
    (response: AxiosResponse) => {
      return response.data as Order[]
    },
    (error: AxiosError) => {
      console.log(error)
    }
  )
}