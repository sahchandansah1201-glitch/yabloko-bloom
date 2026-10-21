<?php
// Pure guard/expiry tests; no WordPress or network connection.
$hooks=[];$options=[];
function add_action($name,$callback,...$args) { global $hooks;$hooks[$name][]=$callback; }
function get_option($name,$default=null) { global $options;return $options[$name]??$default; }
function update_option($name,$value,...$args) { global $options;$options[$name]=$value; }
function home_url() { return 'https://new.yaclinic.ru'; }
function wp_parse_url($url,$part) { return parse_url($url,$part); }
function wp_nonce_tick() { return 123; }
require __DIR__.'/public-html-cache.php';
use Yaclinic\Performance\Public_HTML_Cache as Cache;
$checks=0;
function check($actual,$expected,$label) { global $checks;if ($actual!==$expected) throw new RuntimeException('FAIL '.$label);$checks++; }
$server=['HTTP_HOST'=>'new.yaclinic.ru','REQUEST_METHOD'=>'GET','HTTPS'=>'on','REQUEST_URI'=>'/price/'];
check(Cache::eligible($server,[]),true,'public price');
foreach (['/','/services/','/doctor/alisa-allam/','/dokumenty/'] as $path) {
    check(Cache::eligible(array_replace($server,['REQUEST_URI'=>$path]),[]),true,$path);
}
foreach (['/wp-json/sqns-integration/v1/slots','/wp-admin/','/wp-login.php','/price/?preview=1','/services/?ucterms=x','/feed/','//price/','/price/%2f'] as $path) {
    check(Cache::eligible(array_replace($server,['REQUEST_URI'=>$path]),[]),false,$path);
}
foreach (['HTTP_HOST'=>'yaclinic.ru','REQUEST_METHOD'=>'POST','HTTPS'=>'off','HTTP_AUTHORIZATION'=>'Bearer test','HTTP_X_WP_NONCE'=>'test','HTTP_RANGE'=>'bytes=0-10','HTTP_X_REQUESTED_WITH'=>'XMLHttpRequest'] as $key=>$value) {
    check(Cache::eligible(array_replace($server,[$key=>$value]),[]),false,$key);
}
check(Cache::eligible($server,['wordpress_logged_in_test'=>'x']),false,'login cookie');
check(Cache::eligible($server,['any_cookie'=>'x']),false,'any cookie');
$html='<!DOCTYPE html><html><body>Цена 13700 ₽</body></html>';
$headers=['Content-Type: text/html; charset=UTF-8'];
check(Cache::can_store($html,$headers,200),true,'public response');
foreach (['Set-Cookie: x=y','Cache-Control: private','Cache-Control: no-store','Location: /other/','Vary: Cookie'] as $header) check(Cache::can_store($html,array_merge($headers,[$header]),200),false,$header);
check(Cache::can_store($html,['Content-Type: application/json'],200),false,'JSON');
check(Cache::can_store($html,$headers,500),false,'error');
check(Cache::can_store('<html><body>partial',$headers,200),false,'partial');
check(Cache::can_store(str_replace('<body>','<body><div id="wpadminbar">',$html),$headers,200),false,'admin HTML');
check(Cache::fresh(['generation'=>'a','expires'=>101],'a',100),true,'fresh');
check(Cache::fresh(['generation'=>'a','expires'=>100],'a',100),false,'expiry');
check(Cache::fresh(['generation'=>'a','expires'=>101],'b',100),false,'price/content invalidation');
check(Cache::fresh([], 'a',100),false,'broken metadata');
foreach (['elementor_log','_elementor_design_system_sync_css_meta','_elementor_pro_license_v2_data','_transient_test','_site_transient_test','cron'] as $key) check(Cache::option_affects_content($key),false,'runtime only '.$key);
foreach (['blogname','elementor_active_kit','clinic_price_settings','elementor_pro_license_key'] as $key) check(Cache::option_affects_content($key),true,'content option '.$key);
foreach (['save_post','updated_post_meta','set_object_terms','updated_option','code_snippets/update_snippet'] as $hook) check(isset($hooks[$hook]),true,'invalidation hook '.$hook);
Cache::invalidate();$first=$options['yc_public_html_generation'];
check(strlen($first),24,'first write invalidation');
Cache::invalidate();check($options['yc_public_html_generation'],$first,'coalesced writes');
foreach ($hooks['shutdown'] as $callback) $callback();
check($options['yc_public_html_generation']!==$first,true,'completed batch invalidation');
echo 'PUBLIC_CACHE_'.$checks."_CHECKS_OK\n";
