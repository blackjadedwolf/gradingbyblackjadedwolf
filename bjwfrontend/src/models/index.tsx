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

export interface Order {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cards: Card[];
  fulfilled: boolean;
}