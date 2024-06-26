import { Inject, Service } from "typedi";
import { MIKRO_ORM_ENTITY_MANAGER_TOKEN } from "../../infra/container";
import { EnsureRequestContext, type MikroORM } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Company } from "../entities/companies.entity";
import {
  Transaction,
} from "../entities/transactions.entity";
import type { TransactionTypeEnum } from "~app/enums/TransactionTypeEnum";

@Service()
export class TransactionsRepository {
  constructor(
    @Inject(MIKRO_ORM_ENTITY_MANAGER_TOKEN)
    private readonly orm: MikroORM<PostgreSqlDriver>,
  ) {}

  @EnsureRequestContext()
  public async create(data: {
    type: TransactionTypeEnum;
    description?: string | null;
    amount: number;
    date: Date;
    companyId: string;
  }) {
    const transaction = new Transaction();

    const company = await this.orm.em.getRepository(Company).findOne({
      id: data.companyId,
    });

    transaction.amount = data.amount;
    transaction.date = data.date;
    transaction.description = data.description;
    transaction.type = data.type;

    company && (transaction.company = company);

    this.orm.em.persist(transaction);

    await this.orm.em.flush();

    return transaction;
  }

  @EnsureRequestContext()
  public async update(data: Partial<Transaction>): Promise<Transaction> {
    const transaction = await this.orm.em.getRepository(Transaction).findOne({
      id: data.id,
    });

    if (!transaction) {
      throw new Error("");
    }

    Object.assign(transaction, data);

    await this.orm.em.flush();

    return transaction;
  }

  @EnsureRequestContext()
  public async delete(transactionId: string) {
    const transaction = await this.orm.em.getRepository(Transaction).findOne({
      id: transactionId,
    });

    transaction && (await this.orm.em.removeAndFlush(transaction));
  }

  @EnsureRequestContext()
  public async findAllFromCompany(companyId: string): Promise<Transaction[]> {
    const transactions = await this.orm.em.getRepository(Transaction).findAll({
      where: {
        company: {
          id: companyId,
        },
      },
    });

    return transactions;
  }
}
