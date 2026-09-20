import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`consultation_requests\` ADD \`assigned_to_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`consultation_requests\` ADD \`follow_up_at\` text;`)
  await db.run(sql`ALTER TABLE \`consultation_requests\` ADD \`outcome\` text;`)
  await db.run(sql`CREATE INDEX \`consultation_requests_assigned_to_idx\` ON \`consultation_requests\` (\`assigned_to_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_consultation_requests\` (
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
  await db.run(sql`INSERT INTO \`__new_consultation_requests\`("id", "reference", "idempotency_key", "name", "email", "phone", "service", "language", "message", "consent_at", "status", "preferred_date", "confirmed_at", "internal_notes", "updated_at", "created_at") SELECT "id", "reference", "idempotency_key", "name", "email", "phone", "service", "language", "message", "consent_at", "status", "preferred_date", "confirmed_at", "internal_notes", "updated_at", "created_at" FROM \`consultation_requests\`;`)
  await db.run(sql`DROP TABLE \`consultation_requests\`;`)
  await db.run(sql`ALTER TABLE \`__new_consultation_requests\` RENAME TO \`consultation_requests\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`consultation_requests_reference_idx\` ON \`consultation_requests\` (\`reference\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`consultation_requests_idempotency_key_idx\` ON \`consultation_requests\` (\`idempotency_key\`);`)
  await db.run(sql`CREATE INDEX \`consultation_requests_updated_at_idx\` ON \`consultation_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`consultation_requests_created_at_idx\` ON \`consultation_requests\` (\`created_at\`);`)
}
