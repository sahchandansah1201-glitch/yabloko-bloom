<?php
function yc_p1_early_header_scope(): bool {
    return 'yaclinic.ru' === wp_parse_url(home_url(),PHP_URL_HOST)
        && !is_user_logged_in() && !is_admin() && !wp_doing_ajax() && !is_preview() && !is_customize_preview()
        && ((is_front_page() && 6 === (int)get_queried_object_id()) || (is_singular('doctor') && 738 === (int)get_queried_object_id()));
}
add_action('get_header',static function (): void {
    if (!yc_p1_early_header_scope()) return;
    $buffer=ob_get_status();
    if (!$buffer || $buffer['name']!=='Elementor\\Modules\\ImageLoadingOptimization\\Module::handle_buffer_content' || $buffer['buffer_used']!==0) return;
    $module=\Elementor\Plugin::$instance->modules_manager->get_modules('image-loading-optimization');
    $callback=array($module,'handle_buffer_content');
    if (!is_callable($callback)) return;
    // Replace only this still-empty owned buffer; keep its original image transformer.
    ob_end_flush();
    ob_start(yc_p1_header_stream_rewriter($callback),1);
    $level=ob_get_level();$name=ob_get_status()['name'];
    // Preserve Elementor's normal header-only flush before the_content rendering.
    add_filter('the_content',static function ($content) use ($level,$name) {
        $status=ob_get_status();
        if (ob_get_level()===$level && $status && $status['name']===$name) ob_end_flush();
        return $content;
    },-1);
},PHP_INT_MAX);
