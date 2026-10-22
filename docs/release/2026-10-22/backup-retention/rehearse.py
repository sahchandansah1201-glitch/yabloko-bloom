"""Restore the approved private backup locally, without production access.

Only the two containers created here are stopped. SQL, credentials and HTML stay
in ClinicBackups, never in the source checkout or the public evidence report.
"""
import gzip
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import secrets
import shutil
import subprocess
import sys
import tarfile
import time
from urllib.parse import urlsplit

BASE = Path.home() / 'ClinicBackups/yaclinic/production-20261022T181048Z'
SOURCE = Path(__file__).parent
ARCHIVE_SHA = 'd520772541996078183324cff31c0dfd40cc8be8f3ec03c276d3b87a3ceaf12e'
DB = 'yaclinic-restore-db-20261022'
PHP = 'yaclinic-restore-php-20261022'
SOCKET = 'yaclinic-restore-socket-20261022'
DATA = 'yaclinic-restore-data-20261022'
DOCKER = ['docker', '--context', 'desktop-linux']
created = []
result = {'archive_sha256': ARCHIVE_SHA, 'production_changed': False}
assert sys.argv[1:] in ([], ['--resume'])
resume = sys.argv[1:] == ['--resume']
os.umask(0o077)


def run(args, **kwargs):
    completed = subprocess.run(args, capture_output=True, **kwargs)
    if completed.returncode:
        (BASE / 'last-command-private.stderr').write_bytes(completed.stderr)
        raise RuntimeError('Command failed; diagnostic saved privately: ' + args[0])
    return completed.stdout


def sql(statement):
    return run(DOCKER + ['exec', '-i', DB, 'sh', '-c',
        'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" exec mysql --batch --skip-column-names --binary-mode=1 -uroot "$@"',
        'sh', 'restorecheck'], input=statement.encode()).decode().strip()


def dump_inserts():
    process = subprocess.Popen(DOCKER + ['exec', DB, 'sh', '-c',
        'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" exec mysqldump -uroot --single-transaction --quick --hex-blob --no-tablespaces --skip-add-locks --skip-comments restorecheck'],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    digest = hashlib.sha256()
    count = 0
    for line in process.stdout:
        if line.startswith(b'INSERT INTO '):
            digest.update(line)
            count += 1
    error = process.stderr.read()
    if process.wait():
        (BASE / 'dump-private.stderr').write_bytes(error)
        raise RuntimeError('Isolated dump failed')
    return {'sha256': digest.hexdigest(), 'statements': count}


def request(path='/', method='GET', host='yaclinic.ru'):
    output = run(DOCKER + ['exec', PHP, 'curl', '-sS', '--max-time', '60',
        '--noproxy', '*', '-X', method, '-H', 'Host: ' + host,
        '-w', '\n%{http_code}', 'http://127.0.0.1:8088' + path])
    body, status = output.rsplit(b'\n', 1)
    return body, int(status)


try:
    archive = BASE / 'site.tar.gz'
    with archive.open('rb') as stream:
        assert hashlib.file_digest(stream, 'sha256').hexdigest() == ARCHIVE_SHA
    destination = BASE / 'restored'
    hashes = {}
    if resume:
        previous = json.loads((BASE / 'restore-result.json').read_text())
        assert previous['archive_sha256'] == ARCHIVE_SHA and previous['containers_stopped']
        manifest = json.loads((destination / 'manifest.json').read_text())
        for name in manifest['files']:
            with (destination / name).open('rb') as stream:
                hashes[name] = hashlib.file_digest(stream, 'sha256').hexdigest()
        hashes['manifest.json'] = ''
    else:
        assert not destination.exists(), 'Inspect an existing rehearsal before rerunning.'
        assert shutil.disk_usage(BASE).free > 4_000_000_000
        destination.mkdir(mode=0o700)
        with tarfile.open(archive, mode='r|gz') as saved:
            for member in saved:
                parts = PurePosixPath(member.name)
                assert not parts.is_absolute() and '..' not in parts.parts
                assert member.isfile() and not member.issym() and not member.islnk()
                assert parts.parts[0] in ('wordpress', 'config', 'tls', 'manifest.json', 'database.sql.gz')
                target = destination.joinpath(*parts.parts)
                target.parent.mkdir(parents=True, exist_ok=True)
                with saved.extractfile(member) as incoming, target.open('xb') as outgoing:
                    digest = hashlib.sha256()
                    while block := incoming.read(1024 * 1024):
                        digest.update(block)
                        outgoing.write(block)
                os.chmod(target, member.mode & 0o777)
                hashes[member.name] = digest.hexdigest()
    manifest = json.loads((destination / 'manifest.json').read_text())
    assert set(manifest['files']) == set(hashes) - {'manifest.json'}
    assert all(hashes[name] == checksum for name, checksum in manifest['files'].items())
    result['verified_file_count'] = len(manifest['files'])
    print(json.dumps({'stage': 'files_restored', 'verified_files': result['verified_file_count']}), flush=True)
    for parent, directories, files in os.walk(destination / 'wordpress'):
        os.chmod(parent, 0o755)
    result['source_config_sha256'] = hashes['wordpress/wp-config.php']
    original_inserts = hashlib.sha256()
    statements = tables = 0
    with gzip.open(destination / 'database.sql.gz', 'rb') as dump:
        for line in dump:
            upper = line.lstrip().upper()
            assert not upper.startswith((b'USE ', b'CREATE DATABASE ', b'DROP DATABASE ', b'CREATE USER ', b'GRANT ', b'SET GLOBAL ', b'SOURCE ', b'\\.'))
            if line.startswith(b'INSERT INTO '):
                original_inserts.update(line)
                statements += 1
            if line.startswith(b'CREATE TABLE '):
                tables += 1
    result['source_inserts'] = {'sha256': original_inserts.hexdigest(), 'statements': statements}
    result['source_table_count'] = tables
    assert tables > 0 and statements > 0
    for name in ((PHP,) if resume else (DB, PHP)):
        assert not subprocess.run(DOCKER + ['container', 'inspect', name], capture_output=True).returncode == 0
    for name in (() if resume else (SOCKET, DATA)):
        assert not subprocess.run(DOCKER + ['volume', 'inspect', name], capture_output=True).returncode == 0
    ro_password = secrets.token_hex(24)
    if resume:
        info = json.loads(run(DOCKER + ['inspect', DB]))[0]
        assert not info['State']['Running'] and info['HostConfig']['NetworkMode'] == 'none'
        assert info['Config']['Image'] == 'mysql:8.0.46'
        assert {mount['Name'] for mount in info['Mounts']} == {SOCKET, DATA}
        run(DOCKER + ['start', DB])
    else:
        password = secrets.token_hex(24)
        (BASE / 'mysql.env').write_text('MYSQL_ROOT_PASSWORD=' + password + '\nMYSQL_DATABASE=restorecheck\n')
        run(DOCKER + ['run', '-d', '--name', DB, '--network', 'none', '--memory', '768m',
            '--cpus', '1', '--pids-limit', '192', '--env-file', str(BASE / 'mysql.env'),
            '--mount', 'type=volume,source=' + DATA + ',target=/var/lib/mysql',
            '--mount', 'type=volume,source=' + SOCKET + ',target=/var/run/mysqld',
            'mysql:8.0.46', '--skip-log-bin', '--event-scheduler=OFF', '--local-infile=0',
            '--innodb-buffer-pool-size=64M', '--performance-schema=OFF', '--mysqlx=0', '--max-connections=15'])
    created.append(DB)
    for attempt in range(100):
        try:
            if sql('SELECT @@skip_networking;') == '0':
                break
        except RuntimeError:
            pass
        time.sleep(1)
    else:
        raise RuntimeError('Isolated MySQL did not become ready')
    if not resume:
        with gzip.open(destination / 'database.sql.gz', 'rb') as dump:
            process = subprocess.Popen(DOCKER + ['exec', '-i', DB, 'sh', '-c',
                'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" exec mysql --binary-mode=1 --local-infile=0 -uroot restorecheck'],
                stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
            shutil.copyfileobj(dump, process.stdin)
            process.stdin.close()
            error = process.stderr.read()
            (BASE / 'import-private.stderr').write_bytes(error)
            assert process.wait() == 0, 'Isolated database import failed'
    assert int(sql("SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA='restorecheck';")) == tables
    result['restored_inserts_before'] = dump_inserts()
    assert result['restored_inserts_before'] == result['source_inserts'], 'Restored INSERTs differ from source dump'
    sql("CREATE USER IF NOT EXISTS 'restore_readonly'@'localhost' IDENTIFIED BY '" + ro_password + "'; ALTER USER 'restore_readonly'@'localhost' IDENTIFIED BY '" + ro_password + "'; GRANT SELECT ON restorecheck.* TO 'restore_readonly'@'localhost';")
    table_names = sql("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA='restorecheck' ORDER BY TABLE_NAME;").splitlines()
    assert all(re.fullmatch(r'wp_[a-z0-9_]+', name) for name in table_names)
    result['mysqlcheck'] = sum(line.endswith('\tOK') for line in sql('CHECK TABLE ' + ','.join('`' + name + '`' for name in table_names) + ';').splitlines())
    assert result['mysqlcheck'] == tables
    print(json.dumps({'stage': 'database_restored', 'tables_checked': tables, 'insert_hash_match': True}), flush=True)
    control = BASE / 'control'
    control.mkdir(mode=0o755)
    for name in ('router.php', 'check.php'):
        shutil.copyfile(SOURCE / name, control / name)
        (control / name).chmod(0o644)
    settings = "<?php\n" + ''.join("define('" + key + "', '" + value + "');\n" for key, value in (
        ('DB_NAME', 'restorecheck'), ('DB_USER', 'restore_readonly'), ('DB_PASSWORD', ro_password),
        ('DB_HOST', 'localhost:/var/run/mysqld/mysqld.sock'), ('DB_CHARSET', 'utf8mb4'), ('DB_COLLATE', '')))
    (control / 'db-settings.php').write_text(settings)
    (control / 'db-settings.php').chmod(0o644)
    config = """<?php
// ISOLATED_RESTORE_CONFIG: original configuration is not executed.
require '/control/db-settings.php';
$table_prefix = 'wp_';
define('DISABLE_WP_CRON', true);
define('AUTOMATIC_UPDATER_DISABLED', true);
define('DISALLOW_FILE_MODS', true);
define('DISALLOW_FILE_EDIT', true);
define('WP_HTTP_BLOCK_EXTERNAL', true);
define('WP_CACHE', false);
define('WP_DEBUG', false);
define('WP_ENVIRONMENT_TYPE', 'local');
function wp_mail($to, $subject, $message, $headers = '', $attachments = []) { return false; }
define('ABSPATH', '/site/');
require_once ABSPATH . 'wp-settings.php';
"""
    (control / 'wp-config.php').write_text(config)
    (control / 'wp-config.php').chmod(0o644)
    run(DOCKER + ['run', '-d', '--name', PHP, '--network', 'none', '--read-only',
        '--user', '33:33', '--memory', '512m', '--cpus', '1', '--pids-limit', '64',
        '--cap-drop', 'ALL', '--security-opt', 'no-new-privileges', '--tmpfs', '/tmp:rw,noexec,nosuid,size=64m',
        '--mount', 'type=bind,source=' + str(destination / 'wordpress') + ',target=/site,readonly',
        '--mount', 'type=bind,source=' + str(control) + ',target=/control,readonly',
        '--mount', 'type=bind,source=' + str(control / 'wp-config.php') + ',target=/site/wp-config.php,readonly',
        '--mount', 'type=volume,source=' + SOCKET + ',target=/var/run/mysqld,readonly',
        '--entrypoint', 'php', 'wordpress:7.1.2-php8.3-apache',
        '-d', 'allow_url_fopen=0', '-d', 'disable_functions=exec,passthru,shell_exec,system,proc_open,popen,pcntl_exec,mail',
        '-d', 'display_errors=0', '-d', 'log_errors=1', '-d', 'error_log=/tmp/php-errors.log',
        '-d', 'memory_limit=384M', '-S', '127.0.0.1:8088', '-t', '/site', '/control/router.php'])
    created.append(PHP)
    time.sleep(2)
    for name in (DB, PHP):
        info = json.loads(run(DOCKER + ['inspect', name]))[0]
        assert info['HostConfig']['NetworkMode'] == 'none' and not info['HostConfig']['PortBindings']
    checks, status = request('/__isolation-check')
    result['isolation'] = json.loads(checks)
    assert status == 200 and all(result['isolation'].values())
    assert request('/')[1] == 503
    assert request('/', method='POST')[1] == 405
    assert request('/', host='other.invalid')[1] == 421
    assert request('/wp-admin/')[1] == 503
    (control / 'allow-wordpress').write_text('Isolation verified; GET and HEAD only.\n')
    (control / 'allow-wordpress').chmod(0o644)
    result['pages'] = []
    for index, path in enumerate(['/', '/services/', '/doctor/', '/doctor/viktoriya-gracheva/', '/price/', '/contacts/', '/dokumenty/', '/multilink/']):
        body, status = request(path)
        (BASE / ('page-' + str(index) + '.html')).write_bytes(body)
        row = {'path': path, 'status': status, 'bytes': len(body),
               'h1_count': len(re.findall(rb'<h1\b', body, re.I)),
               'fatal': bool(re.search(rb'Fatal error|Error establishing a database connection|There has been a critical error', body, re.I))}
        result['pages'].append(row)
        assert status == 200 and len(body) > 1000 and not row['fatal'], 'Restored page failed'
        print(json.dumps({'stage': 'page', **row}), flush=True)
    home = (BASE / 'page-0.html').read_text(errors='replace')
    result['assets'] = []
    for extension in ('css', 'webp'):
        links = re.findall(r'''(?:href|src)=["']([^"']+\.''' + extension + r'''(?:\?[^"']*)?)["']''', home, re.I)
        for link in links:
            parsed = urlsplit(link)
            if parsed.hostname in (None, 'yaclinic.ru') and parsed.path.startswith('/wp-content/'):
                body, status = request(parsed.path)
                assert status == 200 and body, 'Restored static asset failed'
                result['assets'].append({'type': extension, 'status': status, 'bytes': len(body)})
                break
    assert len(result['assets']) == 2
    result['php_fatal_count'] = int(run(DOCKER + ['exec', PHP, 'php', '-r',
        "echo is_file('/tmp/php-errors.log') ? preg_match_all('/PHP Fatal error/', file_get_contents('/tmp/php-errors.log')) : 0;"]))
    assert result['php_fatal_count'] == 0
    result['restored_inserts_after'] = dump_inserts()
    assert result['restored_inserts_after'] == result['source_inserts']
    with (destination / 'wordpress/wp-config.php').open('rb') as stream:
        assert hashlib.file_digest(stream, 'sha256').hexdigest() == result['source_config_sha256']
    result['status'] = 'PASS'
finally:
    for name in reversed(created):
        run(DOCKER + ['stop', '--time', '20', name])
    result['containers_stopped'] = all(json.loads(run(DOCKER + ['inspect', name]))[0]['State']['Running'] is False for name in created)
    (BASE / 'restore-result.json').write_text(json.dumps(result, indent=2))
    print(json.dumps(result), flush=True)
