import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get("/backend/order", async (req: Request, res: Response) => {
  console.log("receiving GET request at /backend/order")
  await Order.find({}, (err, orderDocs) => {
    return res.status(200).send(orderDocs)
  });
});

router.post("/backend/order", async (req: Request, res: Response) => {
  const { cards, userDetails } = req.body;
  const { email, firstName, lastName, phoneNumber } = userDetails;

  const order = Order.build({
    cards: cards,
    email: email,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    fulfilled: false
  });

  await order.save().then(orderDoc => {
    return res.status(201).send(orderDoc);
  })
});

export { router as OrderRouter };
