CREATE SCHEMA IF NOT EXISTS operations;
CREATE TABLE IF NOT EXISTS operations.consultation_rate_limits (bucket text PRIMARY KEY, count integer NOT NULL DEFAULT 0);
