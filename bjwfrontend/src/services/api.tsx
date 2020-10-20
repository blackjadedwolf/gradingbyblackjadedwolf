import axios, { AxiosResponse, AxiosError } from "axios";
import { Card, User } from "../models";

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
