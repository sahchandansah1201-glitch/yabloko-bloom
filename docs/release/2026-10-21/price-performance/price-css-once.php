<?php
/* Staging-only price pilot. Keep every row and its dynamic booking attributes.
 * Elementor already enqueues the stylesheet; keep the first inline print too.
 * Rollback: deactivate this snippet, without restoring the database. */
add_action('wp', static function () {
    // Capture the page before Unlimited Elements switches the main query to a service.
    if (is_admin() || wp_doing_ajax() || is_preview() || is_customize_preview()
        || !is_page(2903) || 'new.yaclinic.ru' !== wp_parse_url(home_url(), PHP_URL_HOST)) {
        return;
    }

    $elementor = \Elementor\Plugin::$instance;
    if ($elementor->editor->is_edit_mode() || $elementor->preview->is_preview_mode()) {
        return;
    }

    $pending_id = 0;
    $printed = false;
    // The actual CSS file is stable; Elementor's current document is not.
    add_filter('elementor/frontend/builder_content/before_enqueue_css_file',
        static function ($file) use (&$pending_id) {
            $pending_id = (int) $file->get_post_id();
            return $file;
        }, 1000);
    add_filter('elementor/frontend/builder_content/before_print_css',
        static function ($with_css) use (&$pending_id, &$printed) {
            $id = $pending_id;
            $pending_id = 0; // An unpaired/excerpt call must keep its own CSS.
            if (!$with_css || 2913 !== $id) {
                return $with_css;
            }
            if ($printed) {
                return false;
            }
            $printed = true;
            return $with_css;
        }, 1000);
});
