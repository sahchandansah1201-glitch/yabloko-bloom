# On-demand booking and shared common fonts — staging

Live Code Snippets ID 53, final guarded source `asset-runtime.php`. The original SQNS and reviews plugin assets are unchanged. Separate hash-pinned derivative assets reside in the staging uploads directory. A plugin-source mismatch fails open to the original assets. No global JavaScript delay, API caching or booking business-rule change.

Before user intent the 137,601-byte transferred / 441,924-byte decoded booking bundle is not requested. The small loader immediately shows an accessible loading state, preserves the service/doctor context, supports closing while downloading, and provides retry/telephone fallback. A readiness signal delivers the pending intent to the original React handler without a second analytics intent; a once guard prevents double mounting after a delayed retry.

Common Inter/Montserrat CSS imports now use the same Google Fonts URL globally and in both widgets/fallback. All 100–900 weights, italic and native review styling are retained. The observed initial font CSS URLs changed from eight to five. Yandex, 2GIS, Google and ProDoctorov tabs were checked at 390 and 1440 px; native Manrope/Roboto/PT Sans styling is intact. Used Font Awesome icons were deliberately retained; no SVG conversion or claimed font-weight pruning.

Checks: nine isolated booking-loader tests; four PHP runtime checks including double inclusion. Browser: first intent and loading state, service → procedure → doctor → available date/time, doctor-profile intent skipping doctor selection, close, repeat entry, close while downloading with no late opening. No real booking or callback was submitted. Network-error/retry behavior has isolated test coverage but was not fault-injected in the live browser.

An intermediate update auto-deactivated snippet 53 after a duplicate helper declaration. The original booking assets remained available. Repair required matching the actual inactive source hash, an explicit backup of the code fields, a guarded helper declaration and readback of active state. Final code SHA-256: `547ce139e42a3e0f5d2e096e0565b7da36afe71a0196b648fc318a5f769577c2`. The failed intermediate test was retained outside Git; the final source passed the repeat-include test.

Build inputs are the hash-pinned public original assets named in `build-bundles.py` and `build-shared-fonts.py`. The first builder also produces an experimental font-face variant that was NOT deployed; only four entries selected by `runtime-manifest.json` describe the live derivatives. Generated bundles/vendor copies and private receipts are not committed.

Rollback: deactivate only snippet 53. Original plugin assets resume. Do not rerun the installer or the failed updater, do not touch snippet 52, and do not restore all snippets/database. This checkpoint does not deploy the React app or modify production.

Font URL format reference: https://developers.google.com/fonts/docs/getting_started
