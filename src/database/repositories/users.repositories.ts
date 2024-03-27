import { Inject, Service } from "typedi";
import { MIKRO_ORM_ENTITY_MANAGER_TOKEN } from "../../infra/container";
import { EnsureRequestContext, type MikroORM } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "../entities/users.entity";

@Service()
export class UsersRepository {
  constructor(
    @Inject(MIKRO_ORM_ENTITY_MANAGER_TOKEN)
    private readonly orm: MikroORM<PostgreSqlDriver>
  ) {}

  @EnsureRequestContext()
  public async create(email: string, password: string): Promise<User> {
    const userToCreate = new User();

    userToCreate.email = email;
    userToCreate.password = password;

    await this.orm.em.getRepository(User).insert(userToCreate);

    return userToCreate;
  }

  @EnsureRequestContext()
  public async findOne(email: string): Promise<User | null> {
    const user = await this.orm.em.getRepository(User).findOne({
      email,
    });

    return user;
  }
}
