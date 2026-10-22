<?php
/** ACF image arrays let Elementor handle an empty optional avatar without indexing false. */
function yc_acf_catalog_avatar_format($field) {
    if ('image' === ($field['type'] ?? '')) {
        $field['return_format'] = 'array';
    }
    return $field;
}
foreach (array(1, 2, 3) as $yc_avatar_position) {
    add_filter('acf/load_field/key=field_sqns_service_group_doctors_avatar_' . $yc_avatar_position . '_image', 'yc_acf_catalog_avatar_format');
}
