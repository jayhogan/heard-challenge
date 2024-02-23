import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from '@prisma/client';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('/')
  async getTransactions(): Promise<Transaction[]> {
    return this.transactionService.transactions();
  }
}
