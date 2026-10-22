<?php
// Synthetic data-only contract; no WordPress, network, database or file writes.
$filters = array();
function add_action(...$args) {}
function add_filter($name,$callback,$priority=10,$args=1) { $GLOBALS['filters'][$name][]=$callback; }
function wp_parse_url($url,$part) { return parse_url($url,$part); }
function home_url() { return 'https://yaclinic.ru'; }
function is_front_page() { return $GLOBALS['front']; }
function get_queried_object_id() { return 6; }
function apply_data($data,$post) {
    foreach ($GLOBALS['filters']['elementor/frontend/builder_content_data'] ?? array() as $callback) $data=$callback($data,$post);
    return $data;
}
require getenv('YC_REVIEW_SOURCE');
$data=array(array('id'=>'hero','text'=>'unchanged'),array('id'=>'3d3b13f','elements'=>array(array('id'=>'legacy-review-query'))),array('id'=>'48f6d12','elements'=>array(array('id'=>'native-four-sources'))));
$GLOBALS['front']=true;
$expected=array($data[0],$data[2]);
if (apply_data($data,6)!==$expected) {fwrite(STDERR,"FAIL hidden legacy block still rendered\n");exit(1);}
if (apply_data($data,738)!==$data) {fwrite(STDERR,"FAIL other document changed\n");exit(1);}
$GLOBALS['front']=false;
if (apply_data($data,6)!==$data) {fwrite(STDERR,"FAIL non-home context changed\n");exit(1);}
$GLOBALS['front']=true;
if (apply_data($expected,6)!==$expected) {fwrite(STDERR,"FAIL unrelated data/order changed\n");exit(1);}
echo "HOME_REVIEW_RENDER_4_CASES_OK\n";
