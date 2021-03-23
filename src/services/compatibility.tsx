import { Order } from "models";

export const isOrderBeforeMar232021 = (order: Order) => {
  return new Date(order.dateCreated) < new Date("March 23 2021");
};
