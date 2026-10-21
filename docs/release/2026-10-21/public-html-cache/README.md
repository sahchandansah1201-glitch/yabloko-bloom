# Staging-only public HTML cache

Live MU plugin: `/var/www/clinic/wp-content/mu-plugins/yaclinic-public-html-cache.php` on staging. Only the exact host `new.yaclinic.ru` is eligible. No production, DNS, TLS, Nginx or FPM configuration change.

Conservative boundary: HTTPS GET, empty cookies, no query/auth/nonce/range, public singular content or known archives. Admin, logged-in visitors, REST, AJAX, search, preview, password pages and private/no-store/Set-Cookie responses bypass the cache. Booking APIs and available slots are never cached. TTL 120 seconds; content, price metadata, terms and snippets invalidate the generation at the first write and at shutdown after a multi-row sync. Only observed runtime cache/log options are excluded. Entries are private (0700 directory, 0600 files).

Verification: 54 pure checks passed. A live invocation of only this plugin's registered metadata callback changed its generation without changing 1,804 price rows. Final integrity readback retained the public post hash `90088a561f12683474cba0459ee82c5d927994426b9683d8e79e56fe526be031b` and price hash `2f5ca36c68a0f2e72b3f5b7b51909cd4212e9d3175d61d365c53bb41b2cf1d08`. Final cache file matched its private installation receipt.

The first full-buffer implementation exposed an existing FastCGI stderr/header-size problem on the acne page (502). It was corrected by preserving 4096-byte streaming while separately accumulating a validated cache copy. No warning suppression or server-buffer increase was used. The failed run is retained outside Git and excluded from final metrics. All final 39 control requests returned 200; the full 210-address sweep retained 188x200 and 22x301.

This improves warm public responses, not the underlying cold Elementor render. Final median-of-three includes one MISS and two HITs per route. Cold price MISS was 5.344 s; do not advertise a universal full-page/CWV improvement. Returning visitors with any cookie deliberately bypass caching.

Rollback: move this one MU plugin out of the MU directory to the existing private backup directory, then verify uncached public pages and booking. Do not remove other MU plugins, restore an entire database or touch production. Installation/update scripts are not repeatable deployment commands and are intentionally not included here.
