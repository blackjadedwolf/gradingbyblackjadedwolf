import axios, { AxiosResponse, AxiosError } from "axios";
import { Card, Order, User } from "../models";
import {db, auth} from './firebase'

export const saveOrder = async (cards: Card[], userDetails: User) => {
  await db.collection("orders").add({...userDetails, cards})
};

export const getOrders = async () => {
  await db.collection("orders").get().then(querySnapshot => {

  })
}