import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_ecosystem\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`url\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_ecosystem_order_idx\` ON \`site_settings_ecosystem\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_ecosystem_parent_id_idx\` ON \`site_settings_ecosystem\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_ecosystem_logo_idx\` ON \`site_settings_ecosystem\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_ecosystem_locales\` (
  	\`role\` text,
  	\`summary\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_ecosystem\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_ecosystem_locales_locale_parent_id_unique\` ON \`site_settings_ecosystem_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`lawyers\` ADD \`team\` text;`)
  await db.run(sql`ALTER TABLE \`lawyers\` ADD \`sort_order\` numeric;`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` ADD \`version_team\` text;`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` ADD \`version_sort_order\` numeric;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`ecosystem_seeded\` integer DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_ecosystem\`;`)
  await db.run(sql`DROP TABLE \`site_settings_ecosystem_locales\`;`)
  await db.run(sql`ALTER TABLE \`lawyers\` DROP COLUMN \`team\`;`)
  await db.run(sql`ALTER TABLE \`lawyers\` DROP COLUMN \`sort_order\`;`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` DROP COLUMN \`version_team\`;`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` DROP COLUMN \`version_sort_order\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`ecosystem_seeded\`;`)
}
