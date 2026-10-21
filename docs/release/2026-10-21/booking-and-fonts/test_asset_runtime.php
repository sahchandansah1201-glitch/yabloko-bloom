<?php
function add_action(...$args) {}
$source=$argv[1]??__DIR__.'/asset-runtime.php';
require $source;
require $source; // Code Snippets validates and executes in one process.
$count=0;
foreach (['sqns-booking-widget','sqns-booking-trigger'] as $handle) {
    $before='<script id="'.$handle.'-js-before">window.test=1;</script>';
    $external='<script id="'.$handle.'-js" src="/existing.js"></script>';
    $after='<script id="'.$handle.'-js-after">window.testAfter=2;</script>';
    if (yc_perf_20261021_strip_external_script($before.$external.$after,$handle)!==$before.$after) throw new RuntimeException('Configuration lost');$count++;
    if (yc_perf_20261021_strip_external_script($external,'other')!==$external) throw new RuntimeException('Unrelated script lost');$count++;
}
echo 'ASSET_RUNTIME_'.$count."_CHECKS_OK\n";
