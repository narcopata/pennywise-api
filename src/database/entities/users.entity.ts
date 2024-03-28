import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "../base.entity";
import { Company } from "./companies.entity";

@Entity({
  tableName: "users",
})
export class User extends BaseEntity {
  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;

  @ManyToMany(() => Company, "users", { owner: true })
  companies = new Collection<Company>(this);
}
