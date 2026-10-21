<?php
// Separate derived assets. Plugin originals stay intact and are the fail-open fallback.
if (!function_exists('yc_perf_20261021_strip_external_script')) {
    function yc_perf_20261021_strip_external_script($tag,$handle) {
        return preg_replace('~<script\b(?=[^>]*\bid=["\']'.preg_quote($handle.'-js','~').'["\'])[^>]*>.*?</script>~s','',$tag,1);
    }
}
add_action('wp',static function () {
    if (is_admin() || is_preview() || is_customize_preview() || wp_doing_ajax()
        || wp_parse_url(home_url(),PHP_URL_HOST)!=='new.yaclinic.ru') return;
    $dir=ABSPATH.'wp-content/uploads/yc-performance-20261021/';
    $url='https://new.yaclinic.ru/wp-content/uploads/yc-performance-20261021/';
    $booking=ABSPATH.'wp-content/plugins/sqns-integration/assets/frontend/booking-widget/booking-widget.js';
    $reviews=ABSPATH.'wp-content/plugins/yabloko-bloom-reviews-wdg/assets/frontend/reviews-widget.js';
    $lazy=false;
    $weights=implode(',',array_map(static function ($weight) { return $weight.','.$weight.'italic'; },range(100,900,100)));
    $common_fonts='https://fonts.googleapis.com/css?family=Inter:'.$weights.'%7CMontserrat:'.$weights.'&display=swap&subset=cyrillic';
    add_filter('style_loader_src',static function ($src,$handle) use ($common_fonts) {
        return in_array($handle,['elementor-gf-inter','elementor-gf-montserrat'],true)?$common_fonts:$src;
    },100,2);
    $booking_ok=is_file($booking) && hash_file('sha256',$booking)==='8517c04d2f0d18200c5e6dea0bb8dd0cf816f62e24b6105294487237294bdb66'
        && is_file($dir.'booking-widget-common-fonts.js') && is_file($dir.'booking-lazy.js');
    $reviews_ok=is_file($reviews) && hash_file('sha256',$reviews)==='c580ffc4c68efda69537b1fd64c3068ca699efb829c1d6474a39059db0bd524b'
        && is_file($dir.'reviews-widget-common-fonts.js');
    $fallback_ok=is_file(dirname($reviews).'/fallback.css')
        && hash_file('sha256',dirname($reviews).'/fallback.css')==='d61109319975b82615be2ff34ddb399c56014e0694b12e0146baa9a1eb1b554c'
        && is_file($dir.'reviews-fallback-common-fonts.css');
    add_filter('style_loader_tag',static function ($tag,$handle,$href) use ($fallback_ok,$url) {
        if ($fallback_ok && str_contains($href,'/yabloko-bloom-reviews-wdg/assets/frontend/fallback.css')) {
            return str_replace($href,$url.'reviews-fallback-common-fonts.css?ver=20261021',$tag);
        }
        return $tag;
    },100,3);
    add_action('wp_head',static function () use (&$lazy,$booking_ok,$dir,$url) {
        if (!$booking_ok) return;
        $loader=file_get_contents($dir.'booking-lazy.js');
        if (!$loader) return;
        $config=wp_json_encode(['src'=>$url.'booking-widget-common-fonts.js?ver=20261021']);
        echo '<script id="yc-booking-lazy">window.sqnsBookingApiBase=',wp_json_encode(rtrim(rest_url('sqns-integration/v1/'),'/')),
            ';window.ycBookingLazy=',$config,';',$loader,'</script>';
        $lazy=true;
    },2);
    add_filter('script_loader_tag',static function ($tag,$handle,$src) use (&$lazy,$reviews_ok,$url) {
        if ($lazy && in_array($handle,['sqns-booking-widget','sqns-booking-trigger'],true)) {
            // Keep WordPress before/after inline configuration and analytics code.
            return yc_perf_20261021_strip_external_script($tag,$handle);
        }
        if ($reviews_ok && $handle==='reviews-widget-frontend') {
            return str_replace($src,$url.'reviews-widget-common-fonts.js?ver=20261021',$tag);
        }
        return $tag;
    },100,3);
});
