import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_order_idx\` ON \`pages_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_parent_id_idx\` ON \`pages_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_path_idx\` ON \`pages_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_order_idx\` ON \`pages_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_parent_id_idx\` ON \`pages_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_path_idx\` ON \`pages_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_image_idx\` ON \`pages_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_callout_order_idx\` ON \`pages_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_callout_parent_id_idx\` ON \`pages_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_callout_path_idx\` ON \`pages_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
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
  await db.run(sql`CREATE INDEX \`pages_banner_banner_desktop_image_idx\` ON \`pages\` (\`banner_desktop_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_banner_banner_mobile_image_idx\` ON \`pages\` (\`banner_mobile_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_idx\` ON \`pages\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_idx\` ON \`pages\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_text_order_idx\` ON \`_pages_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_text_parent_id_idx\` ON \`_pages_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_text_path_idx\` ON \`_pages_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_order_idx\` ON \`_pages_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_parent_id_idx\` ON \`_pages_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_path_idx\` ON \`_pages_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_image_idx\` ON \`_pages_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_callout_order_idx\` ON \`_pages_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_callout_parent_id_idx\` ON \`_pages_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_callout_path_idx\` ON \`_pages_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
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
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_banner_desktop_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_banner_mobile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_banner_version_banner_desktop_image_idx\` ON \`_pages_v\` (\`version_banner_desktop_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_banner_version_banner_mobile_image_idx\` ON \`_pages_v\` (\`version_banner_mobile_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_idx\` ON \`_pages_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_idx\` ON \`_pages_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_text_order_idx\` ON \`services_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_parent_id_idx\` ON \`services_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_path_idx\` ON \`services_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_image_order_idx\` ON \`services_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_image_parent_id_idx\` ON \`services_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_image_path_idx\` ON \`services_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_image_image_idx\` ON \`services_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_callout_order_idx\` ON \`services_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_callout_parent_id_idx\` ON \`services_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_callout_path_idx\` ON \`services_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_process_order_idx\` ON \`services_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_process_parent_id_idx\` ON \`services_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_faq_order_idx\` ON \`services_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_faq_parent_id_idx\` ON \`services_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_scope\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_scope_order_idx\` ON \`services_scope\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_scope_parent_id_idx\` ON \`services_scope\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
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
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_1_idx\` ON \`services\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_1_idx\` ON \`services\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`services_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`lawyers_id\` integer,
  	\`experience_id\` integer,
  	\`articles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lawyers_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`experience_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_rels_order_idx\` ON \`services_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_parent_idx\` ON \`services_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_path_idx\` ON \`services_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_lawyers_id_idx\` ON \`services_rels\` (\`lawyers_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_experience_id_idx\` ON \`services_rels\` (\`experience_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_articles_id_idx\` ON \`services_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_text_order_idx\` ON \`_services_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_text_parent_id_idx\` ON \`_services_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_text_path_idx\` ON \`_services_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_image_order_idx\` ON \`_services_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_image_parent_id_idx\` ON \`_services_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_image_path_idx\` ON \`_services_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_image_image_idx\` ON \`_services_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_callout_order_idx\` ON \`_services_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_callout_parent_id_idx\` ON \`_services_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_callout_path_idx\` ON \`_services_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_process_order_idx\` ON \`_services_v_version_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_process_parent_id_idx\` ON \`_services_v_version_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_faq_order_idx\` ON \`_services_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_faq_parent_id_idx\` ON \`_services_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_scope\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_scope_order_idx\` ON \`_services_v_version_scope\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_scope_parent_id_idx\` ON \`_services_v_version_scope\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v\` (
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
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_autosave_idx\` ON \`_services_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_1_idx\` ON \`_services_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_1_idx\` ON \`_services_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`lawyers_id\` integer,
  	\`experience_id\` integer,
  	\`articles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lawyers_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`experience_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_rels_order_idx\` ON \`_services_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_parent_idx\` ON \`_services_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_path_idx\` ON \`_services_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_lawyers_id_idx\` ON \`_services_v_rels\` (\`lawyers_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_experience_id_idx\` ON \`_services_v_rels\` (\`experience_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_articles_id_idx\` ON \`_services_v_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_blocks_text_order_idx\` ON \`industries_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_blocks_text_parent_id_idx\` ON \`industries_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industries_blocks_text_path_idx\` ON \`industries_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`industries_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_blocks_image_order_idx\` ON \`industries_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_blocks_image_parent_id_idx\` ON \`industries_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industries_blocks_image_path_idx\` ON \`industries_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`industries_blocks_image_image_idx\` ON \`industries_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_blocks_callout_order_idx\` ON \`industries_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_blocks_callout_parent_id_idx\` ON \`industries_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industries_blocks_callout_path_idx\` ON \`industries_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`industries_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_process_order_idx\` ON \`industries_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_process_parent_id_idx\` ON \`industries_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_faq_order_idx\` ON \`industries_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_faq_parent_id_idx\` ON \`industries_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries\` (
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
  await db.run(sql`CREATE INDEX \`industries_updated_at_idx\` ON \`industries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`industries_created_at_idx\` ON \`industries\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`industries__status_idx\` ON \`industries\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_2_idx\` ON \`industries\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_2_idx\` ON \`industries\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_blocks_text_order_idx\` ON \`_industries_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_blocks_text_parent_id_idx\` ON \`_industries_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_blocks_text_path_idx\` ON \`_industries_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_blocks_image_order_idx\` ON \`_industries_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_blocks_image_parent_id_idx\` ON \`_industries_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_blocks_image_path_idx\` ON \`_industries_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_blocks_image_image_idx\` ON \`_industries_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_blocks_callout_order_idx\` ON \`_industries_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_blocks_callout_parent_id_idx\` ON \`_industries_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_blocks_callout_path_idx\` ON \`_industries_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v_version_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_version_process_order_idx\` ON \`_industries_v_version_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_process_parent_id_idx\` ON \`_industries_v_version_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_version_faq_order_idx\` ON \`_industries_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_faq_parent_id_idx\` ON \`_industries_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v\` (
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
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_parent_idx\` ON \`_industries_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_updated_at_idx\` ON \`_industries_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_created_at_idx\` ON \`_industries_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version__status_idx\` ON \`_industries_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_created_at_idx\` ON \`_industries_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_updated_at_idx\` ON \`_industries_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_latest_idx\` ON \`_industries_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_autosave_idx\` ON \`_industries_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_2_idx\` ON \`_industries_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_2_idx\` ON \`_industries_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`lawyers_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lawyers_blocks_text_order_idx\` ON \`lawyers_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_blocks_text_parent_id_idx\` ON \`lawyers_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_blocks_text_path_idx\` ON \`lawyers_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`lawyers_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lawyers_blocks_image_order_idx\` ON \`lawyers_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_blocks_image_parent_id_idx\` ON \`lawyers_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_blocks_image_path_idx\` ON \`lawyers_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_blocks_image_image_idx\` ON \`lawyers_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`lawyers_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lawyers_blocks_callout_order_idx\` ON \`lawyers_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_blocks_callout_parent_id_idx\` ON \`lawyers_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_blocks_callout_path_idx\` ON \`lawyers_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`lawyers\` (
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
  await db.run(sql`CREATE INDEX \`lawyers_portrait_idx\` ON \`lawyers\` (\`portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_office_idx\` ON \`lawyers\` (\`office_id\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_updated_at_idx\` ON \`lawyers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_created_at_idx\` ON \`lawyers\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`lawyers__status_idx\` ON \`lawyers\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_3_idx\` ON \`lawyers\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_3_idx\` ON \`lawyers\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`lawyers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lawyers_rels_order_idx\` ON \`lawyers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_rels_parent_idx\` ON \`lawyers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_rels_path_idx\` ON \`lawyers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`lawyers_rels_services_id_idx\` ON \`lawyers_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`_lawyers_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_lawyers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_lawyers_v_blocks_text_order_idx\` ON \`_lawyers_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_blocks_text_parent_id_idx\` ON \`_lawyers_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_blocks_text_path_idx\` ON \`_lawyers_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_lawyers_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_lawyers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_lawyers_v_blocks_image_order_idx\` ON \`_lawyers_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_blocks_image_parent_id_idx\` ON \`_lawyers_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_blocks_image_path_idx\` ON \`_lawyers_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_blocks_image_image_idx\` ON \`_lawyers_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_lawyers_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_lawyers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_lawyers_v_blocks_callout_order_idx\` ON \`_lawyers_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_blocks_callout_parent_id_idx\` ON \`_lawyers_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_blocks_callout_path_idx\` ON \`_lawyers_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_lawyers_v\` (
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
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_office_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_lawyers_v_parent_idx\` ON \`_lawyers_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version_portrait_idx\` ON \`_lawyers_v\` (\`version_portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version_office_idx\` ON \`_lawyers_v\` (\`version_office_id\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version_updated_at_idx\` ON \`_lawyers_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version_created_at_idx\` ON \`_lawyers_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_version_version__status_idx\` ON \`_lawyers_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_created_at_idx\` ON \`_lawyers_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_updated_at_idx\` ON \`_lawyers_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_latest_idx\` ON \`_lawyers_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_autosave_idx\` ON \`_lawyers_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_3_idx\` ON \`_lawyers_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_3_idx\` ON \`_lawyers_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`_lawyers_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_lawyers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_lawyers_v_rels_order_idx\` ON \`_lawyers_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_rels_parent_idx\` ON \`_lawyers_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_rels_path_idx\` ON \`_lawyers_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_rels_services_id_idx\` ON \`_lawyers_v_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`experience_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`experience_blocks_text_order_idx\` ON \`experience_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`experience_blocks_text_parent_id_idx\` ON \`experience_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`experience_blocks_text_path_idx\` ON \`experience_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`experience_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`experience_blocks_image_order_idx\` ON \`experience_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`experience_blocks_image_parent_id_idx\` ON \`experience_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`experience_blocks_image_path_idx\` ON \`experience_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`experience_blocks_image_image_idx\` ON \`experience_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`experience_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`experience_blocks_callout_order_idx\` ON \`experience_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`experience_blocks_callout_parent_id_idx\` ON \`experience_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`experience_blocks_callout_path_idx\` ON \`experience_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`experience\` (
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
  await db.run(sql`CREATE INDEX \`experience_updated_at_idx\` ON \`experience\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`experience_created_at_idx\` ON \`experience\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`experience__status_idx\` ON \`experience\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_4_idx\` ON \`experience\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_4_idx\` ON \`experience\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`experience_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`experience_rels_order_idx\` ON \`experience_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`experience_rels_parent_idx\` ON \`experience_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`experience_rels_path_idx\` ON \`experience_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`experience_rels_services_id_idx\` ON \`experience_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`_experience_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_experience_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_experience_v_blocks_text_order_idx\` ON \`_experience_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_blocks_text_parent_id_idx\` ON \`_experience_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_blocks_text_path_idx\` ON \`_experience_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_experience_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_experience_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_experience_v_blocks_image_order_idx\` ON \`_experience_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_blocks_image_parent_id_idx\` ON \`_experience_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_blocks_image_path_idx\` ON \`_experience_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_blocks_image_image_idx\` ON \`_experience_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_experience_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_experience_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_experience_v_blocks_callout_order_idx\` ON \`_experience_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_blocks_callout_parent_id_idx\` ON \`_experience_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_blocks_callout_path_idx\` ON \`_experience_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_experience_v\` (
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
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_experience_v_parent_idx\` ON \`_experience_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_version_version_updated_at_idx\` ON \`_experience_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_version_version_created_at_idx\` ON \`_experience_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_version_version__status_idx\` ON \`_experience_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_created_at_idx\` ON \`_experience_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_updated_at_idx\` ON \`_experience_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_latest_idx\` ON \`_experience_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_autosave_idx\` ON \`_experience_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_4_idx\` ON \`_experience_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_4_idx\` ON \`_experience_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`_experience_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_experience_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_experience_v_rels_order_idx\` ON \`_experience_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_rels_parent_idx\` ON \`_experience_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_rels_path_idx\` ON \`_experience_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_rels_services_id_idx\` ON \`_experience_v_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`articles_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_blocks_text_order_idx\` ON \`articles_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`articles_blocks_text_parent_id_idx\` ON \`articles_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_blocks_text_path_idx\` ON \`articles_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`articles_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_blocks_image_order_idx\` ON \`articles_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`articles_blocks_image_parent_id_idx\` ON \`articles_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_blocks_image_path_idx\` ON \`articles_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`articles_blocks_image_image_idx\` ON \`articles_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`articles_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_blocks_callout_order_idx\` ON \`articles_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`articles_blocks_callout_parent_id_idx\` ON \`articles_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_blocks_callout_path_idx\` ON \`articles_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`articles_sources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_sources_order_idx\` ON \`articles_sources\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`articles_sources_parent_id_idx\` ON \`articles_sources\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`articles\` (
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
  await db.run(sql`CREATE INDEX \`articles_author_idx\` ON \`articles\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_updated_at_idx\` ON \`articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`articles_created_at_idx\` ON \`articles\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`articles__status_idx\` ON \`articles\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_5_idx\` ON \`articles\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_5_idx\` ON \`articles\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`articles_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_rels_order_idx\` ON \`articles_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`articles_rels_parent_idx\` ON \`articles_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_rels_path_idx\` ON \`articles_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`articles_rels_categories_id_idx\` ON \`articles_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_blocks_text_order_idx\` ON \`_articles_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_blocks_text_parent_id_idx\` ON \`_articles_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_blocks_text_path_idx\` ON \`_articles_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_blocks_image_order_idx\` ON \`_articles_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_blocks_image_parent_id_idx\` ON \`_articles_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_blocks_image_path_idx\` ON \`_articles_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_blocks_image_image_idx\` ON \`_articles_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_blocks_callout_order_idx\` ON \`_articles_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_blocks_callout_parent_id_idx\` ON \`_articles_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_blocks_callout_path_idx\` ON \`_articles_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v_version_sources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_version_sources_order_idx\` ON \`_articles_v_version_sources\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_sources_parent_id_idx\` ON \`_articles_v_version_sources\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v\` (
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
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_parent_idx\` ON \`_articles_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_author_idx\` ON \`_articles_v\` (\`version_author_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_updated_at_idx\` ON \`_articles_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_created_at_idx\` ON \`_articles_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version__status_idx\` ON \`_articles_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_created_at_idx\` ON \`_articles_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_updated_at_idx\` ON \`_articles_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_latest_idx\` ON \`_articles_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_autosave_idx\` ON \`_articles_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_5_idx\` ON \`_articles_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_5_idx\` ON \`_articles_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_rels_order_idx\` ON \`_articles_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_rels_parent_idx\` ON \`_articles_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_rels_path_idx\` ON \`_articles_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_rels_categories_id_idx\` ON \`_articles_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_blocks_text_order_idx\` ON \`categories_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_blocks_text_parent_id_idx\` ON \`categories_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_blocks_text_path_idx\` ON \`categories_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`categories_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_blocks_image_order_idx\` ON \`categories_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_blocks_image_parent_id_idx\` ON \`categories_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_blocks_image_path_idx\` ON \`categories_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`categories_blocks_image_image_idx\` ON \`categories_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_blocks_callout_order_idx\` ON \`categories_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_blocks_callout_parent_id_idx\` ON \`categories_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_blocks_callout_path_idx\` ON \`categories_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
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
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`categories__status_idx\` ON \`categories\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_6_idx\` ON \`categories\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_6_idx\` ON \`categories\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_blocks_text_order_idx\` ON \`_categories_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_blocks_text_parent_id_idx\` ON \`_categories_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_blocks_text_path_idx\` ON \`_categories_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_blocks_image_order_idx\` ON \`_categories_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_blocks_image_parent_id_idx\` ON \`_categories_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_blocks_image_path_idx\` ON \`_categories_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_blocks_image_image_idx\` ON \`_categories_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_blocks_callout_order_idx\` ON \`_categories_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_blocks_callout_parent_id_idx\` ON \`_categories_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_blocks_callout_path_idx\` ON \`_categories_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v\` (
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
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_parent_idx\` ON \`_categories_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_updated_at_idx\` ON \`_categories_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_created_at_idx\` ON \`_categories_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version__status_idx\` ON \`_categories_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_created_at_idx\` ON \`_categories_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_updated_at_idx\` ON \`_categories_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_latest_idx\` ON \`_categories_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_autosave_idx\` ON \`_categories_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_6_idx\` ON \`_categories_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_6_idx\` ON \`_categories_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`offices_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offices_blocks_text_order_idx\` ON \`offices_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offices_blocks_text_parent_id_idx\` ON \`offices_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offices_blocks_text_path_idx\` ON \`offices_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offices_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offices_blocks_image_order_idx\` ON \`offices_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offices_blocks_image_parent_id_idx\` ON \`offices_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offices_blocks_image_path_idx\` ON \`offices_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`offices_blocks_image_image_idx\` ON \`offices_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`offices_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offices_blocks_callout_order_idx\` ON \`offices_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offices_blocks_callout_parent_id_idx\` ON \`offices_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offices_blocks_callout_path_idx\` ON \`offices_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offices\` (
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
  await db.run(sql`CREATE INDEX \`offices_updated_at_idx\` ON \`offices\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`offices_created_at_idx\` ON \`offices\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`offices__status_idx\` ON \`offices\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_7_idx\` ON \`offices\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_7_idx\` ON \`offices\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`_offices_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offices_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offices_v_blocks_text_order_idx\` ON \`_offices_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_blocks_text_parent_id_idx\` ON \`_offices_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_blocks_text_path_idx\` ON \`_offices_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offices_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offices_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offices_v_blocks_image_order_idx\` ON \`_offices_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_blocks_image_parent_id_idx\` ON \`_offices_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_blocks_image_path_idx\` ON \`_offices_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_blocks_image_image_idx\` ON \`_offices_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_offices_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offices_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offices_v_blocks_callout_order_idx\` ON \`_offices_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_blocks_callout_parent_id_idx\` ON \`_offices_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_blocks_callout_path_idx\` ON \`_offices_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offices_v\` (
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
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_offices_v_parent_idx\` ON \`_offices_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_version_version_updated_at_idx\` ON \`_offices_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_version_version_created_at_idx\` ON \`_offices_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_version_version__status_idx\` ON \`_offices_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_created_at_idx\` ON \`_offices_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_updated_at_idx\` ON \`_offices_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_latest_idx\` ON \`_offices_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_autosave_idx\` ON \`_offices_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_7_idx\` ON \`_offices_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_7_idx\` ON \`_offices_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`recognitions_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`recognitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`recognitions_blocks_text_order_idx\` ON \`recognitions_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`recognitions_blocks_text_parent_id_idx\` ON \`recognitions_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`recognitions_blocks_text_path_idx\` ON \`recognitions_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`recognitions_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`recognitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`recognitions_blocks_image_order_idx\` ON \`recognitions_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`recognitions_blocks_image_parent_id_idx\` ON \`recognitions_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`recognitions_blocks_image_path_idx\` ON \`recognitions_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`recognitions_blocks_image_image_idx\` ON \`recognitions_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`recognitions_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`recognitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`recognitions_blocks_callout_order_idx\` ON \`recognitions_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`recognitions_blocks_callout_parent_id_idx\` ON \`recognitions_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`recognitions_blocks_callout_path_idx\` ON \`recognitions_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`recognitions\` (
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
  await db.run(sql`CREATE INDEX \`recognitions_updated_at_idx\` ON \`recognitions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`recognitions_created_at_idx\` ON \`recognitions\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`recognitions__status_idx\` ON \`recognitions\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_8_idx\` ON \`recognitions\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_8_idx\` ON \`recognitions\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`_recognitions_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_recognitions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_recognitions_v_blocks_text_order_idx\` ON \`_recognitions_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_blocks_text_parent_id_idx\` ON \`_recognitions_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_blocks_text_path_idx\` ON \`_recognitions_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_recognitions_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_recognitions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_recognitions_v_blocks_image_order_idx\` ON \`_recognitions_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_blocks_image_parent_id_idx\` ON \`_recognitions_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_blocks_image_path_idx\` ON \`_recognitions_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_blocks_image_image_idx\` ON \`_recognitions_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_recognitions_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_recognitions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_recognitions_v_blocks_callout_order_idx\` ON \`_recognitions_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_blocks_callout_parent_id_idx\` ON \`_recognitions_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_blocks_callout_path_idx\` ON \`_recognitions_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_recognitions_v\` (
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
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`recognitions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_recognitions_v_parent_idx\` ON \`_recognitions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_version_version_updated_at_idx\` ON \`_recognitions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_version_version_created_at_idx\` ON \`_recognitions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_version_version__status_idx\` ON \`_recognitions_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_created_at_idx\` ON \`_recognitions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_updated_at_idx\` ON \`_recognitions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_latest_idx\` ON \`_recognitions_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_autosave_idx\` ON \`_recognitions_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_8_idx\` ON \`_recognitions_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_8_idx\` ON \`_recognitions_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`careers_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`careers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`careers_blocks_text_order_idx\` ON \`careers_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`careers_blocks_text_parent_id_idx\` ON \`careers_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`careers_blocks_text_path_idx\` ON \`careers_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`careers_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`careers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`careers_blocks_image_order_idx\` ON \`careers_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`careers_blocks_image_parent_id_idx\` ON \`careers_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`careers_blocks_image_path_idx\` ON \`careers_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`careers_blocks_image_image_idx\` ON \`careers_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`careers_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`careers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`careers_blocks_callout_order_idx\` ON \`careers_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`careers_blocks_callout_parent_id_idx\` ON \`careers_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`careers_blocks_callout_path_idx\` ON \`careers_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`careers\` (
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
  await db.run(sql`CREATE INDEX \`careers_updated_at_idx\` ON \`careers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`careers_created_at_idx\` ON \`careers\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`careers__status_idx\` ON \`careers\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`slug_language_9_idx\` ON \`careers\` (\`slug\`,\`language\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translationKey_language_9_idx\` ON \`careers\` (\`translation_key\`,\`language\`);`)
  await db.run(sql`CREATE TABLE \`_careers_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_careers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_careers_v_blocks_text_order_idx\` ON \`_careers_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_blocks_text_parent_id_idx\` ON \`_careers_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_blocks_text_path_idx\` ON \`_careers_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_careers_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_careers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_careers_v_blocks_image_order_idx\` ON \`_careers_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_blocks_image_parent_id_idx\` ON \`_careers_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_blocks_image_path_idx\` ON \`_careers_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_blocks_image_image_idx\` ON \`_careers_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_careers_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_careers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_careers_v_blocks_callout_order_idx\` ON \`_careers_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_blocks_callout_parent_id_idx\` ON \`_careers_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_blocks_callout_path_idx\` ON \`_careers_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_careers_v\` (
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
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`careers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_careers_v_parent_idx\` ON \`_careers_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_version_version_updated_at_idx\` ON \`_careers_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_version_version_created_at_idx\` ON \`_careers_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_version_version__status_idx\` ON \`_careers_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_created_at_idx\` ON \`_careers_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_updated_at_idx\` ON \`_careers_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_latest_idx\` ON \`_careers_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_autosave_idx\` ON \`_careers_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_slug_version_language_9_idx\` ON \`_careers_v\` (\`version_slug\`,\`version_language\`);`)
  await db.run(sql`CREATE INDEX \`version_translationKey_version_language_9_idx\` ON \`_careers_v\` (\`version_translation_key\`,\`version_language\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`credit\` text NOT NULL,
  	\`rights\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_hero_url\` text,
  	\`sizes_hero_width\` numeric,
  	\`sizes_hero_height\` numeric,
  	\`sizes_hero_mime_type\` text,
  	\`sizes_hero_filesize\` numeric,
  	\`sizes_hero_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`)
  await db.run(sql`CREATE TABLE \`consultation_requests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`reference\` text NOT NULL,
  	\`idempotency_key\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`service\` text,
  	\`language\` text,
  	\`message\` text NOT NULL,
  	\`consent_at\` text NOT NULL,
  	\`status\` text DEFAULT 'received',
  	\`preferred_date\` text,
  	\`confirmed_at\` text,
  	\`internal_notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`consultation_requests_reference_idx\` ON \`consultation_requests\` (\`reference\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`consultation_requests_idempotency_key_idx\` ON \`consultation_requests\` (\`idempotency_key\`);`)
  await db.run(sql`CREATE INDEX \`consultation_requests_updated_at_idx\` ON \`consultation_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`consultation_requests_created_at_idx\` ON \`consultation_requests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`notification_outbox\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`request_id\` integer,
  	\`status\` text DEFAULT 'pending',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`request_id\`) REFERENCES \`consultation_requests\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`notification_outbox_request_idx\` ON \`notification_outbox\` (\`request_id\`);`)
  await db.run(sql`CREATE INDEX \`notification_outbox_updated_at_idx\` ON \`notification_outbox\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`notification_outbox_created_at_idx\` ON \`notification_outbox\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`pages_id\` integer,
  	\`services_id\` integer,
  	\`industries_id\` integer,
  	\`lawyers_id\` integer,
  	\`experience_id\` integer,
  	\`articles_id\` integer,
  	\`categories_id\` integer,
  	\`offices_id\` integer,
  	\`recognitions_id\` integer,
  	\`careers_id\` integer,
  	\`media_id\` integer,
  	\`consultation_requests_id\` integer,
  	\`notification_outbox_id\` integer,
  	\`redirects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lawyers_id\`) REFERENCES \`lawyers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`experience_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offices_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`recognitions_id\`) REFERENCES \`recognitions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`careers_id\`) REFERENCES \`careers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consultation_requests_id\`) REFERENCES \`consultation_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`notification_outbox_id\`) REFERENCES \`notification_outbox\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_industries_id_idx\` ON \`payload_locked_documents_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_lawyers_id_idx\` ON \`payload_locked_documents_rels\` (\`lawyers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_experience_id_idx\` ON \`payload_locked_documents_rels\` (\`experience_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_articles_id_idx\` ON \`payload_locked_documents_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_offices_id_idx\` ON \`payload_locked_documents_rels\` (\`offices_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_recognitions_id_idx\` ON \`payload_locked_documents_rels\` (\`recognitions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_careers_id_idx\` ON \`payload_locked_documents_rels\` (\`careers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_consultation_requests_id_idx\` ON \`payload_locked_documents_rels\` (\`consultation_requests_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_notification_outbox_id_idx\` ON \`payload_locked_documents_rels\` (\`notification_outbox_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`company_name\` text,
  	\`english_name\` text,
  	\`registration\` text,
  	\`phone\` text,
  	\`email\` text,
  	\`address\` text,
  	\`privacy_approved\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`services_process\`;`)
  await db.run(sql`DROP TABLE \`services_faq\`;`)
  await db.run(sql`DROP TABLE \`services_scope\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`services_rels\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_process\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_scope\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`_services_v_rels\`;`)
  await db.run(sql`DROP TABLE \`industries_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`industries_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`industries_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`industries_process\`;`)
  await db.run(sql`DROP TABLE \`industries_faq\`;`)
  await db.run(sql`DROP TABLE \`industries\`;`)
  await db.run(sql`DROP TABLE \`_industries_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_industries_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_industries_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_industries_v_version_process\`;`)
  await db.run(sql`DROP TABLE \`_industries_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_industries_v\`;`)
  await db.run(sql`DROP TABLE \`lawyers_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`lawyers_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`lawyers_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`lawyers\`;`)
  await db.run(sql`DROP TABLE \`lawyers_rels\`;`)
  await db.run(sql`DROP TABLE \`_lawyers_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_lawyers_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_lawyers_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_lawyers_v\`;`)
  await db.run(sql`DROP TABLE \`_lawyers_v_rels\`;`)
  await db.run(sql`DROP TABLE \`experience_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`experience_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`experience_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`experience\`;`)
  await db.run(sql`DROP TABLE \`experience_rels\`;`)
  await db.run(sql`DROP TABLE \`_experience_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_experience_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_experience_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_experience_v\`;`)
  await db.run(sql`DROP TABLE \`_experience_v_rels\`;`)
  await db.run(sql`DROP TABLE \`articles_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`articles_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`articles_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`articles_sources\`;`)
  await db.run(sql`DROP TABLE \`articles\`;`)
  await db.run(sql`DROP TABLE \`articles_rels\`;`)
  await db.run(sql`DROP TABLE \`_articles_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_articles_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_articles_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_articles_v_version_sources\`;`)
  await db.run(sql`DROP TABLE \`_articles_v\`;`)
  await db.run(sql`DROP TABLE \`_articles_v_rels\`;`)
  await db.run(sql`DROP TABLE \`categories_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`categories_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`categories_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_categories_v\`;`)
  await db.run(sql`DROP TABLE \`offices_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`offices_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`offices_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`offices\`;`)
  await db.run(sql`DROP TABLE \`_offices_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_offices_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_offices_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_offices_v\`;`)
  await db.run(sql`DROP TABLE \`recognitions_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`recognitions_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`recognitions_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`recognitions\`;`)
  await db.run(sql`DROP TABLE \`_recognitions_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_recognitions_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_recognitions_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_recognitions_v\`;`)
  await db.run(sql`DROP TABLE \`careers_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`careers_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`careers_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`careers\`;`)
  await db.run(sql`DROP TABLE \`_careers_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_careers_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_careers_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_careers_v\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`consultation_requests\`;`)
  await db.run(sql`DROP TABLE \`notification_outbox\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
}
