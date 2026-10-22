# Delivery, background jobs and offsite recovery checks

Checked on 22 October 2026, before DNS cutover. DNS was not changed. This is evidence for three launch gates, not approval for the entire launch.

## Real test delivery — PASS

- Exactly one HTTP POST reached the new instance over verified HTTPS using a per-command host resolution override.
- An existing dedicated test card was reused. No new patient card or profile-field change was made.
- The SQNS readback matched the selected service, practitioner and appointment time.
- The event reached the dashboard with one lead, one booking link and one delivery attempt. Raw contact fields were absent from the event.
- After repeated worker runs, 194 seconds after delivery, counts remained one. The deployed database has a unique event-id constraint.
- The exact test visit was cancelled once; readback confirmed cancellation and the slot becoming available again. The audit trail was retained.
- This was a real HTTP/API test, not a browser-click test.

## Background jobs — PASS for the current pre-cutover state

- One production delivery worker is scheduled every minute. Its last checked run succeeded.
- Automatic WP-Cron and the general production cron timer remain disabled. Public HTTP access to wp-cron returns 403.
- The two prepared PHP runners share a nonblocking lock. Deployed sources match their reviewed copies.
- No second production launch was found in classic crontabs. The existing staging worker uses a separate WordPress root and database.
- Server backup is scheduled daily at 03:45 Moscow time. A controlled run passed with 14,063 components verified.
- At the future cutover, stop the delivery-only timer and wait for it to finish before enabling general cron. This transition has not been performed.

## Offsite recovery — PASS with explicit limits

Encrypted copies are on the owner's Mac, separate from the VPS. Independent SHA-256 checks passed for all three encrypted archives. Archive and key permissions are 600; key contents were not printed.

| Component | Verified evidence |
|---|---|
| Website archive | 14,060 components checked after decryption |
| Recovery configuration sidecar | 4 components checked separately |
| Website SQL | Imported into an isolated verification database; 22 tables passed mysqlcheck; content-table checksums matched production before the test |
| Dashboard archive | 34 components; all three SQLite databases restored and passed integrity_check |

The restored wp-config was not executed and the working database was not restored. Archives, keys, dumps, contacts and private responses are excluded from this repository.

Limits: the website snapshot is from 10:29 Moscow time and the dashboard snapshot from 03:30 on the same day. They are separate snapshots, not one cross-database transaction, and precede the test. Daily transfer off the VPS is not automated. Take a fresh final offsite copy before the actual cutover. No RPO/RTO guarantee is established.

## Checker correction

The original precheck expected datetime objects, but the public API correctly returns datetime strings. It failed before the send marker and before any POST. Only the local checker membership assertion was corrected. A red-to-green regression and an unavailable-slot rejection test passed. Application code and runtime schedules were not changed in this verification task.

The companion `verification.json` is deliberately de-identified. `assert-results.cjs` validates its recorded invariants; it does not replay the live booking.
