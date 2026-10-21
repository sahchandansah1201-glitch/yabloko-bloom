<?php
// Read-only hashes; no patient data or source contents in the receipt.
if (PHP_SAPI !== 'cli' || gethostname() !== 'spb-3-vm-tevr') exit(1);
define('DISABLE_WP_CRON', true);
require '/var/www/clinic/wp-load.php';
if (wp_parse_url(home_url(), PHP_URL_HOST) !== 'new.yaclinic.ru') exit(2);
$posts = $wpdb->get_results("SELECT ID,post_type,post_status,post_title,post_content,post_excerpt FROM {$wpdb->posts} WHERE post_type IN ('page','post','advice','service','service_group','doctor','elementor_library','clinic_document','technology','akcii') ORDER BY ID", ARRAY_A);
$prices = $wpdb->get_results("SELECT post_id,meta_key,meta_value FROM {$wpdb->postmeta} WHERE meta_key LIKE '%price%' ORDER BY meta_id", ARRAY_A);
$content_hash = hash('sha256', wp_json_encode($posts));
$price_hash = hash('sha256', wp_json_encode($prices));
$cache = json_decode(file_get_contents(__DIR__.'/installed-cache.json'), true);
$price_before = json_decode(file_get_contents(__DIR__.'/cache-invalidation-result.json'), true);
$images = json_decode(file_get_contents(__DIR__.'/image-derivatives/manifest.json'), true);
$images_ok = true;
foreach ($images as $image) {
    $source = ABSPATH.ltrim(parse_url($image['source'], PHP_URL_PATH), '/');
    $target = ABSPATH.ltrim(parse_url($image['target'], PHP_URL_PATH), '/');
    $images_ok = $images_ok && hash_file('sha256', $source) === $image['source_sha256'];
    $images_ok = $images_ok && hash_file('sha256', $target) === $image['target_sha256'];
}
$snippets = [];
foreach ([50,51,53] as $id) {
    $row = $wpdb->get_row($wpdb->prepare("SELECT id,active,code FROM {$wpdb->prefix}snippets WHERE id=%d", $id), ARRAY_A);
    $snippets[$id] = ['active'=>(bool)$row['active'], 'sha256'=>hash('sha256', $row['code'])];
}
$result = ['content_sha256'=>$content_hash, 'content_unchanged'=>$content_hash===$cache['content_sha256'],
    'price_rows'=>count($prices), 'price_sha256'=>$price_hash, 'prices_unchanged'=>$price_hash===$price_before['price_sha256'],
    'original_and_derived_images_unchanged'=>$images_ok, 'snippets'=>$snippets,
    'cache_matches_receipt'=>hash_file('sha256', WPMU_PLUGIN_DIR.'/yaclinic-public-html-cache.php')===$cache['sha256']];
file_put_contents(__DIR__.'/final-integrity.json', wp_json_encode($result));
echo wp_json_encode($result), PHP_EOL;
if (!$result['content_unchanged'] || !$result['prices_unchanged'] || !$images_ok || !$result['cache_matches_receipt']) exit(3);
