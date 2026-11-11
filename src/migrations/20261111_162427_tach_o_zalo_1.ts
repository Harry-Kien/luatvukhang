import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`zalo_primary\` text;`)
  // Trước đây Zalo 1 luôn là số nút Gọi: chép sang để ô Zalo 1 hiện sẵn số
  // đang dùng và website không đổi gì cho tới khi công ty sửa.
  await db.run(
    sql`UPDATE \`site_settings\` SET \`zalo_primary\` = \`phone\` WHERE \`zalo_primary\` IS NULL AND trim(coalesce(\`phone\`, '')) <> '';`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`zalo_primary\`;`)
}
