-- Mzilikazi Apartments Neon Postgres Schema Setup
-- Run this in your Neon SQL Editor or via lib/db.ts ensureTablesExist()

CREATE TABLE IF NOT EXISTS enquiries (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at           TIMESTAMPTZ DEFAULT now(),
  name                 TEXT NOT NULL,
  email                TEXT NOT NULL,
  phone                TEXT,
  arrival_date         DATE,
  departure_date       DATE,
  guests               INTEGER NOT NULL,
  message              TEXT,
  apartment_preference TEXT,
  status               TEXT DEFAULT 'new' CHECK (status IN ('new', 'responded', 'booked', 'closed')),
  source               TEXT DEFAULT 'website'
);

CREATE TABLE IF NOT EXISTS apartments (
  id     UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug   TEXT UNIQUE NOT NULL,
  name   TEXT NOT NULL,
  active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS guests (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  phone      TEXT,
  country    TEXT,
  notes      TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT now(),
  apartment_id  UUID REFERENCES apartments(id),
  guest_id      UUID REFERENCES guests(id),
  check_in      DATE NOT NULL,
  check_out     DATE NOT NULL,
  guests        INTEGER NOT NULL,
  status        TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_amount  NUMERIC(10,2),
  currency      TEXT DEFAULT 'USD',
  notes         TEXT,
  source        TEXT DEFAULT 'direct'
);

-- Indexes for optimal querying
CREATE INDEX IF NOT EXISTS enquiries_status_idx    ON enquiries (status);
CREATE INDEX IF NOT EXISTS enquiries_created_idx   ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_apartment_idx  ON bookings (apartment_id);
CREATE INDEX IF NOT EXISTS bookings_guest_idx      ON bookings (guest_id);

