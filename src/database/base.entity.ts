import { PrimaryKey, Property } from "@mikro-orm/core";
import { monotonicFactory } from "ulid";

type BaseEntityType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

abstract class BaseEntity implements BaseEntityType {
  @PrimaryKey()
  id: string = monotonicFactory()();

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();
}

export { BaseEntity };
export type { BaseEntityType };
