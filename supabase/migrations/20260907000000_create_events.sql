-- The one table this product's analytics pipeline writes to and reads from.
-- No user table, no foreign keys -- matches the product's existing
-- "no accounts" posture exactly. See design spec §3.2.
create table events (
  id          bigint generated always as identity primary key,
  event       text not null,
  session_id  text not null,
  properties  jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index events_event_idx on events (event);
create index events_created_at_idx on events (created_at);
