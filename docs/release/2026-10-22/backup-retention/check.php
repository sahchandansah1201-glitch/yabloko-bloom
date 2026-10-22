<?php
require '/control/db-settings.php';
header('Content-Type: application/json');
mysqli_report(MYSQLI_REPORT_OFF);
$db = new mysqli('localhost', DB_USER, DB_PASSWORD, DB_NAME, 0, '/var/run/mysqld/mysqld.sock');
$checks = [
    'non_root' => posix_geteuid() !== 0,
    'restored_database_readable' => !$db->connect_errno && $db->query('SELECT COUNT(*) FROM wp_options') !== false,
    'production_database_denied' => $db->query('SELECT option_id FROM clinic_prod_20261022.wp_options LIMIT 0') === false,
    'database_update_denied' => $db->query('UPDATE wp_options SET option_id=option_id WHERE 1=0') === false,
    'source_tree_read_only' => !is_writable('/site/wp-settings.php') && !is_writable('/site/wp-content'),
    'host_wordpress_absent' => !file_exists('/var/www/yaclinic-production/wp-config.php'),
    'host_root_absent' => !file_exists('/root/.my.cnf'),
    'mail_disabled' => !function_exists('mail'),
    'process_launch_disabled' => !function_exists('exec') && !function_exists('proc_open') && !function_exists('shell_exec'),
    'url_streams_disabled' => !filter_var(ini_get('allow_url_fopen'), FILTER_VALIDATE_BOOL),
    'safe_config_overlay' => str_contains(file_get_contents('/site/wp-config.php'), 'ISOLATED_RESTORE_CONFIG'),
];
$socket = @fsockopen('1.1.1.1', 443, $errno, $error, 1);
$checks['outbound_network_denied'] = $socket === false;
if ($socket) { fclose($socket); }
http_response_code(in_array(false, $checks, true) ? 500 : 200);
echo json_encode($checks);
