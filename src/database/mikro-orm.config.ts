import { defineConfig } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

const config = defineConfig<PostgreSqlDriver>({
  driver: PostgreSqlDriver,
  entities: ["./src/database/entities"],
  entitiesTs: ["./src/database/entities"],
  dbName: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_DATABASE_PORT),
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_USER,
  user: process.env.POSTGRES_USER,
  migrations: {
    fileName(timestamp, name) {
      return `Migration_${timestamp}${name ? `_${name}` : ""}`;
    },
  },
  extensions: [Migrator],
});

export default config;
