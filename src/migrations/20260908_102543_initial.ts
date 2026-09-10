import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'reviewer', 'publisher', 'reception');
  CREATE TYPE "public"."enum_pages_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_pages_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum__pages_v_version_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_services_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum__services_v_version_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_industries_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_industries_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum_industries_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__industries_v_version_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum__industries_v_version_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum__industries_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_lawyers_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_lawyers_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum_lawyers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__lawyers_v_version_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum__lawyers_v_version_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum__lawyers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_experience_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_experience_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum_experience_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__experience_v_version_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum__experience_v_version_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum__experience_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_articles_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_articles_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum__articles_v_version_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_categories_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_categories_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__categories_v_version_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum__categories_v_version_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum__categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_offices_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_offices_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum_offices_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__offices_v_version_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum__offices_v_version_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum__offices_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_recognitions_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_recognitions_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum_recognitions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__recognitions_v_version_language" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum__recognitions_v_version_review_state" AS ENUM('working', 'pending', 'approved');
  CREATE TYPE "public"."enum__recognitions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_consultation_requests_status" AS ENUM('received', 'contacting', 'confirmed', 'closed');
  CREATE TYPE "public"."enum_notification_outbox_status" AS ENUM('pending', 'sent', 'failed');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "pages_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"language" "enum_pages_language" DEFAULT 'vi',
  	"translation_key" varchar,
  	"review_state" "enum_pages_review_state" DEFAULT 'working',
  	"is_sample" boolean DEFAULT false,
  	"summary" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_text" (
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
  
  CREATE TABLE "_pages_v_blocks_image" (
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
  
  CREATE TABLE "_pages_v_blocks_callout" (
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
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_language" "enum__pages_v_version_language" DEFAULT 'vi',
  	"version_translation_key" varchar,
  	"version_review_state" "enum__pages_v_version_review_state" DEFAULT 'working',
  	"version_is_sample" boolean DEFAULT false,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "services_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_scope" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"language" "enum_services_language" DEFAULT 'vi',
  	"translation_key" varchar,
  	"review_state" "enum_services_review_state" DEFAULT 'working',
  	"is_sample" boolean DEFAULT false,
  	"summary" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"lawyers_id" integer,
  	"experience_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "_services_v_blocks_text" (
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
  
  CREATE TABLE "_services_v_blocks_image" (
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
  
  CREATE TABLE "_services_v_blocks_callout" (
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
  
  CREATE TABLE "_services_v_version_scope" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_language" "enum__services_v_version_language" DEFAULT 'vi',
  	"version_translation_key" varchar,
  	"version_review_state" "enum__services_v_version_review_state" DEFAULT 'working',
  	"version_is_sample" boolean DEFAULT false,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"lawyers_id" integer,
  	"experience_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "industries_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "industries_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "industries_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"language" "enum_industries_language" DEFAULT 'vi',
  	"translation_key" varchar,
  	"review_state" "enum_industries_review_state" DEFAULT 'working',
  	"is_sample" boolean DEFAULT false,
  	"summary" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_industries_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_industries_v_blocks_text" (
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
  
  CREATE TABLE "_industries_v_blocks_image" (
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
  
  CREATE TABLE "_industries_v_blocks_callout" (
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
  
  CREATE TABLE "_industries_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_language" "enum__industries_v_version_language" DEFAULT 'vi',
  	"version_translation_key" varchar,
  	"version_review_state" "enum__industries_v_version_review_state" DEFAULT 'working',
  	"version_is_sample" boolean DEFAULT false,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__industries_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "lawyers_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "lawyers_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "lawyers_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "lawyers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"language" "enum_lawyers_language" DEFAULT 'vi',
  	"translation_key" varchar,
  	"review_state" "enum_lawyers_review_state" DEFAULT 'working',
  	"is_sample" boolean DEFAULT false,
  	"summary" varchar,
  	"body" jsonb,
  	"position" varchar,
  	"portrait_id" integer,
  	"qualifications" varchar,
  	"languages" varchar,
  	"office_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_lawyers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "lawyers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "_lawyers_v_blocks_text" (
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
  
  CREATE TABLE "_lawyers_v_blocks_image" (
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
  
  CREATE TABLE "_lawyers_v_blocks_callout" (
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
  
  CREATE TABLE "_lawyers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_language" "enum__lawyers_v_version_language" DEFAULT 'vi',
  	"version_translation_key" varchar,
  	"version_review_state" "enum__lawyers_v_version_review_state" DEFAULT 'working',
  	"version_is_sample" boolean DEFAULT false,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_position" varchar,
  	"version_portrait_id" integer,
  	"version_qualifications" varchar,
  	"version_languages" varchar,
  	"version_office_id" integer,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__lawyers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_lawyers_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "experience_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "experience_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "experience_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "experience" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"language" "enum_experience_language" DEFAULT 'vi',
  	"translation_key" varchar,
  	"review_state" "enum_experience_review_state" DEFAULT 'working',
  	"is_sample" boolean DEFAULT false,
  	"summary" varchar,
  	"body" jsonb,
  	"disclosure_approval" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_experience_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "experience_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "_experience_v_blocks_text" (
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
  
  CREATE TABLE "_experience_v_blocks_image" (
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
  
  CREATE TABLE "_experience_v_blocks_callout" (
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
  
  CREATE TABLE "_experience_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_language" "enum__experience_v_version_language" DEFAULT 'vi',
  	"version_translation_key" varchar,
  	"version_review_state" "enum__experience_v_version_review_state" DEFAULT 'working',
  	"version_is_sample" boolean DEFAULT false,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_disclosure_approval" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__experience_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_experience_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "articles_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"language" "enum_articles_language" DEFAULT 'vi',
  	"translation_key" varchar,
  	"review_state" "enum_articles_review_state" DEFAULT 'working',
  	"is_sample" boolean DEFAULT false,
  	"summary" varchar,
  	"body" jsonb,
  	"author_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_articles_v_blocks_text" (
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
  
  CREATE TABLE "_articles_v_blocks_image" (
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
  
  CREATE TABLE "_articles_v_blocks_callout" (
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
  
  CREATE TABLE "_articles_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_language" "enum__articles_v_version_language" DEFAULT 'vi',
  	"version_translation_key" varchar,
  	"version_review_state" "enum__articles_v_version_review_state" DEFAULT 'working',
  	"version_is_sample" boolean DEFAULT false,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_author_id" integer,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "categories_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "categories_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "categories_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"language" "enum_categories_language" DEFAULT 'vi',
  	"translation_key" varchar,
  	"review_state" "enum_categories_review_state" DEFAULT 'working',
  	"is_sample" boolean DEFAULT false,
  	"summary" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_categories_v_blocks_text" (
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
  
  CREATE TABLE "_categories_v_blocks_image" (
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
  
  CREATE TABLE "_categories_v_blocks_callout" (
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
  
  CREATE TABLE "_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_language" "enum__categories_v_version_language" DEFAULT 'vi',
  	"version_translation_key" varchar,
  	"version_review_state" "enum__categories_v_version_review_state" DEFAULT 'working',
  	"version_is_sample" boolean DEFAULT false,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "offices_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "offices_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "offices_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "offices" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"language" "enum_offices_language" DEFAULT 'vi',
  	"translation_key" varchar,
  	"review_state" "enum_offices_review_state" DEFAULT 'working',
  	"is_sample" boolean DEFAULT false,
  	"summary" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_offices_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_offices_v_blocks_text" (
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
  
  CREATE TABLE "_offices_v_blocks_image" (
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
  
  CREATE TABLE "_offices_v_blocks_callout" (
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
  
  CREATE TABLE "_offices_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_language" "enum__offices_v_version_language" DEFAULT 'vi',
  	"version_translation_key" varchar,
  	"version_review_state" "enum__offices_v_version_review_state" DEFAULT 'working',
  	"version_is_sample" boolean DEFAULT false,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__offices_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "recognitions_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "recognitions_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "recognitions_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "recognitions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"language" "enum_recognitions_language" DEFAULT 'vi',
  	"translation_key" varchar,
  	"review_state" "enum_recognitions_review_state" DEFAULT 'working',
  	"is_sample" boolean DEFAULT false,
  	"summary" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_recognitions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_recognitions_v_blocks_text" (
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
  
  CREATE TABLE "_recognitions_v_blocks_image" (
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
  
  CREATE TABLE "_recognitions_v_blocks_callout" (
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
  
  CREATE TABLE "_recognitions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_language" "enum__recognitions_v_version_language" DEFAULT 'vi',
  	"version_translation_key" varchar,
  	"version_review_state" "enum__recognitions_v_version_review_state" DEFAULT 'working',
  	"version_is_sample" boolean DEFAULT false,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__recognitions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"credit" varchar NOT NULL,
  	"rights" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "consultation_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"idempotency_key" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"service" varchar,
  	"language" varchar,
  	"message" varchar NOT NULL,
  	"consent_at" timestamp(3) with time zone NOT NULL,
  	"status" "enum_consultation_requests_status" DEFAULT 'received',
  	"preferred_date" timestamp(3) with time zone,
  	"confirmed_at" timestamp(3) with time zone,
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "notification_outbox" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"request_id" integer,
  	"status" "enum_notification_outbox_status" DEFAULT 'pending',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"industries_id" integer,
  	"lawyers_id" integer,
  	"experience_id" integer,
  	"articles_id" integer,
  	"categories_id" integer,
  	"offices_id" integer,
  	"recognitions_id" integer,
  	"media_id" integer,
  	"consultation_requests_id" integer,
  	"notification_outbox_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar,
  	"english_name" varchar,
  	"registration" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"address" varchar,
  	"privacy_approved" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text" ADD CONSTRAINT "pages_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_callout" ADD CONSTRAINT "pages_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text" ADD CONSTRAINT "_pages_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_callout" ADD CONSTRAINT "_pages_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_text" ADD CONSTRAINT "services_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_image" ADD CONSTRAINT "services_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_image" ADD CONSTRAINT "services_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_callout" ADD CONSTRAINT "services_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_scope" ADD CONSTRAINT "services_scope_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_lawyers_fk" FOREIGN KEY ("lawyers_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_experience_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_text" ADD CONSTRAINT "_services_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_image" ADD CONSTRAINT "_services_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_image" ADD CONSTRAINT "_services_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_callout" ADD CONSTRAINT "_services_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_scope" ADD CONSTRAINT "_services_v_version_scope_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_lawyers_fk" FOREIGN KEY ("lawyers_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_experience_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_blocks_text" ADD CONSTRAINT "industries_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_blocks_image" ADD CONSTRAINT "industries_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_blocks_image" ADD CONSTRAINT "industries_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_blocks_callout" ADD CONSTRAINT "industries_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_blocks_text" ADD CONSTRAINT "_industries_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_blocks_image" ADD CONSTRAINT "_industries_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v_blocks_image" ADD CONSTRAINT "_industries_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_blocks_callout" ADD CONSTRAINT "_industries_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_parent_id_industries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."industries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lawyers_blocks_text" ADD CONSTRAINT "lawyers_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_blocks_image" ADD CONSTRAINT "lawyers_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lawyers_blocks_image" ADD CONSTRAINT "lawyers_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_blocks_callout" ADD CONSTRAINT "lawyers_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers" ADD CONSTRAINT "lawyers_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lawyers" ADD CONSTRAINT "lawyers_office_id_offices_id_fk" FOREIGN KEY ("office_id") REFERENCES "public"."offices"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lawyers_rels" ADD CONSTRAINT "lawyers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_rels" ADD CONSTRAINT "lawyers_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v_blocks_text" ADD CONSTRAINT "_lawyers_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lawyers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v_blocks_image" ADD CONSTRAINT "_lawyers_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lawyers_v_blocks_image" ADD CONSTRAINT "_lawyers_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lawyers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v_blocks_callout" ADD CONSTRAINT "_lawyers_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lawyers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v" ADD CONSTRAINT "_lawyers_v_parent_id_lawyers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lawyers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lawyers_v" ADD CONSTRAINT "_lawyers_v_version_portrait_id_media_id_fk" FOREIGN KEY ("version_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lawyers_v" ADD CONSTRAINT "_lawyers_v_version_office_id_offices_id_fk" FOREIGN KEY ("version_office_id") REFERENCES "public"."offices"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lawyers_v_rels" ADD CONSTRAINT "_lawyers_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_lawyers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v_rels" ADD CONSTRAINT "_lawyers_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_blocks_text" ADD CONSTRAINT "experience_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_blocks_image" ADD CONSTRAINT "experience_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experience_blocks_image" ADD CONSTRAINT "experience_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_blocks_callout" ADD CONSTRAINT "experience_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_rels" ADD CONSTRAINT "experience_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_rels" ADD CONSTRAINT "experience_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experience_v_blocks_text" ADD CONSTRAINT "_experience_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experience_v_blocks_image" ADD CONSTRAINT "_experience_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experience_v_blocks_image" ADD CONSTRAINT "_experience_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experience_v_blocks_callout" ADD CONSTRAINT "_experience_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experience_v" ADD CONSTRAINT "_experience_v_parent_id_experience_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experience"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experience_v_rels" ADD CONSTRAINT "_experience_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_experience_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experience_v_rels" ADD CONSTRAINT "_experience_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_text" ADD CONSTRAINT "articles_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_image" ADD CONSTRAINT "articles_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_image" ADD CONSTRAINT "articles_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_callout" ADD CONSTRAINT "articles_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_sources" ADD CONSTRAINT "articles_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_lawyers_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."lawyers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text" ADD CONSTRAINT "_articles_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_image" ADD CONSTRAINT "_articles_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_image" ADD CONSTRAINT "_articles_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_callout" ADD CONSTRAINT "_articles_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_version_sources" ADD CONSTRAINT "_articles_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_author_id_lawyers_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."lawyers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_text" ADD CONSTRAINT "categories_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_image" ADD CONSTRAINT "categories_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_blocks_image" ADD CONSTRAINT "categories_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_callout" ADD CONSTRAINT "categories_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_text" ADD CONSTRAINT "_categories_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_image" ADD CONSTRAINT "_categories_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_image" ADD CONSTRAINT "_categories_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_callout" ADD CONSTRAINT "_categories_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offices_blocks_text" ADD CONSTRAINT "offices_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offices_blocks_image" ADD CONSTRAINT "offices_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offices_blocks_image" ADD CONSTRAINT "offices_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offices_blocks_callout" ADD CONSTRAINT "offices_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offices_v_blocks_text" ADD CONSTRAINT "_offices_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offices_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offices_v_blocks_image" ADD CONSTRAINT "_offices_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offices_v_blocks_image" ADD CONSTRAINT "_offices_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offices_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offices_v_blocks_callout" ADD CONSTRAINT "_offices_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offices_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offices_v" ADD CONSTRAINT "_offices_v_parent_id_offices_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."offices"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recognitions_blocks_text" ADD CONSTRAINT "recognitions_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recognitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recognitions_blocks_image" ADD CONSTRAINT "recognitions_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recognitions_blocks_image" ADD CONSTRAINT "recognitions_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recognitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recognitions_blocks_callout" ADD CONSTRAINT "recognitions_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recognitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recognitions_v_blocks_text" ADD CONSTRAINT "_recognitions_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recognitions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recognitions_v_blocks_image" ADD CONSTRAINT "_recognitions_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_recognitions_v_blocks_image" ADD CONSTRAINT "_recognitions_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recognitions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recognitions_v_blocks_callout" ADD CONSTRAINT "_recognitions_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recognitions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recognitions_v" ADD CONSTRAINT "_recognitions_v_parent_id_recognitions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recognitions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notification_outbox" ADD CONSTRAINT "notification_outbox_request_id_consultation_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."consultation_requests"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lawyers_fk" FOREIGN KEY ("lawyers_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experience_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offices_fk" FOREIGN KEY ("offices_id") REFERENCES "public"."offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recognitions_fk" FOREIGN KEY ("recognitions_id") REFERENCES "public"."recognitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consultation_requests_fk" FOREIGN KEY ("consultation_requests_id") REFERENCES "public"."consultation_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notification_outbox_fk" FOREIGN KEY ("notification_outbox_id") REFERENCES "public"."notification_outbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "pages_blocks_text_order_idx" ON "pages_blocks_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_parent_id_idx" ON "pages_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_path_idx" ON "pages_blocks_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_order_idx" ON "pages_blocks_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_parent_id_idx" ON "pages_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_path_idx" ON "pages_blocks_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_image_idx" ON "pages_blocks_image" USING btree ("image_id");
  CREATE INDEX "pages_blocks_callout_order_idx" ON "pages_blocks_callout" USING btree ("_order");
  CREATE INDEX "pages_blocks_callout_parent_id_idx" ON "pages_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_callout_path_idx" ON "pages_blocks_callout" USING btree ("_path");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_language_idx" ON "pages" USING btree ("slug","language");
  CREATE UNIQUE INDEX "translationKey_language_idx" ON "pages" USING btree ("translation_key","language");
  CREATE INDEX "_pages_v_blocks_text_order_idx" ON "_pages_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_parent_id_idx" ON "_pages_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_path_idx" ON "_pages_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_order_idx" ON "_pages_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_parent_id_idx" ON "_pages_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_path_idx" ON "_pages_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_image_idx" ON "_pages_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_callout_order_idx" ON "_pages_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_callout_parent_id_idx" ON "_pages_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_callout_path_idx" ON "_pages_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_language_idx" ON "_pages_v" USING btree ("version_slug","version_language");
  CREATE INDEX "version_translationKey_version_language_idx" ON "_pages_v" USING btree ("version_translation_key","version_language");
  CREATE INDEX "services_blocks_text_order_idx" ON "services_blocks_text" USING btree ("_order");
  CREATE INDEX "services_blocks_text_parent_id_idx" ON "services_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_text_path_idx" ON "services_blocks_text" USING btree ("_path");
  CREATE INDEX "services_blocks_image_order_idx" ON "services_blocks_image" USING btree ("_order");
  CREATE INDEX "services_blocks_image_parent_id_idx" ON "services_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_image_path_idx" ON "services_blocks_image" USING btree ("_path");
  CREATE INDEX "services_blocks_image_image_idx" ON "services_blocks_image" USING btree ("image_id");
  CREATE INDEX "services_blocks_callout_order_idx" ON "services_blocks_callout" USING btree ("_order");
  CREATE INDEX "services_blocks_callout_parent_id_idx" ON "services_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_callout_path_idx" ON "services_blocks_callout" USING btree ("_path");
  CREATE INDEX "services_scope_order_idx" ON "services_scope" USING btree ("_order");
  CREATE INDEX "services_scope_parent_id_idx" ON "services_scope" USING btree ("_parent_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_language_1_idx" ON "services" USING btree ("slug","language");
  CREATE UNIQUE INDEX "translationKey_language_1_idx" ON "services" USING btree ("translation_key","language");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_lawyers_id_idx" ON "services_rels" USING btree ("lawyers_id");
  CREATE INDEX "services_rels_experience_id_idx" ON "services_rels" USING btree ("experience_id");
  CREATE INDEX "services_rels_articles_id_idx" ON "services_rels" USING btree ("articles_id");
  CREATE INDEX "_services_v_blocks_text_order_idx" ON "_services_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_text_parent_id_idx" ON "_services_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_text_path_idx" ON "_services_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_image_order_idx" ON "_services_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_image_parent_id_idx" ON "_services_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_image_path_idx" ON "_services_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_image_image_idx" ON "_services_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_callout_order_idx" ON "_services_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_callout_parent_id_idx" ON "_services_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_callout_path_idx" ON "_services_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_services_v_version_scope_order_idx" ON "_services_v_version_scope" USING btree ("_order");
  CREATE INDEX "_services_v_version_scope_parent_id_idx" ON "_services_v_version_scope" USING btree ("_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_language_1_idx" ON "_services_v" USING btree ("version_slug","version_language");
  CREATE INDEX "version_translationKey_version_language_1_idx" ON "_services_v" USING btree ("version_translation_key","version_language");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_lawyers_id_idx" ON "_services_v_rels" USING btree ("lawyers_id");
  CREATE INDEX "_services_v_rels_experience_id_idx" ON "_services_v_rels" USING btree ("experience_id");
  CREATE INDEX "_services_v_rels_articles_id_idx" ON "_services_v_rels" USING btree ("articles_id");
  CREATE INDEX "industries_blocks_text_order_idx" ON "industries_blocks_text" USING btree ("_order");
  CREATE INDEX "industries_blocks_text_parent_id_idx" ON "industries_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "industries_blocks_text_path_idx" ON "industries_blocks_text" USING btree ("_path");
  CREATE INDEX "industries_blocks_image_order_idx" ON "industries_blocks_image" USING btree ("_order");
  CREATE INDEX "industries_blocks_image_parent_id_idx" ON "industries_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "industries_blocks_image_path_idx" ON "industries_blocks_image" USING btree ("_path");
  CREATE INDEX "industries_blocks_image_image_idx" ON "industries_blocks_image" USING btree ("image_id");
  CREATE INDEX "industries_blocks_callout_order_idx" ON "industries_blocks_callout" USING btree ("_order");
  CREATE INDEX "industries_blocks_callout_parent_id_idx" ON "industries_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "industries_blocks_callout_path_idx" ON "industries_blocks_callout" USING btree ("_path");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "industries__status_idx" ON "industries" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_language_2_idx" ON "industries" USING btree ("slug","language");
  CREATE UNIQUE INDEX "translationKey_language_2_idx" ON "industries" USING btree ("translation_key","language");
  CREATE INDEX "_industries_v_blocks_text_order_idx" ON "_industries_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_industries_v_blocks_text_parent_id_idx" ON "_industries_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_blocks_text_path_idx" ON "_industries_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_industries_v_blocks_image_order_idx" ON "_industries_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_industries_v_blocks_image_parent_id_idx" ON "_industries_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_blocks_image_path_idx" ON "_industries_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_industries_v_blocks_image_image_idx" ON "_industries_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_industries_v_blocks_callout_order_idx" ON "_industries_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_industries_v_blocks_callout_parent_id_idx" ON "_industries_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_blocks_callout_path_idx" ON "_industries_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_industries_v_parent_idx" ON "_industries_v" USING btree ("parent_id");
  CREATE INDEX "_industries_v_version_version_updated_at_idx" ON "_industries_v" USING btree ("version_updated_at");
  CREATE INDEX "_industries_v_version_version_created_at_idx" ON "_industries_v" USING btree ("version_created_at");
  CREATE INDEX "_industries_v_version_version__status_idx" ON "_industries_v" USING btree ("version__status");
  CREATE INDEX "_industries_v_created_at_idx" ON "_industries_v" USING btree ("created_at");
  CREATE INDEX "_industries_v_updated_at_idx" ON "_industries_v" USING btree ("updated_at");
  CREATE INDEX "_industries_v_latest_idx" ON "_industries_v" USING btree ("latest");
  CREATE INDEX "_industries_v_autosave_idx" ON "_industries_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_language_2_idx" ON "_industries_v" USING btree ("version_slug","version_language");
  CREATE INDEX "version_translationKey_version_language_2_idx" ON "_industries_v" USING btree ("version_translation_key","version_language");
  CREATE INDEX "lawyers_blocks_text_order_idx" ON "lawyers_blocks_text" USING btree ("_order");
  CREATE INDEX "lawyers_blocks_text_parent_id_idx" ON "lawyers_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "lawyers_blocks_text_path_idx" ON "lawyers_blocks_text" USING btree ("_path");
  CREATE INDEX "lawyers_blocks_image_order_idx" ON "lawyers_blocks_image" USING btree ("_order");
  CREATE INDEX "lawyers_blocks_image_parent_id_idx" ON "lawyers_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "lawyers_blocks_image_path_idx" ON "lawyers_blocks_image" USING btree ("_path");
  CREATE INDEX "lawyers_blocks_image_image_idx" ON "lawyers_blocks_image" USING btree ("image_id");
  CREATE INDEX "lawyers_blocks_callout_order_idx" ON "lawyers_blocks_callout" USING btree ("_order");
  CREATE INDEX "lawyers_blocks_callout_parent_id_idx" ON "lawyers_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "lawyers_blocks_callout_path_idx" ON "lawyers_blocks_callout" USING btree ("_path");
  CREATE INDEX "lawyers_portrait_idx" ON "lawyers" USING btree ("portrait_id");
  CREATE INDEX "lawyers_office_idx" ON "lawyers" USING btree ("office_id");
  CREATE INDEX "lawyers_updated_at_idx" ON "lawyers" USING btree ("updated_at");
  CREATE INDEX "lawyers_created_at_idx" ON "lawyers" USING btree ("created_at");
  CREATE INDEX "lawyers__status_idx" ON "lawyers" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_language_3_idx" ON "lawyers" USING btree ("slug","language");
  CREATE UNIQUE INDEX "translationKey_language_3_idx" ON "lawyers" USING btree ("translation_key","language");
  CREATE INDEX "lawyers_rels_order_idx" ON "lawyers_rels" USING btree ("order");
  CREATE INDEX "lawyers_rels_parent_idx" ON "lawyers_rels" USING btree ("parent_id");
  CREATE INDEX "lawyers_rels_path_idx" ON "lawyers_rels" USING btree ("path");
  CREATE INDEX "lawyers_rels_services_id_idx" ON "lawyers_rels" USING btree ("services_id");
  CREATE INDEX "_lawyers_v_blocks_text_order_idx" ON "_lawyers_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_lawyers_v_blocks_text_parent_id_idx" ON "_lawyers_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_lawyers_v_blocks_text_path_idx" ON "_lawyers_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_lawyers_v_blocks_image_order_idx" ON "_lawyers_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_lawyers_v_blocks_image_parent_id_idx" ON "_lawyers_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_lawyers_v_blocks_image_path_idx" ON "_lawyers_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_lawyers_v_blocks_image_image_idx" ON "_lawyers_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_lawyers_v_blocks_callout_order_idx" ON "_lawyers_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_lawyers_v_blocks_callout_parent_id_idx" ON "_lawyers_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_lawyers_v_blocks_callout_path_idx" ON "_lawyers_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_lawyers_v_parent_idx" ON "_lawyers_v" USING btree ("parent_id");
  CREATE INDEX "_lawyers_v_version_version_portrait_idx" ON "_lawyers_v" USING btree ("version_portrait_id");
  CREATE INDEX "_lawyers_v_version_version_office_idx" ON "_lawyers_v" USING btree ("version_office_id");
  CREATE INDEX "_lawyers_v_version_version_updated_at_idx" ON "_lawyers_v" USING btree ("version_updated_at");
  CREATE INDEX "_lawyers_v_version_version_created_at_idx" ON "_lawyers_v" USING btree ("version_created_at");
  CREATE INDEX "_lawyers_v_version_version__status_idx" ON "_lawyers_v" USING btree ("version__status");
  CREATE INDEX "_lawyers_v_created_at_idx" ON "_lawyers_v" USING btree ("created_at");
  CREATE INDEX "_lawyers_v_updated_at_idx" ON "_lawyers_v" USING btree ("updated_at");
  CREATE INDEX "_lawyers_v_latest_idx" ON "_lawyers_v" USING btree ("latest");
  CREATE INDEX "_lawyers_v_autosave_idx" ON "_lawyers_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_language_3_idx" ON "_lawyers_v" USING btree ("version_slug","version_language");
  CREATE INDEX "version_translationKey_version_language_3_idx" ON "_lawyers_v" USING btree ("version_translation_key","version_language");
  CREATE INDEX "_lawyers_v_rels_order_idx" ON "_lawyers_v_rels" USING btree ("order");
  CREATE INDEX "_lawyers_v_rels_parent_idx" ON "_lawyers_v_rels" USING btree ("parent_id");
  CREATE INDEX "_lawyers_v_rels_path_idx" ON "_lawyers_v_rels" USING btree ("path");
  CREATE INDEX "_lawyers_v_rels_services_id_idx" ON "_lawyers_v_rels" USING btree ("services_id");
  CREATE INDEX "experience_blocks_text_order_idx" ON "experience_blocks_text" USING btree ("_order");
  CREATE INDEX "experience_blocks_text_parent_id_idx" ON "experience_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "experience_blocks_text_path_idx" ON "experience_blocks_text" USING btree ("_path");
  CREATE INDEX "experience_blocks_image_order_idx" ON "experience_blocks_image" USING btree ("_order");
  CREATE INDEX "experience_blocks_image_parent_id_idx" ON "experience_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "experience_blocks_image_path_idx" ON "experience_blocks_image" USING btree ("_path");
  CREATE INDEX "experience_blocks_image_image_idx" ON "experience_blocks_image" USING btree ("image_id");
  CREATE INDEX "experience_blocks_callout_order_idx" ON "experience_blocks_callout" USING btree ("_order");
  CREATE INDEX "experience_blocks_callout_parent_id_idx" ON "experience_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "experience_blocks_callout_path_idx" ON "experience_blocks_callout" USING btree ("_path");
  CREATE INDEX "experience_updated_at_idx" ON "experience" USING btree ("updated_at");
  CREATE INDEX "experience_created_at_idx" ON "experience" USING btree ("created_at");
  CREATE INDEX "experience__status_idx" ON "experience" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_language_4_idx" ON "experience" USING btree ("slug","language");
  CREATE UNIQUE INDEX "translationKey_language_4_idx" ON "experience" USING btree ("translation_key","language");
  CREATE INDEX "experience_rels_order_idx" ON "experience_rels" USING btree ("order");
  CREATE INDEX "experience_rels_parent_idx" ON "experience_rels" USING btree ("parent_id");
  CREATE INDEX "experience_rels_path_idx" ON "experience_rels" USING btree ("path");
  CREATE INDEX "experience_rels_services_id_idx" ON "experience_rels" USING btree ("services_id");
  CREATE INDEX "_experience_v_blocks_text_order_idx" ON "_experience_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_experience_v_blocks_text_parent_id_idx" ON "_experience_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_experience_v_blocks_text_path_idx" ON "_experience_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_experience_v_blocks_image_order_idx" ON "_experience_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_experience_v_blocks_image_parent_id_idx" ON "_experience_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_experience_v_blocks_image_path_idx" ON "_experience_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_experience_v_blocks_image_image_idx" ON "_experience_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_experience_v_blocks_callout_order_idx" ON "_experience_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_experience_v_blocks_callout_parent_id_idx" ON "_experience_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_experience_v_blocks_callout_path_idx" ON "_experience_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_experience_v_parent_idx" ON "_experience_v" USING btree ("parent_id");
  CREATE INDEX "_experience_v_version_version_updated_at_idx" ON "_experience_v" USING btree ("version_updated_at");
  CREATE INDEX "_experience_v_version_version_created_at_idx" ON "_experience_v" USING btree ("version_created_at");
  CREATE INDEX "_experience_v_version_version__status_idx" ON "_experience_v" USING btree ("version__status");
  CREATE INDEX "_experience_v_created_at_idx" ON "_experience_v" USING btree ("created_at");
  CREATE INDEX "_experience_v_updated_at_idx" ON "_experience_v" USING btree ("updated_at");
  CREATE INDEX "_experience_v_latest_idx" ON "_experience_v" USING btree ("latest");
  CREATE INDEX "_experience_v_autosave_idx" ON "_experience_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_language_4_idx" ON "_experience_v" USING btree ("version_slug","version_language");
  CREATE INDEX "version_translationKey_version_language_4_idx" ON "_experience_v" USING btree ("version_translation_key","version_language");
  CREATE INDEX "_experience_v_rels_order_idx" ON "_experience_v_rels" USING btree ("order");
  CREATE INDEX "_experience_v_rels_parent_idx" ON "_experience_v_rels" USING btree ("parent_id");
  CREATE INDEX "_experience_v_rels_path_idx" ON "_experience_v_rels" USING btree ("path");
  CREATE INDEX "_experience_v_rels_services_id_idx" ON "_experience_v_rels" USING btree ("services_id");
  CREATE INDEX "articles_blocks_text_order_idx" ON "articles_blocks_text" USING btree ("_order");
  CREATE INDEX "articles_blocks_text_parent_id_idx" ON "articles_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_text_path_idx" ON "articles_blocks_text" USING btree ("_path");
  CREATE INDEX "articles_blocks_image_order_idx" ON "articles_blocks_image" USING btree ("_order");
  CREATE INDEX "articles_blocks_image_parent_id_idx" ON "articles_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_image_path_idx" ON "articles_blocks_image" USING btree ("_path");
  CREATE INDEX "articles_blocks_image_image_idx" ON "articles_blocks_image" USING btree ("image_id");
  CREATE INDEX "articles_blocks_callout_order_idx" ON "articles_blocks_callout" USING btree ("_order");
  CREATE INDEX "articles_blocks_callout_parent_id_idx" ON "articles_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_callout_path_idx" ON "articles_blocks_callout" USING btree ("_path");
  CREATE INDEX "articles_sources_order_idx" ON "articles_sources" USING btree ("_order");
  CREATE INDEX "articles_sources_parent_id_idx" ON "articles_sources" USING btree ("_parent_id");
  CREATE INDEX "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_language_5_idx" ON "articles" USING btree ("slug","language");
  CREATE UNIQUE INDEX "translationKey_language_5_idx" ON "articles" USING btree ("translation_key","language");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_categories_id_idx" ON "articles_rels" USING btree ("categories_id");
  CREATE INDEX "_articles_v_blocks_text_order_idx" ON "_articles_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_text_parent_id_idx" ON "_articles_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_text_path_idx" ON "_articles_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_image_order_idx" ON "_articles_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_image_parent_id_idx" ON "_articles_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_image_path_idx" ON "_articles_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_image_image_idx" ON "_articles_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_articles_v_blocks_callout_order_idx" ON "_articles_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_callout_parent_id_idx" ON "_articles_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_callout_path_idx" ON "_articles_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_articles_v_version_sources_order_idx" ON "_articles_v_version_sources" USING btree ("_order");
  CREATE INDEX "_articles_v_version_sources_parent_id_idx" ON "_articles_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_author_idx" ON "_articles_v" USING btree ("version_author_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_autosave_idx" ON "_articles_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_language_5_idx" ON "_articles_v" USING btree ("version_slug","version_language");
  CREATE INDEX "version_translationKey_version_language_5_idx" ON "_articles_v" USING btree ("version_translation_key","version_language");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_categories_id_idx" ON "_articles_v_rels" USING btree ("categories_id");
  CREATE INDEX "categories_blocks_text_order_idx" ON "categories_blocks_text" USING btree ("_order");
  CREATE INDEX "categories_blocks_text_parent_id_idx" ON "categories_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_text_path_idx" ON "categories_blocks_text" USING btree ("_path");
  CREATE INDEX "categories_blocks_image_order_idx" ON "categories_blocks_image" USING btree ("_order");
  CREATE INDEX "categories_blocks_image_parent_id_idx" ON "categories_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_image_path_idx" ON "categories_blocks_image" USING btree ("_path");
  CREATE INDEX "categories_blocks_image_image_idx" ON "categories_blocks_image" USING btree ("image_id");
  CREATE INDEX "categories_blocks_callout_order_idx" ON "categories_blocks_callout" USING btree ("_order");
  CREATE INDEX "categories_blocks_callout_parent_id_idx" ON "categories_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_callout_path_idx" ON "categories_blocks_callout" USING btree ("_path");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories__status_idx" ON "categories" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_language_6_idx" ON "categories" USING btree ("slug","language");
  CREATE UNIQUE INDEX "translationKey_language_6_idx" ON "categories" USING btree ("translation_key","language");
  CREATE INDEX "_categories_v_blocks_text_order_idx" ON "_categories_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_text_parent_id_idx" ON "_categories_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_text_path_idx" ON "_categories_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_categories_v_blocks_image_order_idx" ON "_categories_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_image_parent_id_idx" ON "_categories_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_image_path_idx" ON "_categories_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_categories_v_blocks_image_image_idx" ON "_categories_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_categories_v_blocks_callout_order_idx" ON "_categories_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_callout_parent_id_idx" ON "_categories_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_callout_path_idx" ON "_categories_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_categories_v_parent_idx" ON "_categories_v" USING btree ("parent_id");
  CREATE INDEX "_categories_v_version_version_updated_at_idx" ON "_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_categories_v_version_version_created_at_idx" ON "_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_categories_v_version_version__status_idx" ON "_categories_v" USING btree ("version__status");
  CREATE INDEX "_categories_v_created_at_idx" ON "_categories_v" USING btree ("created_at");
  CREATE INDEX "_categories_v_updated_at_idx" ON "_categories_v" USING btree ("updated_at");
  CREATE INDEX "_categories_v_latest_idx" ON "_categories_v" USING btree ("latest");
  CREATE INDEX "_categories_v_autosave_idx" ON "_categories_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_language_6_idx" ON "_categories_v" USING btree ("version_slug","version_language");
  CREATE INDEX "version_translationKey_version_language_6_idx" ON "_categories_v" USING btree ("version_translation_key","version_language");
  CREATE INDEX "offices_blocks_text_order_idx" ON "offices_blocks_text" USING btree ("_order");
  CREATE INDEX "offices_blocks_text_parent_id_idx" ON "offices_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "offices_blocks_text_path_idx" ON "offices_blocks_text" USING btree ("_path");
  CREATE INDEX "offices_blocks_image_order_idx" ON "offices_blocks_image" USING btree ("_order");
  CREATE INDEX "offices_blocks_image_parent_id_idx" ON "offices_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "offices_blocks_image_path_idx" ON "offices_blocks_image" USING btree ("_path");
  CREATE INDEX "offices_blocks_image_image_idx" ON "offices_blocks_image" USING btree ("image_id");
  CREATE INDEX "offices_blocks_callout_order_idx" ON "offices_blocks_callout" USING btree ("_order");
  CREATE INDEX "offices_blocks_callout_parent_id_idx" ON "offices_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "offices_blocks_callout_path_idx" ON "offices_blocks_callout" USING btree ("_path");
  CREATE INDEX "offices_updated_at_idx" ON "offices" USING btree ("updated_at");
  CREATE INDEX "offices_created_at_idx" ON "offices" USING btree ("created_at");
  CREATE INDEX "offices__status_idx" ON "offices" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_language_7_idx" ON "offices" USING btree ("slug","language");
  CREATE UNIQUE INDEX "translationKey_language_7_idx" ON "offices" USING btree ("translation_key","language");
  CREATE INDEX "_offices_v_blocks_text_order_idx" ON "_offices_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_offices_v_blocks_text_parent_id_idx" ON "_offices_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_offices_v_blocks_text_path_idx" ON "_offices_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_offices_v_blocks_image_order_idx" ON "_offices_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_offices_v_blocks_image_parent_id_idx" ON "_offices_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_offices_v_blocks_image_path_idx" ON "_offices_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_offices_v_blocks_image_image_idx" ON "_offices_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_offices_v_blocks_callout_order_idx" ON "_offices_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_offices_v_blocks_callout_parent_id_idx" ON "_offices_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_offices_v_blocks_callout_path_idx" ON "_offices_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_offices_v_parent_idx" ON "_offices_v" USING btree ("parent_id");
  CREATE INDEX "_offices_v_version_version_updated_at_idx" ON "_offices_v" USING btree ("version_updated_at");
  CREATE INDEX "_offices_v_version_version_created_at_idx" ON "_offices_v" USING btree ("version_created_at");
  CREATE INDEX "_offices_v_version_version__status_idx" ON "_offices_v" USING btree ("version__status");
  CREATE INDEX "_offices_v_created_at_idx" ON "_offices_v" USING btree ("created_at");
  CREATE INDEX "_offices_v_updated_at_idx" ON "_offices_v" USING btree ("updated_at");
  CREATE INDEX "_offices_v_latest_idx" ON "_offices_v" USING btree ("latest");
  CREATE INDEX "_offices_v_autosave_idx" ON "_offices_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_language_7_idx" ON "_offices_v" USING btree ("version_slug","version_language");
  CREATE INDEX "version_translationKey_version_language_7_idx" ON "_offices_v" USING btree ("version_translation_key","version_language");
  CREATE INDEX "recognitions_blocks_text_order_idx" ON "recognitions_blocks_text" USING btree ("_order");
  CREATE INDEX "recognitions_blocks_text_parent_id_idx" ON "recognitions_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "recognitions_blocks_text_path_idx" ON "recognitions_blocks_text" USING btree ("_path");
  CREATE INDEX "recognitions_blocks_image_order_idx" ON "recognitions_blocks_image" USING btree ("_order");
  CREATE INDEX "recognitions_blocks_image_parent_id_idx" ON "recognitions_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "recognitions_blocks_image_path_idx" ON "recognitions_blocks_image" USING btree ("_path");
  CREATE INDEX "recognitions_blocks_image_image_idx" ON "recognitions_blocks_image" USING btree ("image_id");
  CREATE INDEX "recognitions_blocks_callout_order_idx" ON "recognitions_blocks_callout" USING btree ("_order");
  CREATE INDEX "recognitions_blocks_callout_parent_id_idx" ON "recognitions_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "recognitions_blocks_callout_path_idx" ON "recognitions_blocks_callout" USING btree ("_path");
  CREATE INDEX "recognitions_updated_at_idx" ON "recognitions" USING btree ("updated_at");
  CREATE INDEX "recognitions_created_at_idx" ON "recognitions" USING btree ("created_at");
  CREATE INDEX "recognitions__status_idx" ON "recognitions" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_language_8_idx" ON "recognitions" USING btree ("slug","language");
  CREATE UNIQUE INDEX "translationKey_language_8_idx" ON "recognitions" USING btree ("translation_key","language");
  CREATE INDEX "_recognitions_v_blocks_text_order_idx" ON "_recognitions_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_recognitions_v_blocks_text_parent_id_idx" ON "_recognitions_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_recognitions_v_blocks_text_path_idx" ON "_recognitions_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_recognitions_v_blocks_image_order_idx" ON "_recognitions_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_recognitions_v_blocks_image_parent_id_idx" ON "_recognitions_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_recognitions_v_blocks_image_path_idx" ON "_recognitions_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_recognitions_v_blocks_image_image_idx" ON "_recognitions_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_recognitions_v_blocks_callout_order_idx" ON "_recognitions_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_recognitions_v_blocks_callout_parent_id_idx" ON "_recognitions_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_recognitions_v_blocks_callout_path_idx" ON "_recognitions_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_recognitions_v_parent_idx" ON "_recognitions_v" USING btree ("parent_id");
  CREATE INDEX "_recognitions_v_version_version_updated_at_idx" ON "_recognitions_v" USING btree ("version_updated_at");
  CREATE INDEX "_recognitions_v_version_version_created_at_idx" ON "_recognitions_v" USING btree ("version_created_at");
  CREATE INDEX "_recognitions_v_version_version__status_idx" ON "_recognitions_v" USING btree ("version__status");
  CREATE INDEX "_recognitions_v_created_at_idx" ON "_recognitions_v" USING btree ("created_at");
  CREATE INDEX "_recognitions_v_updated_at_idx" ON "_recognitions_v" USING btree ("updated_at");
  CREATE INDEX "_recognitions_v_latest_idx" ON "_recognitions_v" USING btree ("latest");
  CREATE INDEX "_recognitions_v_autosave_idx" ON "_recognitions_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_language_8_idx" ON "_recognitions_v" USING btree ("version_slug","version_language");
  CREATE INDEX "version_translationKey_version_language_8_idx" ON "_recognitions_v" USING btree ("version_translation_key","version_language");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "consultation_requests_reference_idx" ON "consultation_requests" USING btree ("reference");
  CREATE UNIQUE INDEX "consultation_requests_idempotency_key_idx" ON "consultation_requests" USING btree ("idempotency_key");
  CREATE INDEX "consultation_requests_updated_at_idx" ON "consultation_requests" USING btree ("updated_at");
  CREATE INDEX "consultation_requests_created_at_idx" ON "consultation_requests" USING btree ("created_at");
  CREATE INDEX "notification_outbox_request_idx" ON "notification_outbox" USING btree ("request_id");
  CREATE INDEX "notification_outbox_updated_at_idx" ON "notification_outbox" USING btree ("updated_at");
  CREATE INDEX "notification_outbox_created_at_idx" ON "notification_outbox" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX "payload_locked_documents_rels_lawyers_id_idx" ON "payload_locked_documents_rels" USING btree ("lawyers_id");
  CREATE INDEX "payload_locked_documents_rels_experience_id_idx" ON "payload_locked_documents_rels" USING btree ("experience_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_offices_id_idx" ON "payload_locked_documents_rels" USING btree ("offices_id");
  CREATE INDEX "payload_locked_documents_rels_recognitions_id_idx" ON "payload_locked_documents_rels" USING btree ("recognitions_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_consultation_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("consultation_requests_id");
  CREATE INDEX "payload_locked_documents_rels_notification_outbox_id_idx" ON "payload_locked_documents_rels" USING btree ("notification_outbox_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "pages_blocks_text" CASCADE;
  DROP TABLE "pages_blocks_image" CASCADE;
  DROP TABLE "pages_blocks_callout" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_text" CASCADE;
  DROP TABLE "_pages_v_blocks_image" CASCADE;
  DROP TABLE "_pages_v_blocks_callout" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "services_blocks_text" CASCADE;
  DROP TABLE "services_blocks_image" CASCADE;
  DROP TABLE "services_blocks_callout" CASCADE;
  DROP TABLE "services_scope" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_blocks_text" CASCADE;
  DROP TABLE "_services_v_blocks_image" CASCADE;
  DROP TABLE "_services_v_blocks_callout" CASCADE;
  DROP TABLE "_services_v_version_scope" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "industries_blocks_text" CASCADE;
  DROP TABLE "industries_blocks_image" CASCADE;
  DROP TABLE "industries_blocks_callout" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "_industries_v_blocks_text" CASCADE;
  DROP TABLE "_industries_v_blocks_image" CASCADE;
  DROP TABLE "_industries_v_blocks_callout" CASCADE;
  DROP TABLE "_industries_v" CASCADE;
  DROP TABLE "lawyers_blocks_text" CASCADE;
  DROP TABLE "lawyers_blocks_image" CASCADE;
  DROP TABLE "lawyers_blocks_callout" CASCADE;
  DROP TABLE "lawyers" CASCADE;
  DROP TABLE "lawyers_rels" CASCADE;
  DROP TABLE "_lawyers_v_blocks_text" CASCADE;
  DROP TABLE "_lawyers_v_blocks_image" CASCADE;
  DROP TABLE "_lawyers_v_blocks_callout" CASCADE;
  DROP TABLE "_lawyers_v" CASCADE;
  DROP TABLE "_lawyers_v_rels" CASCADE;
  DROP TABLE "experience_blocks_text" CASCADE;
  DROP TABLE "experience_blocks_image" CASCADE;
  DROP TABLE "experience_blocks_callout" CASCADE;
  DROP TABLE "experience" CASCADE;
  DROP TABLE "experience_rels" CASCADE;
  DROP TABLE "_experience_v_blocks_text" CASCADE;
  DROP TABLE "_experience_v_blocks_image" CASCADE;
  DROP TABLE "_experience_v_blocks_callout" CASCADE;
  DROP TABLE "_experience_v" CASCADE;
  DROP TABLE "_experience_v_rels" CASCADE;
  DROP TABLE "articles_blocks_text" CASCADE;
  DROP TABLE "articles_blocks_image" CASCADE;
  DROP TABLE "articles_blocks_callout" CASCADE;
  DROP TABLE "articles_sources" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v_blocks_text" CASCADE;
  DROP TABLE "_articles_v_blocks_image" CASCADE;
  DROP TABLE "_articles_v_blocks_callout" CASCADE;
  DROP TABLE "_articles_v_version_sources" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "categories_blocks_text" CASCADE;
  DROP TABLE "categories_blocks_image" CASCADE;
  DROP TABLE "categories_blocks_callout" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "_categories_v_blocks_text" CASCADE;
  DROP TABLE "_categories_v_blocks_image" CASCADE;
  DROP TABLE "_categories_v_blocks_callout" CASCADE;
  DROP TABLE "_categories_v" CASCADE;
  DROP TABLE "offices_blocks_text" CASCADE;
  DROP TABLE "offices_blocks_image" CASCADE;
  DROP TABLE "offices_blocks_callout" CASCADE;
  DROP TABLE "offices" CASCADE;
  DROP TABLE "_offices_v_blocks_text" CASCADE;
  DROP TABLE "_offices_v_blocks_image" CASCADE;
  DROP TABLE "_offices_v_blocks_callout" CASCADE;
  DROP TABLE "_offices_v" CASCADE;
  DROP TABLE "recognitions_blocks_text" CASCADE;
  DROP TABLE "recognitions_blocks_image" CASCADE;
  DROP TABLE "recognitions_blocks_callout" CASCADE;
  DROP TABLE "recognitions" CASCADE;
  DROP TABLE "_recognitions_v_blocks_text" CASCADE;
  DROP TABLE "_recognitions_v_blocks_image" CASCADE;
  DROP TABLE "_recognitions_v_blocks_callout" CASCADE;
  DROP TABLE "_recognitions_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "consultation_requests" CASCADE;
  DROP TABLE "notification_outbox" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_language";
  DROP TYPE "public"."enum_pages_review_state";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_language";
  DROP TYPE "public"."enum__pages_v_version_review_state";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_services_language";
  DROP TYPE "public"."enum_services_review_state";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_language";
  DROP TYPE "public"."enum__services_v_version_review_state";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_industries_language";
  DROP TYPE "public"."enum_industries_review_state";
  DROP TYPE "public"."enum_industries_status";
  DROP TYPE "public"."enum__industries_v_version_language";
  DROP TYPE "public"."enum__industries_v_version_review_state";
  DROP TYPE "public"."enum__industries_v_version_status";
  DROP TYPE "public"."enum_lawyers_language";
  DROP TYPE "public"."enum_lawyers_review_state";
  DROP TYPE "public"."enum_lawyers_status";
  DROP TYPE "public"."enum__lawyers_v_version_language";
  DROP TYPE "public"."enum__lawyers_v_version_review_state";
  DROP TYPE "public"."enum__lawyers_v_version_status";
  DROP TYPE "public"."enum_experience_language";
  DROP TYPE "public"."enum_experience_review_state";
  DROP TYPE "public"."enum_experience_status";
  DROP TYPE "public"."enum__experience_v_version_language";
  DROP TYPE "public"."enum__experience_v_version_review_state";
  DROP TYPE "public"."enum__experience_v_version_status";
  DROP TYPE "public"."enum_articles_language";
  DROP TYPE "public"."enum_articles_review_state";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_language";
  DROP TYPE "public"."enum__articles_v_version_review_state";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_categories_language";
  DROP TYPE "public"."enum_categories_review_state";
  DROP TYPE "public"."enum_categories_status";
  DROP TYPE "public"."enum__categories_v_version_language";
  DROP TYPE "public"."enum__categories_v_version_review_state";
  DROP TYPE "public"."enum__categories_v_version_status";
  DROP TYPE "public"."enum_offices_language";
  DROP TYPE "public"."enum_offices_review_state";
  DROP TYPE "public"."enum_offices_status";
  DROP TYPE "public"."enum__offices_v_version_language";
  DROP TYPE "public"."enum__offices_v_version_review_state";
  DROP TYPE "public"."enum__offices_v_version_status";
  DROP TYPE "public"."enum_recognitions_language";
  DROP TYPE "public"."enum_recognitions_review_state";
  DROP TYPE "public"."enum_recognitions_status";
  DROP TYPE "public"."enum__recognitions_v_version_language";
  DROP TYPE "public"."enum__recognitions_v_version_review_state";
  DROP TYPE "public"."enum__recognitions_v_version_status";
  DROP TYPE "public"."enum_consultation_requests_status";
  DROP TYPE "public"."enum_notification_outbox_status";`);
}
