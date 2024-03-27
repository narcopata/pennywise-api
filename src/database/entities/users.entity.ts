import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "../base.entity";

@Entity({
  tableName: "users",
})
export class User extends BaseEntity {
  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;
}
