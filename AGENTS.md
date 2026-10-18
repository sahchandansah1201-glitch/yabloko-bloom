# Architecture rules

- Keep the legacy review-links route standalone and omit global contact overlays only on that route, so QR visitors can reach every review destination without changing ordinary clinic flows.
- Keep the WordPress review fragment self-contained with root-scoped CSS and the existing logo embedded, so porting requires no global templates or runtime dependencies.