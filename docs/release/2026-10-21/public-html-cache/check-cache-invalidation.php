<?php
// Invoke only our registered callback, never unrelated meta hooks or a real price write.
if (PHP_SAPI!=='cli' || gethostname()!=='spb-3-vm-tevr') exit(1);
define('DISABLE_WP_CRON',true);require '/var/www/clinic/wp-load.php';
if (wp_parse_url(home_url(),PHP_URL_HOST)!=='new.yaclinic.ru') exit(2);
$prices=$wpdb->get_results("SELECT post_id,meta_key,meta_value FROM {$wpdb->postmeta} WHERE meta_key LIKE '%price%' ORDER BY meta_id",ARRAY_A);
$hash=hash('sha256',wp_json_encode($prices));$before=get_option('yc_public_html_generation');$calls=0;
foreach ($wp_filter['updated_post_meta']->callbacks as $priority=>$callbacks) {
    foreach ($callbacks as $entry) {
        $callback=$entry['function'];
        if (!$callback instanceof Closure) continue;
        $reflection=new ReflectionFunction($callback);
        if ($reflection->getFileName()===WPMU_PLUGIN_DIR.'/yaclinic-public-html-cache.php') {
            $callback(0,0,'sqns_service_price_min');$calls++;
        }
    }
}
$after=get_option('yc_public_html_generation');
$now=$wpdb->get_results("SELECT post_id,meta_key,meta_value FROM {$wpdb->postmeta} WHERE meta_key LIKE '%price%' ORDER BY meta_id",ARRAY_A);
if ($calls!==1 || $before===$after || hash('sha256',wp_json_encode($now))!==$hash) throw new RuntimeException('Invalidation check failed');
$result=['callback_calls'=>$calls,'generation_changed'=>true,'price_rows'=>count($prices),'price_sha256'=>$hash,'prices_unchanged'=>true];
file_put_contents(__DIR__.'/cache-invalidation-result.json',wp_json_encode($result));echo wp_json_encode($result),PHP_EOL;
