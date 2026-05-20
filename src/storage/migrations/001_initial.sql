-- Migration 001: Initial schema
-- All tables for NEXUS v0.1.0

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  pubkey TEXT NOT NULL UNIQUE,
  pseudonym TEXT NOT NULL,
  verified INTEGER NOT NULL DEFAULT 0, -- 0 = unverified, 1 = Safety Number verified
  safety_number TEXT,
  last_seen INTEGER -- unix timestamp
);

CREATE TABLE IF NOT EXISTS channels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'general' | 'sector' | 'logistics' | 'media' | 'legal'
  members_json TEXT NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY, -- same as uuid
  uuid TEXT NOT NULL UNIQUE,
  channel_id TEXT NOT NULL,
  sender_pubkey TEXT NOT NULL,
  sender_pseudonym TEXT NOT NULL,
  payload_blob TEXT NOT NULL, -- base64 encrypted
  payload_type TEXT NOT NULL, -- text|location|ptt|press|status|alert
  relay_tag TEXT NOT NULL,    -- INET|BT|SMS
  timestamp INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent', -- sent|delivered|read
  hop_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS seen_set (
  uuid TEXT PRIMARY KEY -- UUIDs of messages already seen (deduplication)
);

CREATE TABLE IF NOT EXISTS press_statements (
  id TEXT PRIMARY KEY,
  version INTEGER NOT NULL DEFAULT 1,
  author_pubkey TEXT NOT NULL,
  body TEXT NOT NULL,
  signed_blob TEXT NOT NULL,
  confirmed_count INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS incident_logs (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'arrest' | 'injury' | 'police_action' | 'other'
  payload TEXT NOT NULL,
  signed_blob TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS update_manifest_cache (
  id INTEGER PRIMARY KEY DEFAULT 1, -- single row
  json_blob TEXT NOT NULL,
  fetched_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS decoy_notes (
  id TEXT PRIMARY KEY,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Default settings
INSERT OR IGNORE INTO settings (key, value) VALUES ('battery_saver_enabled', '0');
INSERT OR IGNORE INTO settings (key, value) VALUES ('tou_accepted_at', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('pseudonym', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('role', 'coordinator');
INSERT OR IGNORE INTO settings (key, value) VALUES ('sector', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('homeserver_url', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('update_manifest_url', '');
