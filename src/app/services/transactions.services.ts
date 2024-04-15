import { Service } from "typedi";
import { TransactionsRepository } from "../../database/repositories/transactions.repositories";
import {
  Transaction,
} from "../../database/entities/transactions.entity";
import type { TransactionTypeEnum } from "~app/enums/TransactionTypeEnum";

type CreateDto = {
  type: TransactionTypeEnum;
  description?: string | null;
  amount: number;
  date: Date;
  companyId: string;
};

type UpdateDto = Partial<Transaction>;

@Service()
export class TransactionsServices {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  public async create(data: CreateDto): Promise<Transaction> {
    const transaction = await this.transactionsRepository.create(data);

    return transaction;
  }

  public async getAllFromCompany(companyId: string): Promise<Transaction[]> {
    const companies =
      await this.transactionsRepository.findAllFromCompany(companyId);

    return companies;
  }

  public async delete(transactionId: string): Promise<void> {
    await this.transactionsRepository.delete(transactionId);
  }

  public async update(data: UpdateDto): Promise<Transaction | null> {
    const company = await this.transactionsRepository.update(data);

    return company;
  }
}
