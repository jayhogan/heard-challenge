import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { Transaction, Prisma } from '@prisma/client';

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
}
