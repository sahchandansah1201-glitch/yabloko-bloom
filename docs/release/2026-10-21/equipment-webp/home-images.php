<?php
// Format-only derivatives, restricted to two audited equipment photos on the home page.
add_filter('elementor/frontend/the_content', static function ($html) {
    if (is_admin() || is_preview() || !is_front_page()
        || 'new.yaclinic.ru' !== wp_parse_url(home_url(), PHP_URL_HOST)) return $html;
    $map = [];
    foreach (['blob-edited-no-edvans','exec-2a2dbc73-41e2-48f8-a099-9090930fcd01'] as $stem) {
        foreach (['-150x150','-300x300','-768x768','-1024x1024',''] as $size) {
            $old = $stem.$size.'.png'; $new = $stem.$size.'-perf.webp';
            if (!is_file(ABSPATH.'wp-content/uploads/2026/04/'.$new)) return $html;
            $map[$old] = $new;
        }
    }
    // Elementor may reuse widget HTML and bypass the attachment-attributes hook.
    $tags = new WP_HTML_Tag_Processor($html);
    while ($tags->next_tag('IMG')) {
        if (!$tags->has_class('wp-image-3338') && !$tags->has_class('wp-image-3339')) continue;
        foreach (['src','srcset'] as $key) {
            $value = $tags->get_attribute($key);
            if (is_string($value)) $tags->set_attribute($key,strtr($value,$map));
        }
    }
    return $tags->get_updated_html();
}, 100);
