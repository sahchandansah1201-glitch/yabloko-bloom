# Early anonymous HTML cache

The existing validated public cache may now return a fresh HIT at `plugins_loaded`, before WordPress init and main-query work. MISS continues through the unchanged late `template_redirect` validation/store path. TTL remains 120 seconds; content-generation, nonce-tick and source-mtime invalidation remain active.

Only exact-host HTTPS anonymous GETs without query strings, cookies, Authorization, WP nonce, AJAX or Range headers qualify. REST, admin, login, preview and private/no-store/redirect responses bypass the early path. The cache does not store booking API data, availability, personal requests, errors or incomplete HTML. Public Link, X-Robots-Tag and Content-Language headers are allowlisted and preserved; arbitrary or newline-bearing metadata headers are not replayed.

Independent standalone tests executed on PHP 8.3: original source failed 7/57 scenarios; published source passed 57 scenarios/278 checks. Tests include actual exit/body/header behavior in isolated child processes, MISS fallthrough, all bypass guards, expiry/generation changes and the existing two-phase invalidation contract. Synthetic test directories are retained privately; the runner does not delete files.

Public HTTP readback returned HTTP2 200, HIT, revalidation Cache-Control and the original REST-discovery Link headers. Exact published source SHA-256: `5d3d5ce9bed77d783b2007c8aa9fbab972dacca80c5f0061c237d9ae54bef7ed`. Backup/rollback are private and limited to this file; no database restore is needed.
