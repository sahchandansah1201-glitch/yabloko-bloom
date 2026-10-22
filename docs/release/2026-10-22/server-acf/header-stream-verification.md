# Deliver the completed header before a full cold render

Only anonymous homepage 6 and doctor 738 use this path. Existing URL/legal-link and Elementor image transformers remain in the same order. Each wrapper processes a complete header prefix once, then its complete body remainder. Elementor's normal header-only `the_content` flush is preserved. An empty exact-owned image buffer is replaced; foreign/nonempty buffers are left alone. The existing HTML cache uses a 1-byte callback threshold only in this scope so it does not hold the completed prefix. Every other page keeps its prior buffering path.

Integration in existing snippet 8: append the helper and hook fragments, then replace the original `ob_start('yaclinic_p1_rewrite_html', $chunk_size)` with the scoped factory selection (`$stream=yc_p1_early_header_scope()` and `$stream ? 1 : $chunk_size`). No core/vendor edits.

Independent helper test: missing factory failed before; final source passed 32 scenarios/4384 checks, including every two-chunk byte split, fixed chunks, original full-transform parity, CLEAN/fallback, custom transformer and two stacked wrappers. The 57-scenario/278-check cache suite also passed after the change.

First trial failed the strict live parity gate and was automatically rolled back: its image buffer outlived Elementor's original header-only flush. That lifecycle was restored before acceptance. A later raw-byte difference on Gracheva was traced only to seven 5-character random Unlimited Elements repeater CSS classes. A second request without code changes reproduced those differences. Comparisons normalize only that proven random token pattern; image attributes, text, links, dimensions, scripts and all other bytes must match. Final homepage bytes match exactly; Gracheva bytes match after that narrow normalization. Cached and uncached bodies match as well.

One loopback confirmation pair (not the final median benchmark): homepage cold first byte 1773 ms to 486 ms, Gracheva 1550 ms to 617 ms. Full render is not claimed to vanish: resources may begin loading while PHP builds the remainder.

Final snippet 8 SHA-256: `fc6fd8e348b4aa7ab96f0facc96904127c051176de4ebfdb2c592f9db7be3bb4`. Content metadata digest remains `d0b46c11ad33ebcf3f34fc92b8dd49c7488493c143303b3dfda4dfc3e2314d77`. Exact dual-object rollback records and response bodies are private, outside web root.
