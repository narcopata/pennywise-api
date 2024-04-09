import { Migration } from "@mikro-orm/migrations";

export class Migration20240328021807_createTransactionsTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "transactions" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "description" varchar(255) not null, "amount" int not null, "type" text check ("type" in (\'income\', \'expense\')) not null, "date" timestamptz not null, "company_id" varchar(255) not null, constraint "transactions_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "transactions" add constraint "transactions_company_id_foreign" foreign key ("company_id") references "companies" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "transactions" cascade;');
  }
}
