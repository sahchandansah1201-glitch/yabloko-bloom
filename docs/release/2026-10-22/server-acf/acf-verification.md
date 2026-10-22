# Catalog ACF avatar warning

Published 2026-10-22 on yaclinic.ru. Existing P1 snippet 8 now normalizes only the three optional catalog avatar image fields to the native ACF array return format.

The same uncached anonymous GET of `/services/` reproduced 58 Elementor ACF image false-offset warnings before and zero after. Empty optional avatars now follow the normal empty-image branch. Non-empty attachment IDs and all stored metadata remain unchanged. Vendor files were not edited, warnings were not suppressed.

Content metadata SHA-256 before and after: `d0b46c11ad33ebcf3f34fc92b8dd49c7488493c143303b3dfda4dfc3e2314d77`.

Exact private object backup and publication readback were retained outside the public web root. Rollback is the appended fragment only, not a database restore. This fix is not claimed to accelerate full page rendering: the sampled uncached catalog render was 1.75 s before and 1.81 s after under live load.
