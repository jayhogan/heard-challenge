
export interface Transaction {
  transactionId: string;
  amount: number;
  description: string;
  fromAccount: string;
  toAccount: string;
  transactionDate: string;
}
