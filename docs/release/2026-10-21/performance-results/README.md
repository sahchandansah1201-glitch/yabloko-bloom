# Staging performance result evidence

Read `REPORT.md` for the full Russian report and its explicit limitations. Production was not modified. This is a documentation/evidence checkpoint, not a React deployment.

Included guest-only, public HTTP data:

- `first-audit-http.json`: immutable first 13x3 audit.
- `before-five-http.json`: fresh 13x3 baseline after the separate earlier price CSS pilot.
- `after-five-http.json`: final 13x3; all 39 requests 200, one MISS + two HIT per route.
- `all-after.json`: 210-address sweep; 188x200 + 22x301 retained, public titles unchanged.
- `controls-after.json`: 13 content/CSS/link/image/booking-context comparisons.
- `browser-reflow-final.json`: 28 width checks; authenticated browser functional evidence, not guest speed.

Raw HTML, real reviews, database dumps, patient/request information, credentials, server logs, private backups and installation receipts are not included. Screenshot evidence stays in the local report folder.

Warm guest TTFB improved; cold misses did not consistently improve. Full guest browser CWV/physical-device performance was not established. A slower authenticated browser diagnostic and fixed intermediate failures are disclosed in the report. Do not reuse TTFB percentages as a claim about full load time or all visitors.
