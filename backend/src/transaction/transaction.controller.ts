import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Transaction, Prisma } from '@prisma/client';
import { TransactionService } from './transaction.service';

class TransactionDto
  implements Prisma.TransactionCreateInput, Prisma.TransactionUpdateInput
{
  @IsInt()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  fromAccount: string;

  @IsNotEmpty()
  toAccount: string;
}

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('/')
  async getTransactions(): Promise<Transaction[]> {
    return this.transactionService.transactions();
  }

  @Post('/')
  async createTransaction(@Body() body: TransactionDto): Promise<Transaction> {
    return this.transactionService.createTransaction(body);
  }

  @Get('/:transactionId')
  async getTransaction(
    @Param('transactionId') transactionId: string,
  ): Promise<Transaction> {
    return this.transactionService.transaction(transactionId);
  }

  @Post('/:transactionId')
  async updateTransaction(
    @Param('transactionId') transactionId: string,
    @Body() body: TransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.updateTransaction(transactionId, body);
  }
}
