import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "../base.entity";
import { User } from "./users.entity";
import { Transaction } from "./transactions.entity";

@Entity({ tableName: "companies" })
export class Company extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  @Unique()
  identifier!: string;

  @ManyToMany(
    () => User,
    (user) => user.companies,
  )
  users = new Collection<User>(this);

  @Property()
  currentBalance: number = 0;

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.company,
  )
  transactions = new Collection<Transaction>(this);
}
