import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_zalo_numbers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`phone\` text NOT NULL,
  	\`note\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_zalo_numbers_order_idx\` ON \`site_settings_zalo_numbers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_zalo_numbers_parent_id_idx\` ON \`site_settings_zalo_numbers\` (\`_parent_id\`);`)
  // Hai số Zalo bổ sung trước đây ghi thẳng trong mã (lib/contact.ts, tháng
  // 10/2026) — chuyển vào Cài đặt để công ty tự thêm, xóa, sửa trong admin.
  // Chỉ chèn khi đã có bản ghi Cài đặt (cơ sở dữ liệu mới tinh thì chưa có), và
  // chỉ một lần vì migration chạy đúng một lần trên mỗi cơ sở dữ liệu: công ty
  // xóa số trong admin thì lần cài sau không tự thêm lại.
  await db.run(sql`INSERT INTO \`site_settings_zalo_numbers\` (\`_order\`, \`_parent_id\`, \`id\`, \`phone\`)
    SELECT 1, \`id\`, '6717f0a1c0ffee0000000001', '0976894548' FROM \`site_settings\` ORDER BY \`id\` LIMIT 1;`)
  await db.run(sql`INSERT INTO \`site_settings_zalo_numbers\` (\`_order\`, \`_parent_id\`, \`id\`, \`phone\`)
    SELECT 2, \`id\`, '6717f0a1c0ffee0000000002', '0382140336' FROM \`site_settings\` ORDER BY \`id\` LIMIT 1;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_zalo_numbers\`;`)
}
