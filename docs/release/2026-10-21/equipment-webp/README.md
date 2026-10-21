# Staging equipment image optimization

Applied only to `new.yaclinic.ru`, Code Snippets ID 51. Two home-page equipment images use ten WebP derivatives (150/300/768/1024/1254 px). Original PNG files and attachment records are untouched. No crop or geometry change; alpha equality was checked by the build script.

The two 768 px mobile resources total 59,028 bytes instead of 821,864 bytes (92.8% less). A 390 px browser selected both 768 px derivatives; both were visually inspected. The filter uses `elementor/frontend/the_content` because Elementor may reuse cached widget HTML. It fails open unless all ten derivative files exist.

The final server integrity readback verified every original and derivative hash against `manifest.json`. Public post contents/excerpts and 1,804 price metadata rows retained their hashes. Screenshots and private installation receipts stay outside Git.

Rollback: deactivate only snippet 51; leave original media intact. Do not run installers again. This checkpoint documents an already applied staging change; it does not deploy the React application or change production.
