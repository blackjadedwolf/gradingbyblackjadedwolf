export interface Card {
  player_name: string;
  year: number;
  brand: string;
  product: string;
  card_number: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}