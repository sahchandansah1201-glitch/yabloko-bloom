# Bounded PHP-FPM capacity

One production pool setting changed: `pm.max_children` from 5 to 8. Request memory limit remains 512M in WordPress (base php.ini is 128M). No php.ini limit, database setting, DNS, certificate or plugin version was changed.

Before: repeated FPM max-children warnings; server RAM 1967 MiB, available about 850 MiB immediately before publication. Three sampled workers had proportional resident memory of 64-77 MiB each. Public request PHP peaks were 18-62 MiB. OPcache was not full, hit rate about 99.98%, no OOM/cache restarts in its sampled statistics.

Configuration test passed, graceful reload succeeded and live readback confirmed 8. Six minutes later the services were active, available RAM about 886 MiB, socket queue zero. Increasing the concurrency cap is not claimed to make a single request 60% faster. A sustained traffic/queue measurement remains necessary for a production p95 capacity claim.

Exact config backup was retained privately, outside web root. Rollback only this setting after current-hash comparison; do not restore unrelated application/database state.
