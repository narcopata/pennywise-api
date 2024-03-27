import type { MikroORM } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import Container, { Token } from "typedi";
import { mainOrm } from "../database/source";

const MIKRO_ORM_ENTITY_MANAGER_TOKEN = new Token<MikroORM<PostgreSqlDriver>>(
  "MIKRO_ORM_ENTITY_MANAGER",
);

Container.set<MikroORM<PostgreSqlDriver>>(
  MIKRO_ORM_ENTITY_MANAGER_TOKEN,
  mainOrm,
);

export { MIKRO_ORM_ENTITY_MANAGER_TOKEN };
