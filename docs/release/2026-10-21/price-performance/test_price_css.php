<?php
// Standalone request/hook contracts. No WordPress or database writes.
namespace Elementor {
    class Plugin { public static $instance; }
}
namespace {
    $context = [];
    $hooks = [];
    function add_filter($hook, $fn, $priority = 10) { global $hooks; $hooks[$hook][] = $fn; }
    function add_action($hook, $fn, $priority = 10) { add_filter($hook, $fn, $priority); }
    function apply_filters($hook, $value) {
        global $hooks;
        foreach ($hooks[$hook] ?? [] as $fn) { $value = $fn($value); }
        return $value;
    }
    function do_action($hook) { apply_filters($hook, null); }
    function is_admin() { global $context; return $context['admin'] ?? false; }
    function wp_doing_ajax() { global $context; return $context['ajax'] ?? false; }
    function is_preview() { global $context; return $context['preview'] ?? false; }
    function is_customize_preview() { global $context; return $context['customize'] ?? false; }
    function is_page($id) { global $context; return ($context['page'] ?? 2903) === $id; }
    function home_url() { global $context; return 'https://'.($context['host'] ?? 'new.yaclinic.ru'); }
    function wp_parse_url($url, $part) { return parse_url($url, $part); }
    $mode = new class {
        public function is_edit_mode() { global $context; return $context['editor'] ?? false; }
        public function is_preview_mode() { global $context; return $context['elementor_preview'] ?? false; }
    };
    $documents = new class {
        public function get_current() {
            return new class {
                public function get_main_id() { global $context; return $context['template'] ?? 2913; }
            };
        }
    };
    \Elementor\Plugin::$instance = (object)['editor'=>$mode,'preview'=>$mode,'documents'=>$documents];
    function css_file($id) {
        return new class($id) {
            private $id;
            public function __construct($id) { $this->id = $id; }
            public function get_post_id() { return $this->id; }
        };
    }
    $enqueue = 'elementor/frontend/builder_content/before_enqueue_css_file';
    $print = 'elementor/frontend/builder_content/before_print_css';
    $checks = 0;
    function expect_same($actual, $expected, $name) {
        global $checks;
        if ($actual !== $expected) { throw new \RuntimeException('FAIL: '.$name); }
        $checks++;
    }
    // UE changes even the main query and Elementor current document to each service.
    require __DIR__.'/price-css-once.php';
    do_action('wp');
    $context = ['page'=>770,'template'=>770];
    $file = css_file(2913);
    expect_same(apply_filters($enqueue,$file),$file,'CSS enqueue object preserved');
    expect_same(apply_filters($print,true),true,'first print kept in UE service context');
    $context = ['page'=>771,'template'=>771];
    apply_filters($enqueue,css_file(2913));
    expect_same(apply_filters($print,true),false,'second print skipped despite UE query switch');
    apply_filters($enqueue,css_file(468));
    expect_same(apply_filters($print,true),true,'other template kept after target');
    expect_same(apply_filters($print,true),true,'missing enqueue fails open');
    apply_filters($enqueue,css_file(2913));
    expect_same(apply_filters($print,true),false,'target still skipped after unrelated template');

    // Each include registers closures for a new simulated request.
    foreach (['host'=>'yaclinic.ru','admin'=>true,'ajax'=>true,'preview'=>true,'customize'=>true,
        'editor'=>true,'elementor_preview'=>true,'page'=>1789] as $key=>$value) {
        $hooks = [];
        $context = [$key=>$value];
        require __DIR__.'/price-css-once.php';
        do_action('wp');
        for ($i=0;$i<2;$i++) {
            apply_filters($enqueue,css_file(2913));
            expect_same(apply_filters($print,true),true,$key.' request untouched '.$i);
        }
    }
    $hooks = [];
    $context = [];
    require __DIR__.'/price-css-once.php';
    do_action('wp');
    apply_filters($enqueue,css_file(2913));
    expect_same(apply_filters($print,false),false,'false input preserved');
    apply_filters($enqueue,css_file(2913));
    expect_same(apply_filters($print,true),true,'false input did not consume first print');
    apply_filters($enqueue,css_file(2913));
    apply_filters($enqueue,css_file(468));
    expect_same(apply_filters($print,true),true,'nested unrelated template kept');
    expect_same(apply_filters($print,true),true,'unpaired outer event fails open');
    echo 'PRICE_CSS_'.$checks."_CHECKS_OK\n";
}
