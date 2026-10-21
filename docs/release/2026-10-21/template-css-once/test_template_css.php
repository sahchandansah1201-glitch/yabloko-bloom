<?php
namespace Elementor { class Plugin { public static $instance; } }
namespace {
    $hooks = []; $context = []; $checks = 0;
    function add_action($h,$f,$p=10) { add_filter($h,$f,$p); }
    function add_filter($h,$f,$p=10) { global $hooks; $hooks[$h][]=$f; }
    function apply_filters($h,$v) { global $hooks; foreach ($hooks[$h]??[] as $f) $v=$f($v); return $v; }
    function is_admin() { global $context; return $context['admin']??false; }
    function wp_doing_ajax() { global $context; return $context['ajax']??false; }
    function is_preview() { global $context; return $context['preview']??false; }
    function is_customize_preview() { global $context; return $context['customize']??false; }
    function is_page($id) { return false; }
    function home_url() { global $context; return 'https://'.($context['host']??'new.yaclinic.ru'); }
    function wp_parse_url($u,$p) { return parse_url($u,$p); }
    $mode = new class {
        function is_edit_mode() { global $context; return $context['editor']??false; }
        function is_preview_mode() { global $context; return $context['elementor_preview']??false; }
    };
    \Elementor\Plugin::$instance=(object)['editor'=>$mode,'preview'=>$mode];
    function css($id) { return new class($id) {
        private $id; function __construct($id) { $this->id=$id; }
        function get_post_id() { return $this->id; }
    }; }
    function same($a,$b,$name) { global $checks; if ($a!==$b) throw new \RuntimeException('FAIL '.$name); $checks++; }
    $source=$argv[1]??__DIR__.'/template-css-once.php';
    $enqueue='elementor/frontend/builder_content/before_enqueue_css_file';
    $print='elementor/frontend/builder_content/before_print_css';
    require $source; apply_filters('wp',null);
    foreach ([190,262,468,1069,1659,1671,2271,2277,2485,2518,2540] as $id) {
        $file=css($id); same(apply_filters($enqueue,$file),$file,'enqueue preserved');
        same(apply_filters($print,true),true,'first '.$id);
        apply_filters($enqueue,css($id)); same(apply_filters($print,true),false,'repeat '.$id);
    }
    apply_filters($enqueue,css(9999)); same(apply_filters($print,true),true,'unknown template');
    same(apply_filters($print,true),true,'unpaired call');
    // Existing price pilot remains independent.
    apply_filters($enqueue,css(2913)); same(apply_filters($print,true),true,'price pilot not duplicated');
    foreach (['host'=>'yaclinic.ru','admin'=>true,'ajax'=>true,'preview'=>true,
        'customize'=>true,'editor'=>true,'elementor_preview'=>true] as $key=>$value) {
        $hooks=[]; $context=[$key=>$value]; require $source; apply_filters('wp',null);
        for($i=0;$i<2;$i++) { apply_filters($enqueue,css(468)); same(apply_filters($print,true),true,'guard '.$key); }
    }
    echo 'TEMPLATE_CSS_'.$checks."_CHECKS_OK\n";
}
