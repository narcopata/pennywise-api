import { Entity, Enum, ManyToOne, Property, type Rel } from "@mikro-orm/core";
import { BaseEntity } from "../base.entity";
import { Company } from "./companies.entity";

export enum TransactionTypeEnum {
  INCOME = "income",
  EXPENSE = "expense",
}

@Entity({
  tableName: "transactions",
})
export class Transaction extends BaseEntity {
  @Property({ nullable: true })
  description?: string | null;

  @Property()
  amount!: number;

  @Enum(() => TransactionTypeEnum)
  type!: TransactionTypeEnum;

  @Property()
  date!: Date;

  @ManyToOne(() => Company)
  company!: Rel<Company>;
}
