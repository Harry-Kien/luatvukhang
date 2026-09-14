import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_locales\` (
  	\`address\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_locales_locale_parent_id_unique\` ON \`site_settings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_layout_header_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	\`visible\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_layout_header_menu_order_idx\` ON \`site_layout_header_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_layout_header_menu_parent_id_idx\` ON \`site_layout_header_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_layout_header_menu_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout_header_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_layout_header_menu_locales_locale_parent_id_unique\` ON \`site_layout_header_menu_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_layout_home_discover_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_layout_home_discover_cards_order_idx\` ON \`site_layout_home_discover_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_layout_home_discover_cards_parent_id_idx\` ON \`site_layout_home_discover_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_layout_home_discover_cards_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout_home_discover_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_layout_home_discover_cards_locales_locale_parent_id_uni\` ON \`site_layout_home_discover_cards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_layout_home_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_layout_home_steps_order_idx\` ON \`site_layout_home_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_layout_home_steps_parent_id_idx\` ON \`site_layout_home_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_layout_home_steps_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout_home_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_layout_home_steps_locales_locale_parent_id_unique\` ON \`site_layout_home_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_layout_footer_extra_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_layout_footer_extra_links_order_idx\` ON \`site_layout_footer_extra_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_layout_footer_extra_links_parent_id_idx\` ON \`site_layout_footer_extra_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_layout_footer_extra_links_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout_footer_extra_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_layout_footer_extra_links_locales_locale_parent_id_uniq\` ON \`site_layout_footer_extra_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_layout\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`header_cta_href\` text,
  	\`home_hero_primary_href\` text,
  	\`home_hero_secondary_href\` text,
  	\`home_about_link_href\` text,
  	\`home_expertise_link_href\` text,
  	\`home_start_cta_href\` text,
  	\`footer_invitation_cta_href\` text,
  	\`contact_zalo\` text,
  	\`contact_facebook\` text,
  	\`contact_linkedin\` text,
  	\`contact_youtube\` text,
  	\`contact_map_url\` text,
  	\`contact_map_embed\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`site_layout_locales\` (
  	\`header_tagline\` text,
  	\`header_cta_label\` text,
  	\`home_hero_kicker\` text,
  	\`home_hero_title\` text,
  	\`home_hero_summary\` text,
  	\`home_hero_primary_label\` text,
  	\`home_hero_secondary_label\` text,
  	\`home_discover_title\` text,
  	\`home_about_kicker\` text,
  	\`home_about_title\` text,
  	\`home_about_lead\` text,
  	\`home_about_text\` text,
  	\`home_about_link_label\` text,
  	\`home_expertise_kicker\` text,
  	\`home_expertise_title\` text,
  	\`home_expertise_text\` text,
  	\`home_expertise_link_label\` text,
  	\`home_start_kicker\` text,
  	\`home_start_title\` text,
  	\`home_start_text\` text,
  	\`home_start_cta_label\` text,
  	\`footer_kicker\` text,
  	\`footer_title\` text,
  	\`footer_invitation\` text,
  	\`footer_invitation_cta_label\` text,
  	\`footer_motto\` text,
  	\`footer_explore_title\` text,
  	\`footer_connect_title\` text,
  	\`footer_copyright\` text,
  	\`contact_hours\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_layout_locales_locale_parent_id_unique\` ON \`site_layout_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_services_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_services_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_services_v_snapshot_idx\` ON \`_services_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_published_locale_idx\` ON \`_services_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_industries_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_industries_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_industries_v_snapshot_idx\` ON \`_industries_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_published_locale_idx\` ON \`_industries_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_snapshot_idx\` ON \`_lawyers_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_lawyers_v_published_locale_idx\` ON \`_lawyers_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_experience_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_experience_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_experience_v_snapshot_idx\` ON \`_experience_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_experience_v_published_locale_idx\` ON \`_experience_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_articles_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_articles_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_articles_v_snapshot_idx\` ON \`_articles_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_published_locale_idx\` ON \`_articles_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_categories_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_categories_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_categories_v_snapshot_idx\` ON \`_categories_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_published_locale_idx\` ON \`_categories_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_offices_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_offices_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_offices_v_snapshot_idx\` ON \`_offices_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_offices_v_published_locale_idx\` ON \`_offices_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_recognitions_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_recognitions_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_snapshot_idx\` ON \`_recognitions_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_recognitions_v_published_locale_idx\` ON \`_recognitions_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_careers_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_careers_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_careers_v_snapshot_idx\` ON \`_careers_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_careers_v_published_locale_idx\` ON \`_careers_v\` (\`published_locale\`);`)
  // Giữ địa chỉ đã nhập: chuyển sang bảng theo ngôn ngữ (tiếng Việt) trước khi bỏ cột.
  await db.run(sql`INSERT INTO \`site_settings_locales\` (\`address\`, \`_locale\`, \`_parent_id\`)
    SELECT \`address\`, 'vi', \`id\` FROM \`site_settings\` WHERE \`address\` IS NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`address\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`site_layout_header_menu\`;`)
  await db.run(sql`DROP TABLE \`site_layout_header_menu_locales\`;`)
  await db.run(sql`DROP TABLE \`site_layout_home_discover_cards\`;`)
  await db.run(sql`DROP TABLE \`site_layout_home_discover_cards_locales\`;`)
  await db.run(sql`DROP TABLE \`site_layout_home_steps\`;`)
  await db.run(sql`DROP TABLE \`site_layout_home_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`site_layout_footer_extra_links\`;`)
  await db.run(sql`DROP TABLE \`site_layout_footer_extra_links_locales\`;`)
  await db.run(sql`DROP TABLE \`site_layout\`;`)
  await db.run(sql`DROP TABLE \`site_layout_locales\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_services_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_services_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_services_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_services_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_industries_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_industries_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_industries_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_industries_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_lawyers_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_lawyers_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_lawyers_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_experience_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_experience_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_experience_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_experience_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_articles_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_articles_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_articles_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_articles_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_categories_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_categories_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_categories_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_categories_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_offices_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_offices_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_offices_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_offices_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_recognitions_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_recognitions_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_recognitions_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_recognitions_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_careers_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_careers_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_careers_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_careers_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`address\` text;`)
}
