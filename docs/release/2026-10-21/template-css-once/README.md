# Staging checkpoint: repeated template CSS

Deployed only to `new.yaclinic.ru`, Code Snippets ID 50. Existing price-only ID 49 is independent. No vendor/core source or content was edited.

The allowlist contains eleven template IDs confirmed by the guest HTML audit. Each template's first stylesheet is retained; only subsequent copies are suppressed using the two existing Elementor hooks. Unknown/unpaired calls fail open. Editor, preview, admin, AJAX and non-staging contexts are excluded.

Verification observed on 2026-10-21:

- PHP syntax passed; 50 isolated guard/hook checks passed. The old implementation failed the repeated-template regression before this change.
- Thirteen public control pages returned HTTP 200. Unique CSS, booking context, scripts, links, images and text were retained. The article's existing random `Читайте также` widget was excluded only from content equality, not the CSS comparison.
- Home HTML: 903708 to 593612 bytes; catalog: 879948 to 527177; biorevitalization: 1080052 to 670754. Exact repeated inline CSS became zero on all thirteen controls.
- Rendered home checked at 390 and 1440 CSS px: no horizontal overflow. The browser retained the user's authorized WordPress session; guest HTML verification used separate cookie-free HTTP requests.

Rollback: deactivate snippet 50 only. Leave price pilot 49 and other snippets unchanged. Private server receipt and pre-change snippet snapshot remain outside the web root. No private HTML/DB dump is included here.

This checkpoint does not claim all five optimizations are complete or a measured Core Web Vitals improvement. Production/DNS were not changed.
