<?php

/**
 * Yaclinic — Метрика и GA4 с выбором посетителя (стенд)
 */
// ID values are public configuration. Never put API credentials here.
add_action('wp_enqueue_scripts', static function (): void {
    if (is_admin() || is_feed() || is_preview() || is_404()
        || ! in_array(wp_parse_url(home_url('/'), PHP_URL_HOST), ['new.yaclinic.ru', 'yaclinic.ru', 'www.yaclinic.ru'], true)) {
        return;
    }
    $settings = get_option('yaclinic_public_trackers_v1', []);
    $metrikaId = (string) ($settings['metrika_id'] ?? '');
    $googleId = (string) ($settings['google_id'] ?? '');
    $metrikaId = preg_match('/^[1-9][0-9]{5,11}$/D', $metrikaId) ? $metrikaId : '';
    $googleId = preg_match('/^G-[A-Z0-9]{6,16}$/D', $googleId) ? $googleId : '';
    if ($metrikaId === '' && $googleId === '') {
        return;
    }
    $type = is_front_page() ? 'home' : get_post_type();
    $type = in_array($type, ['home', 'page', 'post', 'services', 'doctor'], true) ? $type : 'public';
    $path = WP_PLUGIN_DIR . '/sqns-integration/assets/clinic-tracking.js';
    if (! is_file($path)) { return; }
    wp_enqueue_script('yaclinic-public-trackers', set_url_scheme(content_url('/plugins/sqns-integration/assets/clinic-tracking.js'), 'https'), [],
        (string) filemtime($path), true);
    wp_add_inline_script('yaclinic-public-trackers', 'window.yaclinicTracking=' . wp_json_encode([
        'metrikaId' => $metrikaId, 'googleId' => $googleId,
        'pageTitle' => is_front_page() ? get_bloginfo('name') : wp_strip_all_tags(get_the_title()),
        'pageType' => $type,
    ], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) . ';', 'before');
});
