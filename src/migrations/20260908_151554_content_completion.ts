import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_banner_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum__pages_v_version_banner_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_careers_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_careers_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum_careers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__careers_v_version_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum__careers_v_version_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum__careers_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "services_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "_services_v_version_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "industries_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "industries_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "_industries_v_version_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_industries_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "careers_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "careers_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "careers_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "careers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"language" "enum_careers_language" DEFAULT 'vi',
  	"translation_key" varchar,
  	"review_state" "enum_careers_review_state" DEFAULT 'working',
  	"is_sample" boolean DEFAULT false,
  	"summary" varchar,
  	"body" jsonb,
  	"location" varchar,
  	"closing_date" timestamp(3) with time zone,
  	"application_email" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_careers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_careers_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_careers_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_careers_v_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_careers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_language" "enum__careers_v_version_language" DEFAULT 'vi',
  	"version_translation_key" varchar,
  	"version_review_state" "enum__careers_v_version_review_state" DEFAULT 'working',
  	"version_is_sample" boolean DEFAULT false,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_location" varchar,
  	"version_closing_date" timestamp(3) with time zone,
  	"version_application_email" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__careers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "pages" ADD COLUMN "banner_desktop_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "banner_mobile_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "banner_desktop_x" numeric DEFAULT 50;
  ALTER TABLE "pages" ADD COLUMN "banner_desktop_y" numeric DEFAULT 50;
  ALTER TABLE "pages" ADD COLUMN "banner_mobile_x" numeric DEFAULT 50;
  ALTER TABLE "pages" ADD COLUMN "banner_mobile_y" numeric DEFAULT 50;
  ALTER TABLE "pages" ADD COLUMN "banner_fit" "enum_pages_banner_fit" DEFAULT 'cover';
  ALTER TABLE "pages" ADD COLUMN "banner_shade" numeric DEFAULT 15;
  ALTER TABLE "pages" ADD COLUMN "banner_caption" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_banner_desktop_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_banner_mobile_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_banner_desktop_x" numeric DEFAULT 50;
  ALTER TABLE "_pages_v" ADD COLUMN "version_banner_desktop_y" numeric DEFAULT 50;
  ALTER TABLE "_pages_v" ADD COLUMN "version_banner_mobile_x" numeric DEFAULT 50;
  ALTER TABLE "_pages_v" ADD COLUMN "version_banner_mobile_y" numeric DEFAULT 50;
  ALTER TABLE "_pages_v" ADD COLUMN "version_banner_fit" "enum__pages_v_version_banner_fit" DEFAULT 'cover';
  ALTER TABLE "_pages_v" ADD COLUMN "version_banner_shade" numeric DEFAULT 15;
  ALTER TABLE "_pages_v" ADD COLUMN "version_banner_caption" varchar;
  ALTER TABLE "services" ADD COLUMN "audience" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_audience" varchar;
  ALTER TABLE "industries" ADD COLUMN "audience" varchar;
  ALTER TABLE "_industries_v" ADD COLUMN "version_audience" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "careers_id" integer;
  ALTER TABLE "services_process" ADD CONSTRAINT "services_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_faq" ADD CONSTRAINT "services_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_process" ADD CONSTRAINT "_services_v_version_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_faq" ADD CONSTRAINT "_services_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_process" ADD CONSTRAINT "industries_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_faq" ADD CONSTRAINT "industries_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_process" ADD CONSTRAINT "_industries_v_version_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_faq" ADD CONSTRAINT "_industries_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_blocks_text" ADD CONSTRAINT "careers_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_blocks_image" ADD CONSTRAINT "careers_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_blocks_image" ADD CONSTRAINT "careers_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_blocks_callout" ADD CONSTRAINT "careers_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_careers_v_blocks_text" ADD CONSTRAINT "_careers_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_careers_v_blocks_image" ADD CONSTRAINT "_careers_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_careers_v_blocks_image" ADD CONSTRAINT "_careers_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_careers_v_blocks_callout" ADD CONSTRAINT "_careers_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_careers_v" ADD CONSTRAINT "_careers_v_parent_id_careers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."careers"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_process_order_idx" ON "services_process" USING btree ("_order");
  CREATE INDEX "services_process_parent_id_idx" ON "services_process" USING btree ("_parent_id");
  CREATE INDEX "services_faq_order_idx" ON "services_faq" USING btree ("_order");
  CREATE INDEX "services_faq_parent_id_idx" ON "services_faq" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_process_order_idx" ON "_services_v_version_process" USING btree ("_order");
  CREATE INDEX "_services_v_version_process_parent_id_idx" ON "_services_v_version_process" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_faq_order_idx" ON "_services_v_version_faq" USING btree ("_order");
  CREATE INDEX "_services_v_version_faq_parent_id_idx" ON "_services_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "industries_process_order_idx" ON "industries_process" USING btree ("_order");
  CREATE INDEX "industries_process_parent_id_idx" ON "industries_process" USING btree ("_parent_id");
  CREATE INDEX "industries_faq_order_idx" ON "industries_faq" USING btree ("_order");
  CREATE INDEX "industries_faq_parent_id_idx" ON "industries_faq" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_version_process_order_idx" ON "_industries_v_version_process" USING btree ("_order");
  CREATE INDEX "_industries_v_version_process_parent_id_idx" ON "_industries_v_version_process" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_version_faq_order_idx" ON "_industries_v_version_faq" USING btree ("_order");
  CREATE INDEX "_industries_v_version_faq_parent_id_idx" ON "_industries_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "careers_blocks_text_order_idx" ON "careers_blocks_text" USING btree ("_order");
  CREATE INDEX "careers_blocks_text_parent_id_idx" ON "careers_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "careers_blocks_text_path_idx" ON "careers_blocks_text" USING btree ("_path");
  CREATE INDEX "careers_blocks_image_order_idx" ON "careers_blocks_image" USING btree ("_order");
  CREATE INDEX "careers_blocks_image_parent_id_idx" ON "careers_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "careers_blocks_image_path_idx" ON "careers_blocks_image" USING btree ("_path");
  CREATE INDEX "careers_blocks_image_image_idx" ON "careers_blocks_image" USING btree ("image_id");
  CREATE INDEX "careers_blocks_callout_order_idx" ON "careers_blocks_callout" USING btree ("_order");
  CREATE INDEX "careers_blocks_callout_parent_id_idx" ON "careers_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "careers_blocks_callout_path_idx" ON "careers_blocks_callout" USING btree ("_path");
  CREATE INDEX "careers_updated_at_idx" ON "careers" USING btree ("updated_at");
  CREATE INDEX "careers_created_at_idx" ON "careers" USING btree ("created_at");
  CREATE INDEX "careers__status_idx" ON "careers" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_language_9_idx" ON "careers" USING btree ("slug","language");
  CREATE UNIQUE INDEX "translationKey_language_9_idx" ON "careers" USING btree ("translation_key","language");
  CREATE INDEX "_careers_v_blocks_text_order_idx" ON "_careers_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_careers_v_blocks_text_parent_id_idx" ON "_careers_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_careers_v_blocks_text_path_idx" ON "_careers_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_careers_v_blocks_image_order_idx" ON "_careers_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_careers_v_blocks_image_parent_id_idx" ON "_careers_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_careers_v_blocks_image_path_idx" ON "_careers_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_careers_v_blocks_image_image_idx" ON "_careers_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_careers_v_blocks_callout_order_idx" ON "_careers_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_careers_v_blocks_callout_parent_id_idx" ON "_careers_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_careers_v_blocks_callout_path_idx" ON "_careers_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_careers_v_parent_idx" ON "_careers_v" USING btree ("parent_id");
  CREATE INDEX "_careers_v_version_version_updated_at_idx" ON "_careers_v" USING btree ("version_updated_at");
  CREATE INDEX "_careers_v_version_version_created_at_idx" ON "_careers_v" USING btree ("version_created_at");
  CREATE INDEX "_careers_v_version_version__status_idx" ON "_careers_v" USING btree ("version__status");
  CREATE INDEX "_careers_v_created_at_idx" ON "_careers_v" USING btree ("created_at");
  CREATE INDEX "_careers_v_updated_at_idx" ON "_careers_v" USING btree ("updated_at");
  CREATE INDEX "_careers_v_latest_idx" ON "_careers_v" USING btree ("latest");
  CREATE INDEX "_careers_v_autosave_idx" ON "_careers_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_language_9_idx" ON "_careers_v" USING btree ("version_slug","version_language");
  CREATE INDEX "version_translationKey_version_language_9_idx" ON "_careers_v" USING btree ("version_translation_key","version_language");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_banner_desktop_image_id_media_id_fk" FOREIGN KEY ("banner_desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_banner_mobile_image_id_media_id_fk" FOREIGN KEY ("banner_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_banner_desktop_image_id_media_id_fk" FOREIGN KEY ("version_banner_desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_banner_mobile_image_id_media_id_fk" FOREIGN KEY ("version_banner_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_banner_banner_desktop_image_idx" ON "pages" USING btree ("banner_desktop_image_id");
  CREATE INDEX "pages_banner_banner_mobile_image_idx" ON "pages" USING btree ("banner_mobile_image_id");
  CREATE INDEX "_pages_v_version_banner_version_banner_desktop_image_idx" ON "_pages_v" USING btree ("version_banner_desktop_image_id");
  CREATE INDEX "_pages_v_version_banner_version_banner_mobile_image_idx" ON "_pages_v" USING btree ("version_banner_mobile_image_id");
  CREATE INDEX "payload_locked_documents_rels_careers_id_idx" ON "payload_locked_documents_rels" USING btree ("careers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "industries_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "industries_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_industries_v_version_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_industries_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "careers_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "careers_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "careers_blocks_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "careers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_careers_v_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_careers_v_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_careers_v_blocks_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_careers_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_process" CASCADE;
  DROP TABLE "services_faq" CASCADE;
  DROP TABLE "_services_v_version_process" CASCADE;
  DROP TABLE "_services_v_version_faq" CASCADE;
  DROP TABLE "industries_process" CASCADE;
  DROP TABLE "industries_faq" CASCADE;
  DROP TABLE "_industries_v_version_process" CASCADE;
  DROP TABLE "_industries_v_version_faq" CASCADE;
  DROP TABLE "careers_blocks_text" CASCADE;
  DROP TABLE "careers_blocks_image" CASCADE;
  DROP TABLE "careers_blocks_callout" CASCADE;
  DROP TABLE "careers" CASCADE;
  DROP TABLE "_careers_v_blocks_text" CASCADE;
  DROP TABLE "_careers_v_blocks_image" CASCADE;
  DROP TABLE "_careers_v_blocks_callout" CASCADE;
  DROP TABLE "_careers_v" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_banner_desktop_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_banner_mobile_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_banner_desktop_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_banner_mobile_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_careers_fk";
  
  DROP INDEX "pages_banner_banner_desktop_image_idx";
  DROP INDEX "pages_banner_banner_mobile_image_idx";
  DROP INDEX "_pages_v_version_banner_version_banner_desktop_image_idx";
  DROP INDEX "_pages_v_version_banner_version_banner_mobile_image_idx";
  DROP INDEX "payload_locked_documents_rels_careers_id_idx";
  ALTER TABLE "pages" DROP COLUMN "banner_desktop_image_id";
  ALTER TABLE "pages" DROP COLUMN "banner_mobile_image_id";
  ALTER TABLE "pages" DROP COLUMN "banner_desktop_x";
  ALTER TABLE "pages" DROP COLUMN "banner_desktop_y";
  ALTER TABLE "pages" DROP COLUMN "banner_mobile_x";
  ALTER TABLE "pages" DROP COLUMN "banner_mobile_y";
  ALTER TABLE "pages" DROP COLUMN "banner_fit";
  ALTER TABLE "pages" DROP COLUMN "banner_shade";
  ALTER TABLE "pages" DROP COLUMN "banner_caption";
  ALTER TABLE "_pages_v" DROP COLUMN "version_banner_desktop_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_banner_mobile_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_banner_desktop_x";
  ALTER TABLE "_pages_v" DROP COLUMN "version_banner_desktop_y";
  ALTER TABLE "_pages_v" DROP COLUMN "version_banner_mobile_x";
  ALTER TABLE "_pages_v" DROP COLUMN "version_banner_mobile_y";
  ALTER TABLE "_pages_v" DROP COLUMN "version_banner_fit";
  ALTER TABLE "_pages_v" DROP COLUMN "version_banner_shade";
  ALTER TABLE "_pages_v" DROP COLUMN "version_banner_caption";
  ALTER TABLE "services" DROP COLUMN "audience";
  ALTER TABLE "_services_v" DROP COLUMN "version_audience";
  ALTER TABLE "industries" DROP COLUMN "audience";
  ALTER TABLE "_industries_v" DROP COLUMN "version_audience";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "careers_id";
  DROP TYPE "public"."enum_pages_banner_fit";
  DROP TYPE "public"."enum__pages_v_version_banner_fit";
  DROP TYPE "public"."enum_careers_language";
  DROP TYPE "public"."enum_careers_review_state";
  DROP TYPE "public"."enum_careers_status";
  DROP TYPE "public"."enum__careers_v_version_language";
  DROP TYPE "public"."enum__careers_v_version_review_state";
  DROP TYPE "public"."enum__careers_v_version_status";`)
}
