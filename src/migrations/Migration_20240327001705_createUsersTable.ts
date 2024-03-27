import { Migration } from "@mikro-orm/migrations";

export class Migration20240327001705_createUsersTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) not null, constraint "users_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }
}
