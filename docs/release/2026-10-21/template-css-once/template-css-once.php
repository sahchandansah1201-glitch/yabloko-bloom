<?php
// Exact repeated templates confirmed in the guest audit. Price has its own pilot.
add_action('wp', static function () {
    if (is_admin() || wp_doing_ajax() || is_preview() || is_customize_preview()
        || 'new.yaclinic.ru' !== wp_parse_url(home_url(), PHP_URL_HOST)) {
        return;
    }
    $elementor = \Elementor\Plugin::$instance;
    if ($elementor->editor->is_edit_mode() || $elementor->preview->is_preview_mode()) {
        return;
    }
    $ids = [190,262,468,1069,1659,1671,2271,2277,2485,2518,2540];
    $pending_id = 0;
    $printed = [];
    add_filter('elementor/frontend/builder_content/before_enqueue_css_file',
        static function ($file) use (&$pending_id) {
            $pending_id = (int) $file->get_post_id();
            return $file;
        }, 1001);
    add_filter('elementor/frontend/builder_content/before_print_css',
        static function ($with_css) use ($ids, &$pending_id, &$printed) {
            $id = $pending_id;
            $pending_id = 0;
            if (!$with_css || !in_array($id, $ids, true)) {
                return $with_css;
            }
            if (isset($printed[$id])) {
                return false;
            }
            $printed[$id] = true;
            return $with_css;
        }, 1001);
});
