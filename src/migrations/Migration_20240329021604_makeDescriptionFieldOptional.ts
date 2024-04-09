import { Migration } from "@mikro-orm/migrations";

export class Migration20240329021604_makeDescriptionFieldOptional extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transactions" alter column "description" type varchar(255) using ("description"::varchar(255));',
    );
    this.addSql(
      'alter table "transactions" alter column "description" drop not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transactions" alter column "description" type varchar(255) using ("description"::varchar(255));',
    );
    this.addSql(
      'alter table "transactions" alter column "description" set not null;',
    );
  }
}
