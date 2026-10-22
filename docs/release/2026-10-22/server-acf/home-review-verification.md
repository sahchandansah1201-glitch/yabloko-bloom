# Skip an already-hidden legacy block before render

Existing homepage snippet 31 already hid container `3d3b13f` using the late `should_render` hook. Profiling showed its legacy review listing still queried and rendered before that decision. The new data filter skips only that root container on homepage document 6 before rendering. Existing late guard remains as a fallback. The native four-source review widget and every other document/node remain unchanged.

The synthetic test failed on the previous snippet and passed all four data/scope/order cases after. A live uncached profile confirmed the legacy listing widget was no longer rendered; content metadata checksum stayed `d0b46c11ad33ebcf3f34fc92b8dd49c7488493c143303b3dfda4dfc3e2314d77`. No content records were deleted or edited.

Published snippet 31 SHA-256: `b9397f448a4ee63e6f229be61e358a88191bd2a4727f1c6e0a1de40a9a2fcee0`. Exact object backup retained privately. Rollback is only the appended data filter.
