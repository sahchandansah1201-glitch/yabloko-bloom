<?php
/** Skip an already-hidden legacy review block before its queries/render work. */
function yc_home_reviews_render_data($data, $post_id) {
    if (6 !== (int) $post_id || !yc_unified_home_reviews_scope()) return $data;
    return array_values(array_filter($data, static function ($element) {
        return '3d3b13f' !== ($element['id'] ?? '');
    }));
}
add_filter('elementor/frontend/builder_content_data', 'yc_home_reviews_render_data', 30, 2);
