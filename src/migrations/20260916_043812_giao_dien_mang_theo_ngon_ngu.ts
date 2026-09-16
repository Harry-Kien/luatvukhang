import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  /**
   * Menu, ba thẻ khám phá, ba bước và liên kết chân trang chuyển từ "mảng dùng
   * chung, nhãn dịch riêng" sang "mỗi ngôn ngữ một mảng".
   *
   * Cách cũ khiến ba ngôn ngữ giành nhau cùng một hàng: sửa menu ở bản tiếng
   * Việt là nhãn tiếng Anh và tiếng Trung mất theo, và trang tiếng Anh quay về
   * hiện chữ tiếng Việt.
   *
   * Các hàng cũ bị xoá chứ không chuyển đổi: một hàng dùng chung không tách ra
   * được thành ba hàng có nhãn đúng ba ngôn ngữ, và SQLite cũng không cho thêm
   * cột NOT NULL vào bảng đang có dữ liệu. Chạy lại scripts/prepare-site-layout.ts
   * ngay sau khi migrate để nạp đủ ba ngôn ngữ — hosting-setup.mjs đã gọi sẵn.
   */
  await db.run(sql`DELETE FROM \`site_layout_header_menu\`;`);
  await db.run(sql`DELETE FROM \`site_layout_home_discover_cards\`;`);
  await db.run(sql`DELETE FROM \`site_layout_home_steps\`;`);
  await db.run(sql`DELETE FROM \`site_layout_footer_extra_links\`;`);
  await db.run(sql`DROP TABLE \`site_layout_header_menu_locales\`;`);
  await db.run(sql`DROP TABLE \`site_layout_home_discover_cards_locales\`;`);
  await db.run(sql`DROP TABLE \`site_layout_home_steps_locales\`;`);
  await db.run(sql`DROP TABLE \`site_layout_footer_extra_links_locales\`;`);
  await db.run(
    sql`ALTER TABLE \`site_layout_header_menu\` ADD \`_locale\` text NOT NULL;`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_header_menu\` ADD \`label\` text;`,
  );
  await db.run(
    sql`CREATE INDEX \`site_layout_header_menu_locale_idx\` ON \`site_layout_header_menu\` (\`_locale\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_home_discover_cards\` ADD \`_locale\` text NOT NULL;`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_home_discover_cards\` ADD \`title\` text;`,
  );
  await db.run(
    sql`CREATE INDEX \`site_layout_home_discover_cards_locale_idx\` ON \`site_layout_home_discover_cards\` (\`_locale\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_home_steps\` ADD \`_locale\` text NOT NULL;`,
  );
  await db.run(sql`ALTER TABLE \`site_layout_home_steps\` ADD \`title\` text;`);
  await db.run(sql`ALTER TABLE \`site_layout_home_steps\` ADD \`text\` text;`);
  await db.run(
    sql`CREATE INDEX \`site_layout_home_steps_locale_idx\` ON \`site_layout_home_steps\` (\`_locale\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_footer_extra_links\` ADD \`_locale\` text NOT NULL;`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_footer_extra_links\` ADD \`label\` text;`,
  );
  await db.run(
    sql`CREATE INDEX \`site_layout_footer_extra_links_locale_idx\` ON \`site_layout_footer_extra_links\` (\`_locale\`);`,
  );
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_layout_header_menu_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout_header_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`site_layout_header_menu_locales_locale_parent_id_unique\` ON \`site_layout_header_menu_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`site_layout_home_discover_cards_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout_home_discover_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`site_layout_home_discover_cards_locales_locale_parent_id_uni\` ON \`site_layout_home_discover_cards_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`site_layout_home_steps_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout_home_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`site_layout_home_steps_locales_locale_parent_id_unique\` ON \`site_layout_home_steps_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`site_layout_footer_extra_links_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_layout_footer_extra_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`site_layout_footer_extra_links_locales_locale_parent_id_uniq\` ON \`site_layout_footer_extra_links_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`DROP INDEX \`site_layout_header_menu_locale_idx\`;`);
  await db.run(
    sql`ALTER TABLE \`site_layout_header_menu\` DROP COLUMN \`_locale\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_header_menu\` DROP COLUMN \`label\`;`,
  );
  await db.run(sql`DROP INDEX \`site_layout_home_discover_cards_locale_idx\`;`);
  await db.run(
    sql`ALTER TABLE \`site_layout_home_discover_cards\` DROP COLUMN \`_locale\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_home_discover_cards\` DROP COLUMN \`title\`;`,
  );
  await db.run(sql`DROP INDEX \`site_layout_home_steps_locale_idx\`;`);
  await db.run(
    sql`ALTER TABLE \`site_layout_home_steps\` DROP COLUMN \`_locale\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_home_steps\` DROP COLUMN \`title\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_home_steps\` DROP COLUMN \`text\`;`,
  );
  await db.run(sql`DROP INDEX \`site_layout_footer_extra_links_locale_idx\`;`);
  await db.run(
    sql`ALTER TABLE \`site_layout_footer_extra_links\` DROP COLUMN \`_locale\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`site_layout_footer_extra_links\` DROP COLUMN \`label\`;`,
  );
}
