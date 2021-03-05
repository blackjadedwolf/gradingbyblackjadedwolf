export interface SubmittedCard {
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
  Waiting = "Awaiting Order",
  Received = "Order Received",
  Processing = "Processing",
  ShippedToGrader = "Shipped to Grader",
  Grading = "Being Graded",
  OrderReady = "Order Ready",
  OrderArrived = "Order Arrived",
  MailedOut = "Order Mailed"
}

export enum SubmissionLevel {
  Standard5 = "Standard | 5 Day Subs | $80.00 | Max DV $2499.00",
  Standard10 = "Standard | 10 Day Subs | $50.00 | Max DV $999.00",
  Standard20 = "Standard | 20 Day Subs | $25.00 | Max DV $499.00",
  BulkBefore1971 = "Bulk | Before 1971 | 45 Day Subs | $12.00 | Max DV $199.00",
  Bulk1971to2016 = "Bulk | 1971-2016 | 45 Day Subs | $12.00 | Max DV $199.00",
  BulkAfter2017 = "Bulk | 2017-Present | 45 Day Subs | $15.00 | Max DV $199.00"
}

export interface Order {
  id?: string;
  psa_id?: number;
  submissionLevel: SubmissionLevel;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cards: SubmittedCard[];
  status: OrderStatus;
  dateCreated: string;
  notes?: string;
}
