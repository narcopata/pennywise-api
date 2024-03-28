import { Migration } from "@mikro-orm/migrations";

export class Migration20240327024952_createCompaniesTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "companies" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "identifier" varchar(255) not null, "current_balance" int not null default 0, constraint "companies_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "companies" add constraint "companies_identifier_unique" unique ("identifier");',
    );

    this.addSql(
      'create table "users_companies" ("user_id" varchar(255) not null, "company_id" varchar(255) not null, constraint "users_companies_pkey" primary key ("user_id", "company_id"));',
    );

    this.addSql(
      'alter table "users_companies" add constraint "users_companies_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "users_companies" add constraint "users_companies_company_id_foreign" foreign key ("company_id") references "companies" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "users_companies" drop constraint "users_companies_company_id_foreign";',
    );

    this.addSql('drop table if exists "companies" cascade;');

    this.addSql('drop table if exists "users_companies" cascade;');
  }
}
