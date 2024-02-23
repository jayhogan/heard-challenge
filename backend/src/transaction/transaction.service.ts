import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async transactions(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }
}
