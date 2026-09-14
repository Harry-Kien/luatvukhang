import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`pages_reviewed_by_idx\` ON \`pages\` (\`reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_reviewed_by_idx\` ON \`_pages_v\` (\`version_reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`services_reviewed_by_idx\` ON \`services\` (\`reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_services_v\` ADD \`version_machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_services_v\` ADD \`version_reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_services_v\` ADD \`version_reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_reviewed_by_idx\` ON \`_services_v\` (\`version_reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`industries\` ADD \`machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`industries\` ADD \`reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`industries\` ADD \`reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`industries_reviewed_by_idx\` ON \`industries\` (\`reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_industries_v\` ADD \`version_machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_industries_v\` ADD \`version_reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_industries_v\` ADD \`version_reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_reviewed_by_idx\` ON \`_industries_v\` (\`version_reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`lawyers\` ADD \`machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`lawyers\` ADD \`reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`lawyers\` ADD \`reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`lawyers_reviewed_by_idx\` ON \`lawyers\` (\`reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` ADD \`version_machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` ADD \`version_reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` ADD \`version_reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version_reviewed_by_idx\` ON \`_lawyers_v\` (\`version_reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`experience\` ADD \`machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`experience\` ADD \`reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`experience\` ADD \`reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`experience_reviewed_by_idx\` ON \`experience\` (\`reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_experience_v\` ADD \`version_machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_experience_v\` ADD \`version_reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_experience_v\` ADD \`version_reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`_experience_v_version_version_reviewed_by_idx\` ON \`_experience_v\` (\`version_reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`articles\` ADD \`machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`articles\` ADD \`reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`articles\` ADD \`reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`articles_reviewed_by_idx\` ON \`articles\` (\`reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_articles_v\` ADD \`version_machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_articles_v\` ADD \`version_reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_articles_v\` ADD \`version_reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_reviewed_by_idx\` ON \`_articles_v\` (\`version_reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`categories_reviewed_by_idx\` ON \`categories\` (\`reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_categories_v\` ADD \`version_machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_categories_v\` ADD \`version_reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_categories_v\` ADD \`version_reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_reviewed_by_idx\` ON \`_categories_v\` (\`version_reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`offices\` ADD \`machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`offices\` ADD \`reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`offices\` ADD \`reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`offices_reviewed_by_idx\` ON \`offices\` (\`reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_offices_v\` ADD \`version_machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_offices_v\` ADD \`version_reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_offices_v\` ADD \`version_reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`_offices_v_version_version_reviewed_by_idx\` ON \`_offices_v\` (\`version_reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`recognitions\` ADD \`machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`recognitions\` ADD \`reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`recognitions\` ADD \`reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`recognitions_reviewed_by_idx\` ON \`recognitions\` (\`reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_recognitions_v\` ADD \`version_machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_recognitions_v\` ADD \`version_reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_recognitions_v\` ADD \`version_reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_version_version_reviewed_by_idx\` ON \`_recognitions_v\` (\`version_reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`careers\` ADD \`machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`careers\` ADD \`reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`careers\` ADD \`reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`careers_reviewed_by_idx\` ON \`careers\` (\`reviewed_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_careers_v\` ADD \`version_machine_translated\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_careers_v\` ADD \`version_reviewed_by_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_careers_v\` ADD \`version_reviewed_at\` text;`)
  await db.run(sql`CREATE INDEX \`_careers_v_version_version_reviewed_by_idx\` ON \`_careers_v\` (\`version_reviewed_by_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`language\` text DEFAULT 'vi',
  	\`translation_key\` text,
  	\`review_state\` text DEFAULT 'working',
  	\`is_sample\` integer DEFAULT false,
  	\`summary\` text,
  	\`keywords\` text,
  	\`body\` text,
  	\`banner_desktop_image_id\` integer,
  	\`banner_mobile_image_id\` integer,
  	\`banner_desktop_x\` numeric DEFAULT 50,
  	\`banner_desktop_y\` numeric DEFAULT 50,
  	\`banner_mobile_x\` numeric DEFAULT 50,
  	\`banner_mobile_y\` numeric DEFAULT 50,
  	\`banner_fit\` text DEFAULT 'cover',
  	\`banner_shade\` numeric DEFAULT 15,
  	\`banner_caption\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`banner_desktop_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`banner_mobile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "banner_desktop_image_id", "banner_mobile_image_id", "banner_desktop_x", "banner_desktop_y", "banner_mobile_x", "banner_mobile_y", "banner_fit", "banner_shade", "banner_caption", "seo_title", "seo_description", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "banner_desktop_image_id", "banner_mobile_image_id", "banner_desktop_x", "banner_desktop_y", "banner_mobile_x", "banner_mobile_y", "banner_fit", "banner_shade", "banner_caption", "seo_title", "seo_description", "updated_at", "created_at", "_status" FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_banner_banner_desktop_image_idx\` ON \`pages\` (\`banner_desktop_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_banner_banner_mobile_image_idx\` ON \`pages\` (\`banner_mobile_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_idx\` ON \`pages\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_idx\` ON \`pages\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_language\` text DEFAULT 'vi',
  	\`version_translation_key\` text,
  	\`version_review_state\` text DEFAULT 'working',
  	\`version_is_sample\` integer DEFAULT false,
  	\`version_summary\` text,
  	\`version_keywords\` text,
  	\`version_body\` text,
  	\`version_banner_desktop_image_id\` integer,
  	\`version_banner_mobile_image_id\` integer,
  	\`version_banner_desktop_x\` numeric DEFAULT 50,
  	\`version_banner_desktop_y\` numeric DEFAULT 50,
  	\`version_banner_mobile_x\` numeric DEFAULT 50,
  	\`version_banner_mobile_y\` numeric DEFAULT 50,
  	\`version_banner_fit\` text DEFAULT 'cover',
  	\`version_banner_shade\` numeric DEFAULT 15,
  	\`version_banner_caption\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_banner_desktop_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_banner_mobile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v\`("id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_banner_desktop_image_id", "version_banner_mobile_image_id", "version_banner_desktop_x", "version_banner_desktop_y", "version_banner_mobile_x", "version_banner_mobile_y", "version_banner_fit", "version_banner_shade", "version_banner_caption", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_banner_desktop_image_id", "version_banner_mobile_image_id", "version_banner_desktop_x", "version_banner_desktop_y", "version_banner_mobile_x", "version_banner_mobile_y", "version_banner_fit", "version_banner_shade", "version_banner_caption", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_banner_version_banner_desktop_image_idx\` ON \`_pages_v\` (\`version_banner_desktop_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_banner_version_banner_mobile_image_idx\` ON \`_pages_v\` (\`version_banner_mobile_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_idx\` ON \`_pages_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_idx\` ON \`_pages_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`__new_services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`language\` text DEFAULT 'vi',
  	\`translation_key\` text,
  	\`review_state\` text DEFAULT 'working',
  	\`is_sample\` integer DEFAULT false,
  	\`summary\` text,
  	\`keywords\` text,
  	\`body\` text,
  	\`audience\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`INSERT INTO \`__new_services\`("id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "audience", "seo_title", "seo_description", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "audience", "seo_title", "seo_description", "updated_at", "created_at", "_status" FROM \`services\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`ALTER TABLE \`__new_services\` RENAME TO \`services\`;`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_1_idx\` ON \`services\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_1_idx\` ON \`services\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`__new__services_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_language\` text DEFAULT 'vi',
  	\`version_translation_key\` text,
  	\`version_review_state\` text DEFAULT 'working',
  	\`version_is_sample\` integer DEFAULT false,
  	\`version_summary\` text,
  	\`version_keywords\` text,
  	\`version_body\` text,
  	\`version_audience\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__services_v\`("id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_audience", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_audience", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__services_v\` RENAME TO \`_services_v\`;`)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_snapshot_idx\` ON \`_services_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_published_locale_idx\` ON \`_services_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_autosave_idx\` ON \`_services_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_1_idx\` ON \`_services_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_1_idx\` ON \`_services_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`__new_industries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`language\` text DEFAULT 'vi',
  	\`translation_key\` text,
  	\`review_state\` text DEFAULT 'working',
  	\`is_sample\` integer DEFAULT false,
  	\`summary\` text,
  	\`keywords\` text,
  	\`body\` text,
  	\`audience\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`INSERT INTO \`__new_industries\`("id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "audience", "seo_title", "seo_description", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "audience", "seo_title", "seo_description", "updated_at", "created_at", "_status" FROM \`industries\`;`)
  await db.run(sql`DROP TABLE \`industries\`;`)
  await db.run(sql`ALTER TABLE \`__new_industries\` RENAME TO \`industries\`;`)
  await db.run(sql`CREATE INDEX \`industries_updated_at_idx\` ON \`industries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`industries_created_at_idx\` ON \`industries\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`industries__status_idx\` ON \`industries\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_2_idx\` ON \`industries\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_2_idx\` ON \`industries\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`__new__industries_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_language\` text DEFAULT 'vi',
  	\`version_translation_key\` text,
  	\`version_review_state\` text DEFAULT 'working',
  	\`version_is_sample\` integer DEFAULT false,
  	\`version_summary\` text,
  	\`version_keywords\` text,
  	\`version_body\` text,
  	\`version_audience\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__industries_v\`("id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_audience", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_audience", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_industries_v\`;`)
  await db.run(sql`DROP TABLE \`_industries_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__industries_v\` RENAME TO \`_industries_v\`;`)
  await db.run(sql`CREATE INDEX \`_industries_v_parent_idx\` ON \`_industries_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_updated_at_idx\` ON \`_industries_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_created_at_idx\` ON \`_industries_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version__status_idx\` ON \`_industries_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_created_at_idx\` ON \`_industries_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_updated_at_idx\` ON \`_industries_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_snapshot_idx\` ON \`_industries_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_published_locale_idx\` ON \`_industries_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_latest_idx\` ON \`_industries_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_autosave_idx\` ON \`_industries_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_2_idx\` ON \`_industries_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_2_idx\` ON \`_industries_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`__new_lawyers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`language\` text DEFAULT 'vi',
  	\`translation_key\` text,
  	\`review_state\` text DEFAULT 'working',
  	\`is_sample\` integer DEFAULT false,
  	\`summary\` text,
  	\`keywords\` text,
  	\`body\` text,
  	\`position\` text,
  	\`portrait_id\` integer,
  	\`qualifications\` text,
  	\`languages\` text,
  	\`office_id\` integer,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`office_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_lawyers\`("id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "position", "portrait_id", "qualifications", "languages", "office_id", "seo_title", "seo_description", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "position", "portrait_id", "qualifications", "languages", "office_id", "seo_title", "seo_description", "updated_at", "created_at", "_status" FROM \`lawyers\`;`)
  await db.run(sql`DROP TABLE \`lawyers\`;`)
  await db.run(sql`ALTER TABLE \`__new_lawyers\` RENAME TO \`lawyers\`;`)
  await db.run(sql`CREATE INDEX \`lawyers_portrait_idx\` ON \`lawyers\` (\`portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_office_idx\` ON \`lawyers\` (\`office_id\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_updated_at_idx\` ON \`lawyers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_created_at_idx\` ON \`lawyers\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`lawyers__status_idx\` ON \`lawyers\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_3_idx\` ON \`lawyers\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_3_idx\` ON \`lawyers\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`__new__lawyers_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_language\` text DEFAULT 'vi',
  	\`version_translation_key\` text,
  	\`version_review_state\` text DEFAULT 'working',
  	\`version_is_sample\` integer DEFAULT false,
  	\`version_summary\` text,
  	\`version_keywords\` text,
  	\`version_body\` text,
  	\`version_position\` text,
  	\`version_portrait_id\` integer,
  	\`version_qualifications\` text,
  	\`version_languages\` text,
  	\`version_office_id\` integer,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_office_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__lawyers_v\`("id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_position", "version_portrait_id", "version_qualifications", "version_languages", "version_office_id", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_position", "version_portrait_id", "version_qualifications", "version_languages", "version_office_id", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_lawyers_v\`;`)
  await db.run(sql`DROP TABLE \`_lawyers_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__lawyers_v\` RENAME TO \`_lawyers_v\`;`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_parent_idx\` ON \`_lawyers_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version_portrait_idx\` ON \`_lawyers_v\` (\`version_portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version_office_idx\` ON \`_lawyers_v\` (\`version_office_id\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version_updated_at_idx\` ON \`_lawyers_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version_created_at_idx\` ON \`_lawyers_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version__status_idx\` ON \`_lawyers_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_created_at_idx\` ON \`_lawyers_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_updated_at_idx\` ON \`_lawyers_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_snapshot_idx\` ON \`_lawyers_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_published_locale_idx\` ON \`_lawyers_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_latest_idx\` ON \`_lawyers_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_autosave_idx\` ON \`_lawyers_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_3_idx\` ON \`_lawyers_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_3_idx\` ON \`_lawyers_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`__new_experience\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`language\` text DEFAULT 'vi',
  	\`translation_key\` text,
  	\`review_state\` text DEFAULT 'working',
  	\`is_sample\` integer DEFAULT false,
  	\`summary\` text,
  	\`keywords\` text,
  	\`body\` text,
  	\`disclosure_approval\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`INSERT INTO \`__new_experience\`("id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "disclosure_approval", "seo_title", "seo_description", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "disclosure_approval", "seo_title", "seo_description", "updated_at", "created_at", "_status" FROM \`experience\`;`)
  await db.run(sql`DROP TABLE \`experience\`;`)
  await db.run(sql`ALTER TABLE \`__new_experience\` RENAME TO \`experience\`;`)
  await db.run(sql`CREATE INDEX \`experience_updated_at_idx\` ON \`experience\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`experience_created_at_idx\` ON \`experience\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`experience__status_idx\` ON \`experience\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_4_idx\` ON \`experience\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_4_idx\` ON \`experience\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`__new__experience_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_language\` text DEFAULT 'vi',
  	\`version_translation_key\` text,
  	\`version_review_state\` text DEFAULT 'working',
  	\`version_is_sample\` integer DEFAULT false,
  	\`version_summary\` text,
  	\`version_keywords\` text,
  	\`version_body\` text,
  	\`version_disclosure_approval\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__experience_v\`("id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_disclosure_approval", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_disclosure_approval", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_experience_v\`;`)
  await db.run(sql`DROP TABLE \`_experience_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__experience_v\` RENAME TO \`_experience_v\`;`)
  await db.run(sql`CREATE INDEX \`_experience_v_parent_idx\` ON \`_experience_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_version_version_updated_at_idx\` ON \`_experience_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_version_version_created_at_idx\` ON \`_experience_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_version_version__status_idx\` ON \`_experience_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_created_at_idx\` ON \`_experience_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_updated_at_idx\` ON \`_experience_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_snapshot_idx\` ON \`_experience_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_published_locale_idx\` ON \`_experience_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_latest_idx\` ON \`_experience_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_autosave_idx\` ON \`_experience_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_4_idx\` ON \`_experience_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_4_idx\` ON \`_experience_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`__new_articles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`language\` text DEFAULT 'vi',
  	\`translation_key\` text,
  	\`review_state\` text DEFAULT 'working',
  	\`is_sample\` integer DEFAULT false,
  	\`summary\` text,
  	\`keywords\` text,
  	\`body\` text,
  	\`author_id\` integer,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`author_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_articles\`("id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "author_id", "seo_title", "seo_description", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "author_id", "seo_title", "seo_description", "updated_at", "created_at", "_status" FROM \`articles\`;`)
  await db.run(sql`DROP TABLE \`articles\`;`)
  await db.run(sql`ALTER TABLE \`__new_articles\` RENAME TO \`articles\`;`)
  await db.run(sql`CREATE INDEX \`articles_author_idx\` ON \`articles\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_updated_at_idx\` ON \`articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`articles_created_at_idx\` ON \`articles\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`articles__status_idx\` ON \`articles\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_5_idx\` ON \`articles\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_5_idx\` ON \`articles\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`__new__articles_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_language\` text DEFAULT 'vi',
  	\`version_translation_key\` text,
  	\`version_review_state\` text DEFAULT 'working',
  	\`version_is_sample\` integer DEFAULT false,
  	\`version_summary\` text,
  	\`version_keywords\` text,
  	\`version_body\` text,
  	\`version_author_id\` integer,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__articles_v\`("id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_author_id", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_author_id", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_articles_v\`;`)
  await db.run(sql`DROP TABLE \`_articles_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__articles_v\` RENAME TO \`_articles_v\`;`)
  await db.run(sql`CREATE INDEX \`_articles_v_parent_idx\` ON \`_articles_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_author_idx\` ON \`_articles_v\` (\`version_author_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_updated_at_idx\` ON \`_articles_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_created_at_idx\` ON \`_articles_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version__status_idx\` ON \`_articles_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_created_at_idx\` ON \`_articles_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_updated_at_idx\` ON \`_articles_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_snapshot_idx\` ON \`_articles_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_published_locale_idx\` ON \`_articles_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_latest_idx\` ON \`_articles_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_autosave_idx\` ON \`_articles_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_5_idx\` ON \`_articles_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_5_idx\` ON \`_articles_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`__new_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`language\` text DEFAULT 'vi',
  	\`translation_key\` text,
  	\`review_state\` text DEFAULT 'working',
  	\`is_sample\` integer DEFAULT false,
  	\`summary\` text,
  	\`keywords\` text,
  	\`body\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories\`("id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "seo_title", "seo_description", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "seo_title", "seo_description", "updated_at", "created_at", "_status" FROM \`categories\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories\` RENAME TO \`categories\`;`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`categories__status_idx\` ON \`categories\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_6_idx\` ON \`categories\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_6_idx\` ON \`categories\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_language\` text DEFAULT 'vi',
  	\`version_translation_key\` text,
  	\`version_review_state\` text DEFAULT 'working',
  	\`version_is_sample\` integer DEFAULT false,
  	\`version_summary\` text,
  	\`version_keywords\` text,
  	\`version_body\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v\`("id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_categories_v\`;`)
  await db.run(sql`DROP TABLE \`_categories_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v\` RENAME TO \`_categories_v\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_parent_idx\` ON \`_categories_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_updated_at_idx\` ON \`_categories_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_created_at_idx\` ON \`_categories_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version__status_idx\` ON \`_categories_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_created_at_idx\` ON \`_categories_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_updated_at_idx\` ON \`_categories_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_snapshot_idx\` ON \`_categories_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_published_locale_idx\` ON \`_categories_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_latest_idx\` ON \`_categories_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_autosave_idx\` ON \`_categories_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_6_idx\` ON \`_categories_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_6_idx\` ON \`_categories_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`__new_offices\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`language\` text DEFAULT 'vi',
  	\`translation_key\` text,
  	\`review_state\` text DEFAULT 'working',
  	\`is_sample\` integer DEFAULT false,
  	\`summary\` text,
  	\`keywords\` text,
  	\`body\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`INSERT INTO \`__new_offices\`("id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "seo_title", "seo_description", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "seo_title", "seo_description", "updated_at", "created_at", "_status" FROM \`offices\`;`)
  await db.run(sql`DROP TABLE \`offices\`;`)
  await db.run(sql`ALTER TABLE \`__new_offices\` RENAME TO \`offices\`;`)
  await db.run(sql`CREATE INDEX \`offices_updated_at_idx\` ON \`offices\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`offices_created_at_idx\` ON \`offices\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`offices__status_idx\` ON \`offices\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_7_idx\` ON \`offices\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_7_idx\` ON \`offices\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`__new__offices_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_language\` text DEFAULT 'vi',
  	\`version_translation_key\` text,
  	\`version_review_state\` text DEFAULT 'working',
  	\`version_is_sample\` integer DEFAULT false,
  	\`version_summary\` text,
  	\`version_keywords\` text,
  	\`version_body\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__offices_v\`("id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_offices_v\`;`)
  await db.run(sql`DROP TABLE \`_offices_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__offices_v\` RENAME TO \`_offices_v\`;`)
  await db.run(sql`CREATE INDEX \`_offices_v_parent_idx\` ON \`_offices_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_version_version_updated_at_idx\` ON \`_offices_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_version_version_created_at_idx\` ON \`_offices_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_version_version__status_idx\` ON \`_offices_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_created_at_idx\` ON \`_offices_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_updated_at_idx\` ON \`_offices_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_snapshot_idx\` ON \`_offices_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_published_locale_idx\` ON \`_offices_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_latest_idx\` ON \`_offices_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_autosave_idx\` ON \`_offices_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_7_idx\` ON \`_offices_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_7_idx\` ON \`_offices_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`__new_recognitions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`language\` text DEFAULT 'vi',
  	\`translation_key\` text,
  	\`review_state\` text DEFAULT 'working',
  	\`is_sample\` integer DEFAULT false,
  	\`summary\` text,
  	\`keywords\` text,
  	\`body\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`INSERT INTO \`__new_recognitions\`("id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "seo_title", "seo_description", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "seo_title", "seo_description", "updated_at", "created_at", "_status" FROM \`recognitions\`;`)
  await db.run(sql`DROP TABLE \`recognitions\`;`)
  await db.run(sql`ALTER TABLE \`__new_recognitions\` RENAME TO \`recognitions\`;`)
  await db.run(sql`CREATE INDEX \`recognitions_updated_at_idx\` ON \`recognitions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`recognitions_created_at_idx\` ON \`recognitions\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`recognitions__status_idx\` ON \`recognitions\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_8_idx\` ON \`recognitions\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_8_idx\` ON \`recognitions\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`__new__recognitions_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_language\` text DEFAULT 'vi',
  	\`version_translation_key\` text,
  	\`version_review_state\` text DEFAULT 'working',
  	\`version_is_sample\` integer DEFAULT false,
  	\`version_summary\` text,
  	\`version_keywords\` text,
  	\`version_body\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`recognitions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__recognitions_v\`("id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_recognitions_v\`;`)
  await db.run(sql`DROP TABLE \`_recognitions_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__recognitions_v\` RENAME TO \`_recognitions_v\`;`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_parent_idx\` ON \`_recognitions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_version_version_updated_at_idx\` ON \`_recognitions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_version_version_created_at_idx\` ON \`_recognitions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_version_version__status_idx\` ON \`_recognitions_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_created_at_idx\` ON \`_recognitions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_updated_at_idx\` ON \`_recognitions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_snapshot_idx\` ON \`_recognitions_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_published_locale_idx\` ON \`_recognitions_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_latest_idx\` ON \`_recognitions_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_autosave_idx\` ON \`_recognitions_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_8_idx\` ON \`_recognitions_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_8_idx\` ON \`_recognitions_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`__new_careers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`language\` text DEFAULT 'vi',
  	\`translation_key\` text,
  	\`review_state\` text DEFAULT 'working',
  	\`is_sample\` integer DEFAULT false,
  	\`summary\` text,
  	\`keywords\` text,
  	\`body\` text,
  	\`location\` text,
  	\`closing_date\` text,
  	\`application_email\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`INSERT INTO \`__new_careers\`("id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "location", "closing_date", "application_email", "seo_title", "seo_description", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "language", "translation_key", "review_state", "is_sample", "summary", "keywords", "body", "location", "closing_date", "application_email", "seo_title", "seo_description", "updated_at", "created_at", "_status" FROM \`careers\`;`)
  await db.run(sql`DROP TABLE \`careers\`;`)
  await db.run(sql`ALTER TABLE \`__new_careers\` RENAME TO \`careers\`;`)
  await db.run(sql`CREATE INDEX \`careers_updated_at_idx\` ON \`careers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`careers_created_at_idx\` ON \`careers\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`careers__status_idx\` ON \`careers\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_9_idx\` ON \`careers\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_9_idx\` ON \`careers\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`__new__careers_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_language\` text DEFAULT 'vi',
  	\`version_translation_key\` text,
  	\`version_review_state\` text DEFAULT 'working',
  	\`version_is_sample\` integer DEFAULT false,
  	\`version_summary\` text,
  	\`version_keywords\` text,
  	\`version_body\` text,
  	\`version_location\` text,
  	\`version_closing_date\` text,
  	\`version_application_email\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`careers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__careers_v\`("id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_location", "version_closing_date", "version_application_email", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_slug", "version_language", "version_translation_key", "version_review_state", "version_is_sample", "version_summary", "version_keywords", "version_body", "version_location", "version_closing_date", "version_application_email", "version_seo_title", "version_seo_description", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_careers_v\`;`)
  await db.run(sql`DROP TABLE \`_careers_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__careers_v\` RENAME TO \`_careers_v\`;`)
  await db.run(sql`CREATE INDEX \`_careers_v_parent_idx\` ON \`_careers_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_version_version_updated_at_idx\` ON \`_careers_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_version_version_created_at_idx\` ON \`_careers_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_version_version__status_idx\` ON \`_careers_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_created_at_idx\` ON \`_careers_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_updated_at_idx\` ON \`_careers_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_snapshot_idx\` ON \`_careers_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_published_locale_idx\` ON \`_careers_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_latest_idx\` ON \`_careers_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_autosave_idx\` ON \`_careers_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_9_idx\` ON \`_careers_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_9_idx\` ON \`_careers_v\` (\`version_translation_key\`,\`version_language\`);`)
}
