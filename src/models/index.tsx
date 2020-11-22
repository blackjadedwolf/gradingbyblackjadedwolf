export interface Card {
  quantity: number;
  player_name: string;
  year: number;
  brand: string;
  product: string;
  card_number: number;
  estimated_value: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}


export enum OrderStatus {
  Waiting = "Awaiting Cards",
  Received = "Received",
  UnderReview = "Under Review",
  Shipping = "Shipping Back",
  Completed = "Completed"
}

export interface Order {
  id?: string;
  submissionLevel: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cards: Card[];
  status: OrderStatus
  dateCreated: string
}