import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { Transaction, Prisma } from '@prisma/client';

export interface AccountBalance {
  balance: number;
}

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async transactions(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  async transaction(transactionId: string): Promise<Transaction> {
    return this.prisma.transaction.findUniqueOrThrow({
      where: { transactionId },
    });
  }

  async createTransaction(
    data: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    return this.prisma.transaction.create({ data });
  }

  async updateTransaction(
    transactionId: string,
    data: Prisma.TransactionUpdateInput,
  ): Promise<Transaction> {
    return this.prisma.transaction.update({
      data,
      where: { transactionId },
    });
  }

  async removeTransaction(transactionId: string): Promise<Transaction> {
    return this.prisma.transaction.delete({
      where: { transactionId },
    });
  }

  async getAccountBalances(): Promise<any> {
    const transactions = await this.prisma.transaction.findMany();

    const result = transactions.reduce((map, transaction) => {
      let accountBalance: AccountBalance = map.get(transaction.fromAccount);
      if (!accountBalance) {
        accountBalance = { balance: 0 };
      }
      accountBalance.balance -= transaction.amount;
      map.set(transaction.fromAccount, accountBalance);


      accountBalance = map.get(transaction.toAccount);
      if (!accountBalance) {
        accountBalance = { balance: 0 };
      }
      accountBalance.balance += transaction.amount;
      map.set(transaction.toAccount, accountBalance);

      return map;
    }, new Map());
    return result;
  }

}
