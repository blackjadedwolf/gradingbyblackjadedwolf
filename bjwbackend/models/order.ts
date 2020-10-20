import mongoose from "mongoose";

interface Card {
  quantity: number;
  player_name: string;
  year: number;
  brand: string;
  product: string;
  card_number: number;
  estimated_value: number;
}

interface IOrder {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cards: Card[];
  fulfilled: boolean;
}

interface OrderDoc extends mongoose.Document {
  firstName: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  cards: [Card];
  fulfilled: boolean;
}

interface orderModelInteface extends mongoose.Model<OrderDoc> {
  build(attr: IOrder): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    cards: {
      type: [
        {
          quantity: Number,
          player_name: String,
          year: Number,
          brand: String,
          product: String,
          card_number: Number,
          estimated_value: Number,
        },
      ],
      required: true,
    },
    fulfilled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

orderSchema.statics.build = (attr: IOrder) => {
  return new Order(attr);
};

const Order = mongoose.model<OrderDoc, orderModelInteface>(
  "Order",
  orderSchema
);


export { Order };
