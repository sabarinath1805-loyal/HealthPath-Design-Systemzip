---
name: Drizzle push vs connect-pg-simple session table
description: Why drizzle-kit push prompts to drop a table, and the safe workaround.
---

`connect-pg-simple` lazily creates a `session` table (on first request that uses
the session store). That table is NOT in the Drizzle schema, so `drizzle-kit push`
sees it as an unknown table and interactively offers to "remove 1 table".

**Rule:** Never accept that drop — it would wipe all active login sessions.

**Why:** The session table is owned by connect-pg-simple, not Drizzle. The first
`db:push` (run before any request) succeeds silently because the table doesn't
exist yet; later pushes prompt once the app has served a request.

**How to apply:** When a schema change must reach an already-running DB and push
wants to drop `session`, apply the change with direct SQL instead (e.g. enum
column conversions via `executeSql` / ALTER TABLE) rather than running push.
Tables that are empty convert cleanly with `ALTER COLUMN ... TYPE x USING col::x`.
