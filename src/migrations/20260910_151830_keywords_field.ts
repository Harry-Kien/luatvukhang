import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "keywords" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_keywords" varchar;
  ALTER TABLE "services" ADD COLUMN "keywords" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_keywords" varchar;
  ALTER TABLE "industries" ADD COLUMN "keywords" varchar;
  ALTER TABLE "_industries_v" ADD COLUMN "version_keywords" varchar;
  ALTER TABLE "lawyers" ADD COLUMN "keywords" varchar;
  ALTER TABLE "_lawyers_v" ADD COLUMN "version_keywords" varchar;
  ALTER TABLE "experience" ADD COLUMN "keywords" varchar;
  ALTER TABLE "_experience_v" ADD COLUMN "version_keywords" varchar;
  ALTER TABLE "articles" ADD COLUMN "keywords" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_keywords" varchar;
  ALTER TABLE "categories" ADD COLUMN "keywords" varchar;
  ALTER TABLE "_categories_v" ADD COLUMN "version_keywords" varchar;
  ALTER TABLE "offices" ADD COLUMN "keywords" varchar;
  ALTER TABLE "_offices_v" ADD COLUMN "version_keywords" varchar;
  ALTER TABLE "recognitions" ADD COLUMN "keywords" varchar;
  ALTER TABLE "_recognitions_v" ADD COLUMN "version_keywords" varchar;
  ALTER TABLE "careers" ADD COLUMN "keywords" varchar;
  ALTER TABLE "_careers_v" ADD COLUMN "version_keywords" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "keywords";
  ALTER TABLE "_pages_v" DROP COLUMN "version_keywords";
  ALTER TABLE "services" DROP COLUMN "keywords";
  ALTER TABLE "_services_v" DROP COLUMN "version_keywords";
  ALTER TABLE "industries" DROP COLUMN "keywords";
  ALTER TABLE "_industries_v" DROP COLUMN "version_keywords";
  ALTER TABLE "lawyers" DROP COLUMN "keywords";
  ALTER TABLE "_lawyers_v" DROP COLUMN "version_keywords";
  ALTER TABLE "experience" DROP COLUMN "keywords";
  ALTER TABLE "_experience_v" DROP COLUMN "version_keywords";
  ALTER TABLE "articles" DROP COLUMN "keywords";
  ALTER TABLE "_articles_v" DROP COLUMN "version_keywords";
  ALTER TABLE "categories" DROP COLUMN "keywords";
  ALTER TABLE "_categories_v" DROP COLUMN "version_keywords";
  ALTER TABLE "offices" DROP COLUMN "keywords";
  ALTER TABLE "_offices_v" DROP COLUMN "version_keywords";
  ALTER TABLE "recognitions" DROP COLUMN "keywords";
  ALTER TABLE "_recognitions_v" DROP COLUMN "version_keywords";
  ALTER TABLE "careers" DROP COLUMN "keywords";
  ALTER TABLE "_careers_v" DROP COLUMN "version_keywords";`)
}
