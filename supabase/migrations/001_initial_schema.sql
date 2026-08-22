-- ─── Mzilikazi Apartments — Supabase Migration ────────────────────────────────
-- Run this in your Supabase SQL editor or via the Supabase CLI
-- supabase migration new initial_schema

-- ─── Enquiries ────────────────────────────────────────────────────────────────
create table if not exists enquiries (
  id               uuid        default gen_random_uuid() primary key,
  created_at       timestamptz default now(),
  name             text        not null,
  email            text        not null,
  phone            text,
  arrival_date     date        not null,
  departure_date   date        not null,
  guests           integer     not null,
  message          text,
  apartment_preference text,
  status           text        default 'new'
                   check (status in ('new', 'responded', 'booked', 'closed')),
  source           text        default 'website'
);

-- ─── Guests (Phase 2 foundation) ──────────────────────────────────────────────
create table if not exists guests (
  id         uuid        default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name       text        not null,
  email      text        not null unique,
  phone      text,
  country    text,
  notes      text
);

-- ─── Apartments (operational, not CMS) ───────────────────────────────────────
create table if not exists apartments (
  id     uuid        default gen_random_uuid() primary key,
  slug   text        unique not null,
  name   text        not null,
  active boolean     default true
);

-- ─── Bookings (Phase 2 foundation) ────────────────────────────────────────────
create table if not exists bookings (
  id            uuid        default gen_random_uuid() primary key,
  created_at    timestamptz default now(),
  apartment_id  uuid        references apartments(id),
  guest_id      uuid        references guests(id),
  check_in      date        not null,
  check_out     date        not null,
  guests        integer     not null,
  status        text        default 'pending'
                check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  total_amount  numeric(10,2),
  currency      text        default 'USD',
  notes         text,
  source        text        default 'direct'
);

-- ─── Row-Level Security ────────────────────────────────────────────────────────

-- Enable RLS
alter table enquiries enable row level security;
alter table guests     enable row level security;
alter table apartments enable row level security;
alter table bookings   enable row level security;

-- Enquiries: anyone (anon) can insert; only authenticated users can select
create policy "Allow anon inserts to enquiries"
  on enquiries for insert
  to anon
  with check (true);

create policy "Allow authenticated reads on enquiries"
  on enquiries for select
  to authenticated
  using (true);

create policy "Allow authenticated updates on enquiries"
  on enquiries for update
  to authenticated
  using (true);

-- Apartments: public read
create policy "Public read on apartments"
  on apartments for select
  to anon
  using (active = true);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
create index if not exists enquiries_status_idx    on enquiries (status);
create index if not exists enquiries_created_idx   on enquiries (created_at desc);
create index if not exists bookings_apartment_idx  on bookings (apartment_id);
create index if not exists bookings_guest_idx      on bookings (guest_id);
create index if not exists bookings_checkin_idx    on bookings (check_in);
