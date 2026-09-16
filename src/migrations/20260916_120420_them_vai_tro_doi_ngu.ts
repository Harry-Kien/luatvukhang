import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`lawyers\` ADD \`role\` text DEFAULT 'lawyer';`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` ADD \`version_role\` text DEFAULT 'lawyer';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`lawyers\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` DROP COLUMN \`version_role\`;`)
}
