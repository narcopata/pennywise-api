import { Inject, Service } from "typedi";
import { MIKRO_ORM_ENTITY_MANAGER_TOKEN } from "../../infra/container";
import { EnsureRequestContext, type MikroORM } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Company } from "../entities/companies.entity";
import { User } from "../entities/users.entity";

@Service()
export class CompaniesRepository {
  constructor(
    @Inject(MIKRO_ORM_ENTITY_MANAGER_TOKEN)
    private readonly orm: MikroORM<PostgreSqlDriver>,
  ) {}

  @EnsureRequestContext()
  public async create(data: {
    name: string;
    currentBalance: number;
    identifier: string;
    userId: string;
  }) {
    const company = new Company();

    const user = await this.orm.em.getRepository(User).findOne({
      id: data.userId,
    });

    company.name = data.name;
    company.currentBalance = data.currentBalance;
    company.identifier = data.identifier;
    user && company.users.add(user);

    this.orm.em.persist(company);

    await this.orm.em.flush();

    return company;
  }

  @EnsureRequestContext()
  public async findOne(identifier: string): Promise<Company | null> {
    const company = await this.orm.em.getRepository(Company).findOne({
      identifier,
    });

    return company;
  }

  @EnsureRequestContext()
  public async associateUser(userId: string, identifier: string) {
    const company = await this.orm.em.getRepository(Company).findOne({
      identifier,
    });

    const user = await this.orm.em.getRepository(User).findOne({ id: userId });

    user && company?.users.add(user);

    await this.orm.em.flush();
  }

  @EnsureRequestContext()
  public async findAllFromUser(userId: string): Promise<Company[]> {
    const companies = await this.orm.em.getRepository(Company).findAll({
      where: {
        users: {
          id: userId,
        },
      },
    });

    return companies;
  }
}
