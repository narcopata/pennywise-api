import { Service } from "typedi";
import { TransactionsRepository } from "../../database/repositories/transactions.repositories";
import { Transaction, TransactionTypeEnum } from "../../database/entities/transactions.entity";

type CreateDto = {
  type: TransactionTypeEnum;
  description?: string | null;
  amount: number;
  date: Date;
  id: string;
};

type UpdateDto = Partial<Transaction> & { companyId: string; };

@Service()
export class TransactionsServices {
  constructor(private readonly transactionsRepository: TransactionsRepository) {}

  public async create(data: CreateDto): Promise<Transaction> {
    const transaction = await this.transactionsRepository.create(data);

    return transaction;
  }

  public async getAllFromCompany(companyId: string): Promise<Transaction[]> {
    const companies = await this.transactionsRepository.findAllFromCompany(companyId);

    return companies;
  }

  public async delete(
    transactionId: string,
  ): Promise<void> {
    await this.transactionsRepository.delete(transactionId);
  }

  public async update(data: UpdateDto): Promise<Transaction | null> {
    const company = await this.transactionsRepository.update(data);

    return company;
  }
}
