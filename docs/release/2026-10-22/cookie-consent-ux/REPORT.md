# Cookie consent: approved wording on staging

Completed: 2026-10-22 (Europe/Moscow). Target: https://new.yaclinic.ru/. Production was not changed.

## Approved result

- Title: «Cookie на сайте».
- Copy: «С вашего согласия мы используем cookie, чтобы понимать, как пользуются сайтом, и делать его удобнее.»
- Choices: «Принять» / «Только необходимые», with equal-size controls.
- «Подробнее о cookie» expands provider and session-recording disclosure before a choice is made.
- «Настройки cookie» is a keyboard-operable button in the shared legal footer, not a floating oversized button.

## Implementation

Updated existing staging WordPress Code Snippets entry 47 through the authenticated editor. The added presentation script is attached after the existing tracker adapter. Both PHP and JavaScript limit the presentation change to new.yaclinic.ru.

The original consent buttons are moved and relabelled, preserving their handlers. The original localStorage key and granted/denied meanings are unchanged. Opening details does not grant consent. Changing the choice remains possible in the footer. Returning from settings restores focus to its button.

The published adapter was fetched again and remained byte-identical:
SHA256 ac39891ab6d1edac1d62adaf990a7ae13d8a80e761782d267daa14e4d8708a38.

The editor was reloaded and entry 47 exported again. Persisted PHP code matches snippet-47-after.php after removing export metadata before the first source comment. No claim is made that a launch, domain cutover, or production deployment occurred.

## Verification

Local suites are separate evidence, not one combined E2E count:

- New presentation tests: 10/10 PASS (node:test + JSDOM).
- Existing tracking regression suite: 12/12 PASS, run separately from research/tracker-installation-2026-10-20/test-tracking.cjs.
- JavaScript syntax check: PASS.
- TDD: expected failures were observed before implementation; a typography regression also failed before its CSS correction.
- PHP CLI was unavailable, so php -l was not run. WordPress accepted the snippet and the public inline script rendered successfully.

Anonymous HTTP checks: 7/7 returned 200 and contained exactly one new inline script with the exact approved source:
`/`, `/services/`, `/doctor/`, `/doctor/mariya-pavlyuk/`, `/services/biorevitalizacziya/`, `/contacts/`, `/price/`.

Real-browser checks:

- Fresh anonymous Chromium: zero analytics vendor scripts and zero tracker resource requests before a choice.
- «Только необходимые» and reload: choice denied, banner closed, zero vendor scripts and zero tracker resource requests.
- Acceptance in the normal in-app browser: choice granted, two vendor scripts; requests to mc.yandex.ru and www.googletagmanager.com observed. Reload retained acceptance.
- Revocation through the footer: choice denied after reload, zero vendor scripts.
- Responsive widths 360, 390, 768, 1440 CSS px: no horizontal overflow or banner-boundary failures, both choice controls at least 44 px high, heading 16 px.
- Profile, service and contacts pages at 390×844 and 1440×1000: 6/6 footer/settings/keyboard checks PASS. One settings button in the footer, reopening works, Tab reaches the second choice, refusal closes the banner and keeps tags off.
- Booking opened with refusal and with acceptance. The service-group step loaded all five groups and closed correctly. No name, phone, or appointment was submitted.

## Evidence and reproduction

- consent-ux.js: added UI enhancement.
- snippet-47-before.php: rollback source, preserved export.
- snippet-47-after.php: expected published snippet.
- snippet-47-readback.php: persisted export after reloading the editor.
- clinic-tracking-before.js: unchanged original adapter used by the presentation tests.
- test-consent-ux.cjs: run with `node --test test-consent-ux.cjs`; JSDOM currently uses the existing workstation dependency path.
- verification.json: structured verification record.
- cookie-desktop.png, cookie-mobile.png, cookie-details-mobile.png: real anonymous-browser screenshots.
- booking-without-analytics.png: booking first-step evidence without submitting a request.

## Remaining limits

Physical iPhone/Android devices were not used; mobile checks used a real Chromium browser with mobile-sized viewports. Provider-side event ingestion was not audited.

Unrelated page console errors were observed from jquery-core-js-after (MutationObserver target) and an HTTP Elementor custom-lightbox stylesheet blocked as mixed content. They do not originate in the added presentation source; no unrelated fix was included. There is no before-deployment browser baseline for these errors.

The footer integration uses the existing shared legal-menu ID menu-1-e744bd7. A future footer-template replacement must retain this target or update the enhancement. The new presentation is intentionally staging-only; domain-cutover changes require a separate approved step.

## Rollback

Restore entry 47 from snippet-47-before.php through the WordPress editor, omitting export metadata as required by Code Snippets. Do not delete consent storage or modify the original tracking adapter. Production needs no rollback because it was not changed.
