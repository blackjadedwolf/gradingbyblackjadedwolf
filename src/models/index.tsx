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
  id?: string;
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

// Price change occured on March 01 2021, we are supporting old orders for a while
export enum SubmissionLevelsBeforeMar012021 {
  Standard5 = "Standard | 5 Day Subs | $80.00 | Max DV $2499.00",
  Standard10 = "Standard | 10 Day Subs | $50.00 | Max DV $999.00",
  Standard20 = "Standard | 20 Day Subs | $25.00 | Max DV $499.00",
  BulkBefore1971 = "Bulk | Before 1971 | 45 Day Subs | $12.00 | Max DV $199.00",
  Bulk1971to2016 = "Bulk | 1971-2016 | 45 Day Subs | $12.00 | Max DV $199.00",
  BulkAfter2017 = "Bulk | 2017-Present | 45 Day Subs | $15.00 | Max DV $199.00"
}

// cost is the cost per submitting each card
export interface SubmissionLevel {
  name: string,
  cost: number,
  maxDeclaredvalue: number,
  enabled: boolean
}

export const SubmissionLevels: SubmissionLevel[] = [
  { 
    name: "Value 2018 - Current",
    cost: 25,
    maxDeclaredvalue: 499,
    enabled: true,
  },
  {
    name: "Value 1972 - 2017",
    cost: 20,
    maxDeclaredvalue: 499,
    enabled: true,
  },
  {
    name: "Value 1971 and earlier",
    cost: 20,
    maxDeclaredvalue: 499,
    enabled: true,
  },
  {
    name: "Value TCG",
    cost: 20,
    maxDeclaredvalue: 499,
    enabled: true,
  },
  {
    name: "Economy Service",
    cost: 50,
    maxDeclaredvalue: 499,
    enabled: false,
  },
  {
    name: "Regular Service",
    cost: 100,
    maxDeclaredvalue: 999,
    enabled: true,
  },
  {
    name: "Express Service",
    cost: 175,
    maxDeclaredvalue: 2499,
    enabled: true,
  },
  {
    name: "Super Express Service",
    cost: 350,
    maxDeclaredvalue: 4999,
    enabled: true,
  },
  {
    name: "Walk Through Service",
    cost: 650,
    maxDeclaredvalue: 9999,
    enabled: true,
  },
  {
    name: "Premium Service",
    cost: 1050,
    maxDeclaredvalue: 19999,
    enabled: true,
  },
  // TODO Deal with OTHER category
];

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
