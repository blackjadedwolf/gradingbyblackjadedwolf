import mongoose from "mongoose";

interface ICard {
  quantity: number;
  player_name: string;
  year: number;
  brand: string;
  product: string;
  card_number: number;
  estimated_value: number;
}

const CardSchema = new mongoose.Schema({
  quantity: Number,
  player_name: String,
  year: Number,
  brand: String,
  product: String,
  card_number: Number,
  estimated_value: Number,
});

interface IOrder {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cards: ICard[];
  fulfilled: boolean;
}

interface OrderDoc extends mongoose.Document {
  firstName: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  cards: ICard[];
  fulfilled: boolean;
}

interface orderModelInteface extends mongoose.Model<OrderDoc> {
  build(attr: IOrder): OrderDoc;
}

const OrderSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    cards: {
      type: [CardSchema],
      required: true,
    },
    fulfilled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

OrderSchema.statics.build = (attr: IOrder) => {
  return new Order(attr);
};

const Order = mongoose.model<OrderDoc, orderModelInteface>(
  "Order",
  OrderSchema
);

export { Order };
