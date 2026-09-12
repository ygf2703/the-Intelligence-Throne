create extension if not exists pgcrypto;

create type publication_status as enum ('draft','review','approved','scheduled','published','archived');

create table parts (
  id uuid primary key default gen_random_uuid(),
  number integer not null unique,
  title_he text not null,
  title_en text,
  sort_order integer not null
);

create table chapters (
  id uuid primary key default gen_random_uuid(),
  part_id uuid references parts(id) on delete set null,
  chapter_number integer,
  slug text not null unique,
  title_he text not null,
  title_en text,
  content_he text not null default '',
  content_en text,
  excerpt_he text,
  excerpt_en text,
  status publication_status not null default 'draft',
  published_at timestamptz,
  visible_release_date boolean not null default false,
  current_version integer not null default 1,
  reading_minutes integer,
  spoiler_level integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table chapter_versions (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references chapters(id) on delete cascade,
  version integer not null,
  content_he text not null,
  content_en text,
  author_note text,
  created_at timestamptz not null default now(),
  unique(chapter_id, version)
);

create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  locale text not null default 'he',
  source_chapter_id uuid references chapters(id) on delete set null,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create table reader_progress (
  id uuid primary key default gen_random_uuid(),
  reader_key text not null,
  chapter_id uuid not null references chapters(id) on delete cascade,
  progress numeric not null default 0 check (progress >= 0 and progress <= 1),
  updated_at timestamptz not null default now(),
  unique(reader_key, chapter_id)
);

create table factions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  leader_name text,
  seat_name text,
  motto text,
  description_he text,
  description_en text,
  visible_from_chapter integer not null default 0
);

create table characters (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  affiliation_id uuid references factions(id) on delete set null,
  bio_he text,
  bio_en text,
  first_appearance integer,
  visible_from_chapter integer not null default 0
);
