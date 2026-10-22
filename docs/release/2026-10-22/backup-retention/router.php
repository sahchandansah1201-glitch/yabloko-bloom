<?php
header('X-Robots-Tag: noindex, nofollow');
if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'HEAD'], true)) {
    http_response_code(405);
    exit;
}
if (($_SERVER['HTTP_HOST'] ?? '') !== 'yaclinic.ru') {
    http_response_code(421);
    exit;
}
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($path === '/__isolation-check') {
    require '/control/check.php';
    exit;
}
if (!is_file('/control/allow-wordpress')) {
    http_response_code(503);
    exit;
}
$pages = ['/', '/services/', '/doctor/', '/doctor/viktoriya-gracheva/',
    '/price/', '/contacts/', '/dokumenty/', '/multilink/'];
if (!in_array($path, $pages, true)) {
    $file = realpath('/site' . rawurldecode($path));
    if ($file && str_starts_with($file, '/site/wp-content/') && is_file($file)
        && preg_match('/\.(css|js|png|jpg|jpeg|webp|svg|woff2?)$/i', $file)) {
        return false;
    }
    http_response_code(404);
    exit;
}
$_SERVER['HTTPS'] = 'on';
$_SERVER['SERVER_PORT'] = '443';
require '/site/index.php';
