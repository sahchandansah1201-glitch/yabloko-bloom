<?php
/**
 * Isolated synthetic requests; no WordPress, network, or production cache writes.
 * Each child retains its private temp directory as test evidence; no cleanup deletes.
 * Run: YC_CACHE_SOURCE=/absolute/public-cache.php php test-early-cache.php
 * PHP 8+ and proc_open are required. The before source must fail the early HIT test.
 */
namespace Yaclinic\Performance {
    // PHP CLI does not expose response headers. Intercept only this namespace's I/O.
    function header($value,$replace=true,$status=0) {
        $name=strtolower(strtok($value,':'));
        if ($replace) $GLOBALS['yc_test']['headers'][$name]=[];
        $GLOBALS['yc_test']['headers'][$name][]=$value;
        if ($status) $GLOBALS['yc_test']['status']=$status;
    }
    function headers_list() {
        $headers=[];
        foreach ($GLOBALS['yc_test']['headers'] as $values) $headers=array_merge($headers,$values);
        return $headers;
    }
    function headers_sent(&$filename=null,&$line=null) { return false; }
    function time() { return $GLOBALS['yc_test']['now']; }
    function http_response_code($status=null) {
        if ($status!==null) $GLOBALS['yc_test']['status']=$status;
        return $GLOBALS['yc_test']['status'];
    }
}

namespace {
    const YC_TEST_BODY='<!DOCTYPE html><html><body>SYNTHETIC PUBLIC PRICE 13700</body></html>';
    const YC_TEST_FALLTHROUGH='NORMAL_WORDPRESS_CONTINUES';

    function add_action($name,$callback,$priority=10,$accepted_args=1) {
        $GLOBALS['yc_test']['hooks'][$name][]=[$priority,$callback,$accepted_args];
    }
    function do_action($name,...$args) {
        $callbacks=$GLOBALS['yc_test']['hooks'][$name]??[];
        usort($callbacks,static function ($a,$b) { return $a[0]<=>$b[0]; });
        foreach ($callbacks as $entry) call_user_func_array($entry[1],array_slice($args,0,$entry[2]));
    }
    function get_option($name,$default=null) { return $GLOBALS['yc_test']['options'][$name]??$default; }
    function update_option($name,$value,...$unused) { $GLOBALS['yc_test']['options'][$name]=$value;return true; }
    function home_url() { return $GLOBALS['yc_test']['home']; }
    function wp_parse_url($url,$part=-1) { return parse_url($url,$part); }
    function wp_nonce_tick() { return $GLOBALS['yc_test']['nonce_tick']; }
    function wp_is_mobile() { return $GLOBALS['yc_test']['mobile']; }
    function is_user_logged_in() { return $GLOBALS['yc_test']['logged_in']; }
    function is_admin() { return $GLOBALS['yc_test']['admin']; }
    function wp_doing_ajax() { return $GLOBALS['yc_test']['ajax']; }
    // A plugins_loaded HIT must not depend on the later main-query conditionals.
    function yc_test_late_query($name) { throw new \RuntimeException('Early query conditional: '.$name); }
    function is_preview() { return yc_test_late_query(__FUNCTION__); }
    function is_customize_preview() { return yc_test_late_query(__FUNCTION__); }
    function is_404() { return yc_test_late_query(__FUNCTION__); }
    function is_search() { return yc_test_late_query(__FUNCTION__); }
    function is_feed() { return yc_test_late_query(__FUNCTION__); }
    function is_singular() { return yc_test_late_query(__FUNCTION__); }
    function is_post_type_archive($types) { return yc_test_late_query(__FUNCTION__); }
    function post_password_required() { return yc_test_late_query(__FUNCTION__); }

    function yc_test_child(array $case) {
        $source=getenv('YC_CACHE_SOURCE')?:__DIR__.'/public-cache.php';
        if (!is_file($source)) throw new \RuntimeException('YC_CACHE_SOURCE is not a local file');
        $dir=sys_get_temp_dir().'/yc-early-cache-test-'.bin2hex(random_bytes(8));
        if (!mkdir($dir,0700)) throw new \RuntimeException('Cannot create isolated test directory');
        $sourceFile=$dir.'/cache-source.php';
        $server=array_replace([
            'HTTP_HOST'=>'yaclinic.ru','REQUEST_METHOD'=>'GET','HTTPS'=>'on',
            'REQUEST_URI'=>'/price/','QUERY_STRING'=>'',
        ],$case['server']??[]);
        $mobile=$case['mobile']??false;
        $cacheFile=$dir.'/'.hash('sha256',$server['REQUEST_URI'].'|'.(int) ($case['seed_mobile']??$mobile)).'.html';
        $GLOBALS['yc_test']=[
            'hooks'=>[],'headers'=>[],'status'=>200,'now'=>1700000100,
            'options'=>['yc_public_html_generation'=>$case['generation']??'test-generation-v1'],
            'nonce_tick'=>$case['nonce_tick']??123,'home'=>$case['home']??'https://yaclinic.ru',
            'mobile'=>$mobile,'logged_in'=>$case['logged_in']??false,
            'admin'=>$case['admin']??false,'ajax'=>$case['ajax']??false,'fell_through'=>false,'fixture_dir'=>$dir,
        ];
        register_shutdown_function(static function () {
            $state=$GLOBALS['yc_test'];
            $state['hook_names']=array_keys($state['hooks']);
            $state['early_priorities']=[];
            foreach ($state['hooks']['plugins_loaded']??[] as $entry) {
                if (is_array($entry[1]) && ($entry[1][1]??'')==='serve_early') $state['early_priorities'][]=$entry[0];
            }
            unset($state['hooks']);
            $state['last_error']=error_get_last();
            fwrite(STDERR,'YC_TEST_STATE '.json_encode($state,JSON_UNESCAPED_SLASHES)."\n");
        });
        foreach ($case['headers']??[] as $header) \Yaclinic\Performance\header($header,false);
        $code=file_get_contents($source);
        $code=preg_replace('~private\s+const\s+DIR\s*=\s*[\x27\x22][^\x27\x22]+[\x27\x22]\s*;~',
            'private const DIR = '.var_export($dir,true).';',$code,1,$replacements);
        if ($replacements!==1) throw new \RuntimeException('Expected exactly one literal cache DIR');
        if (file_put_contents($sourceFile,$code)===false) throw new \RuntimeException('Cannot write isolated source');
        $sourceMtime=$case['source_mtime']??1700000000;
        touch($sourceFile,$sourceMtime);
        clearstatcache(true,$sourceFile);
        if (($case['fixture']??'fresh')!=='missing') {
            $seedGeneration=hash('sha256',($case['seed_generation']??'test-generation-v1').'|'.
                ($case['seed_nonce_tick']??123).'|'.($case['seed_source_mtime']??1700000000));
            $meta=['generation'=>$seedGeneration,'expires'=>$case['expires']??1700000200];
            if (array_key_exists('meta_headers',$case)) $meta['headers']=$case['meta_headers'];
            $fixture=$case['raw_cache']??json_encode($meta)."\n".($case['cache_body']??YC_TEST_BODY);
            if (file_put_contents($cacheFile,$fixture)===false) throw new \RuntimeException('Cannot write synthetic cache');
        }
        $_SERVER=$server;$_COOKIE=$case['cookies']??[];$_GET=[];$_POST=[];
        foreach ($case['constants']??[] as $name=>$value) define($name,$value);
        require $sourceFile;
        $class=\Yaclinic\Performance\Public_HTML_Cache::class;
        $GLOBALS['yc_test']['ttl']=(new \ReflectionClass($class))->getConstant('TTL');
        if (($case['mode']??'early')==='inspect') {
            $htmlHeaders=['Content-Type: text/html; charset=UTF-8'];
            $GLOBALS['yc_test']['store_checks']=[
                'public HTML'=>$class::can_store(YC_TEST_BODY,$htmlHeaders,200),
                'missing Content-Type'=>$class::can_store(YC_TEST_BODY,[],200),
                'JSON Content-Type'=>$class::can_store(YC_TEST_BODY,['Content-Type: application/json'],200),
                'server error'=>$class::can_store(YC_TEST_BODY,$htmlHeaders,500),
                'partial HTML'=>$class::can_store('<html><body>partial',$htmlHeaders,200),
                'admin HTML'=>$class::can_store('<html><body><div id="wpadminbar"></div></body></html>',$htmlHeaders,200),
            ];
            foreach (['Set-Cookie: synthetic=value','Cache-Control: private','Cache-Control: no-store',
                'Location: /synthetic/','Vary: Cookie','Vary: Authorization','Vary: User-Agent'] as $header) {
                $GLOBALS['yc_test']['store_checks'][$header]=$class::can_store(YC_TEST_BODY,array_merge($htmlHeaders,[$header]),200);
            }
            $GLOBALS['yc_test']['option_checks']=[];
            foreach (['yc_public_html_generation','cron','_transient_synthetic','_site_transient_synthetic',
                'elementor_log','blogname','elementor_active_kit','clinic_price_settings'] as $name) {
                $GLOBALS['yc_test']['option_checks'][$name]=$class::option_affects_content($name);
            }
        } elseif (($case['mode']??'early')==='invalidate') {
            $class::invalidate('synthetic write');
            $first=$GLOBALS['yc_test']['options']['yc_public_html_generation'];
            $class::invalidate('second synthetic write');
            $GLOBALS['yc_test']['coalesced']=$first===$GLOBALS['yc_test']['options']['yc_public_html_generation'];
            do_action('shutdown');
            $GLOBALS['yc_test']['invalidated_twice']=$first!==$GLOBALS['yc_test']['options']['yc_public_html_generation'];
            $GLOBALS['yc_test']['generation_changed']=$first!=='test-generation-v1';
        } elseif (($case['mode']??'early')!=='inspect') {
            $GLOBALS['yc_test']['buffer_before']=ob_get_level();
            do_action('plugins_loaded');
            $GLOBALS['yc_test']['buffer_after']=ob_get_level();
        }
        $GLOBALS['yc_test']['fell_through']=true;
        echo YC_TEST_FALLTHROUGH;
    }

    function yc_test_request(array $case) {
        $command=[PHP_BINARY,__FILE__,'--child',base64_encode(json_encode($case))];
        $process=proc_open($command,[0=>['pipe','r'],1=>['pipe','w'],2=>['pipe','w']],$pipes);
        if (!is_resource($process)) throw new \RuntimeException('Cannot start isolated PHP request');
        fclose($pipes[0]);
        $body=stream_get_contents($pipes[1]);fclose($pipes[1]);
        $stderr=stream_get_contents($pipes[2]);fclose($pipes[2]);
        $status=proc_close($process);
        if (!preg_match('/^YC_TEST_STATE (.+)$/m',$stderr,$match)) {
            throw new \RuntimeException('Missing child state: '.$stderr);
        }
        $state=json_decode($match[1],true);
        $extra=trim(str_replace($match[0],'',$stderr));
        if ($status!==0 || $extra!=='' || !is_array($state) || $state['last_error']!==null) {
            throw new \RuntimeException('Child error: '.json_encode([$status,$extra,$state['last_error']??null]));
        }
        return ['body'=>$body,'state'=>$state];
    }

    function yc_test_expect($actual,$expected,$label) {
        $GLOBALS['yc_test_checks']++;
        if ($actual!==$expected) throw new \RuntimeException($label.': expected '.json_encode($expected).', got '.json_encode($actual));
    }

    function yc_test_main() {
        $GLOBALS['yc_test_checks']=0;$failures=[];$scenarios=0;
        $cases=[
            'fresh anonymous GET before any HTML Content-Type'=>['hit'=>true],
            'fresh mobile GET uses its mobile cache'=>['hit'=>true,'mobile'=>true],
            'existing public HTML Content-Type'=>['hit'=>true,'headers'=>['Content-Type: text/html; charset=UTF-8']],
            'public no-cache header permits fresh HIT'=>['hit'=>true,'headers'=>['Cache-Control: no-cache, max-age=0']],
            'public metadata response headers preserved'=>[
                'hit'=>true,
                'meta_headers'=>[
                    'Link: <https://yaclinic.ru/wp-json/>; rel="https://api.w.org/"',
                    'X-Robots-Tag: noindex, follow',
                    'Content-Language: ru-RU',
                ],
                'expected_headers'=>[
                    'link'=>'Link: <https://yaclinic.ru/wp-json/>; rel="https://api.w.org/"',
                    'x-robots-tag'=>'X-Robots-Tag: noindex, follow',
                    'content-language'=>'Content-Language: ru-RU',
                ],
            ],
            'unsafe and arbitrary metadata headers ignored'=>[
                'hit'=>true,
                'meta_headers'=>[
                    'Set-Cookie: synthetic=value','Location: /synthetic/','Cache-Control: private',
                    'Content-Type: application/json','X-Arbitrary: synthetic',
                    "Link: <https://yaclinic.ru/wp-json/>;\r\nSet-Cookie: synthetic=value",
                    "X-Robots-Tag: noindex\nLocation: /synthetic/",
                    "Content-Language: ru-RU\rX-Arbitrary: synthetic",
                ],
                'absent_headers'=>['set-cookie','location','x-arbitrary','link','x-robots-tag','content-language'],
            ],
            'existing JSON Content-Type bypass'=>['headers'=>['Content-Type: application/json']],
            'missing cache falls through'=>['fixture'=>'missing'],
            'expiry boundary falls through'=>['expires'=>1700000100],
            'expired cache falls through'=>['expires'=>1700000099],
            'changed content generation falls through'=>['generation'=>'test-generation-v2'],
            'changed nonce tick falls through'=>['nonce_tick'=>124],
            'changed source mtime falls through'=>['source_mtime'=>1700000001],
            'wrong device cache falls through'=>['mobile'=>true,'seed_mobile'=>false],
            'invalid JSON metadata falls through'=>['raw_cache'=>"not-json\n".YC_TEST_BODY],
            'missing metadata newline falls through'=>['raw_cache'=>YC_TEST_BODY],
            'missing metadata fields fall through'=>['raw_cache'=>"{}\n".YC_TEST_BODY],
            'empty cached body falls through'=>['cache_body'=>''],
            'partial cached HTML falls through'=>['cache_body'=>'<html><body>partial'],
            'cached admin toolbar falls through'=>['cache_body'=>'<html><body><div id="wpadminbar"></div></body></html>'],
            'staging host bypass'=>['server'=>['HTTP_HOST'=>'new.yaclinic.ru']],
            'www host bypass'=>['server'=>['HTTP_HOST'=>'www.yaclinic.ru']],
            'host port bypass'=>['server'=>['HTTP_HOST'=>'yaclinic.ru:443']],
            'HTTP bypass'=>['server'=>['HTTPS'=>'off']],
            'POST bypass'=>['server'=>['REQUEST_METHOD'=>'POST']],
            'HEAD bypass'=>['server'=>['REQUEST_METHOD'=>'HEAD']],
            'query bypass'=>['server'=>['REQUEST_URI'=>'/price/?utm_source=test','QUERY_STRING'=>'utm_source=test']],
            'preview query bypass'=>['server'=>['REQUEST_URI'=>'/price/?preview=true','QUERY_STRING'=>'preview=true']],
            'admin path bypass'=>['server'=>['REQUEST_URI'=>'/wp-admin/']],
            'login path bypass'=>['server'=>['REQUEST_URI'=>'/wp-login.php']],
            'REST path bypass'=>['server'=>['REQUEST_URI'=>'/wp-json/sqns-integration/v1/slots']],
            'feed bypass'=>['server'=>['REQUEST_URI'=>'/feed/']],
            'encoded path bypass'=>['server'=>['REQUEST_URI'=>'/price/%2f']],
            'double slash bypass'=>['server'=>['REQUEST_URI'=>'//price/']],
            'logged-in cookie bypass'=>['cookies'=>['wordpress_logged_in_test'=>'synthetic']],
            'tracking cookie bypass'=>['cookies'=>['analytics_test'=>'synthetic']],
            'empty cookie value bypass'=>['cookies'=>['any_cookie'=>'']],
            'Authorization bypass'=>['server'=>['HTTP_AUTHORIZATION'=>'Bearer synthetic']],
            'redirected Authorization bypass'=>['server'=>['REDIRECT_HTTP_AUTHORIZATION'=>'Bearer synthetic']],
            'WP nonce bypass'=>['server'=>['HTTP_X_WP_NONCE'=>'synthetic']],
            'AJAX header bypass'=>['server'=>['HTTP_X_REQUESTED_WITH'=>'XMLHttpRequest']],
            'range bypass'=>['server'=>['HTTP_RANGE'=>'bytes=0-10']],
            'logged-in WordPress user bypass'=>['logged_in'=>true],
            'admin context bypass'=>['admin'=>true],
            'AJAX context bypass'=>['ajax'=>true],
            'REST context bypass'=>['constants'=>['REST_REQUEST'=>true]],
            'DONOTCACHEPAGE bypass'=>['constants'=>['DONOTCACHEPAGE'=>true]],
            'different configured home host bypass'=>['home'=>'https://new.yaclinic.ru'],
            'Set-Cookie response bypass'=>['headers'=>['Set-Cookie: synthetic=value']],
            'private response bypass'=>['headers'=>['Cache-Control: private']],
            'no-store response bypass'=>['headers'=>['Cache-Control: no-store']],
            'redirect response bypass'=>['headers'=>['Location: /synthetic/']],
            'Vary Cookie bypass'=>['headers'=>['Vary: Accept-Encoding, Cookie']],
            'Vary Authorization bypass'=>['headers'=>['Vary: Authorization']],
            'Vary User-Agent bypass'=>['headers'=>['Vary: User-Agent']],
        ];
        foreach ($cases as $name=>$case) {
            $scenarios++;
            try {
                $result=yc_test_request($case);$state=$result['state'];
                $hit=$case['hit']??false;
                yc_test_expect($result['body'],$hit?YC_TEST_BODY:YC_TEST_FALLTHROUGH,$name.' body');
                yc_test_expect($state['fell_through'],!$hit,$name.' exit/fallthrough');
                if ($hit) {
                    yc_test_expect($state['headers']['x-yc-public-cache']??[],['X-YC-Public-Cache: HIT'],$name.' HIT header');
                    yc_test_expect($state['headers']['content-type']??[],['Content-Type: text/html; charset=UTF-8'],$name.' HTML header');
                    yc_test_expect($state['headers']['cache-control']??[],['Cache-Control: no-cache, must-revalidate, max-age=0'],$name.' browser revalidation');
                } else {
                    yc_test_expect(isset($state['headers']['x-yc-public-cache']),false,$name.' no early cache header');
                    yc_test_expect($state['buffer_after'],$state['buffer_before'],$name.' no early store buffer');
                }
                foreach ($case['expected_headers']??[] as $header=>$value) {
                    yc_test_expect($state['headers'][$header]??[],[$value],$name.' preserved '.$header);
                }
                foreach ($case['absent_headers']??[] as $header) {
                    yc_test_expect(isset($state['headers'][$header]),false,$name.' rejected '.$header);
                }
            } catch (\Throwable $error) { $failures[]=$error->getMessage(); }
        }
        $scenarios++;
        try {
            $result=yc_test_request(['mode'=>'inspect']);$state=$result['state'];
            yc_test_expect($state['early_priorities'],[PHP_INT_MAX],'early hook after normal plugins_loaded');
            yc_test_expect($state['ttl'],120,'existing 120-second TTL');
            foreach ($state['store_checks'] as $name=>$actual) {
                yc_test_expect($actual,$name==='public HTML','late store guard '.$name);
            }
            foreach ($state['option_checks'] as $name=>$actual) {
                yc_test_expect($actual,in_array($name,['blogname','elementor_active_kit','clinic_price_settings'],true),'option invalidation '.$name);
            }
            foreach (['template_redirect','save_post','deleted_post','trashed_post','set_object_terms','created_term',
                'edited_term','delete_term','code_snippets/update_snippet','code_snippets/activate_snippet',
                'code_snippets/deactivate_snippet','added_post_meta','updated_post_meta','deleted_post_meta',
                'added_option','updated_option','deleted_option'] as $hook) {
                yc_test_expect(in_array($hook,$state['hook_names'],true),true,'preserved hook '.$hook);
            }
        } catch (\Throwable $error) { $failures[]=$error->getMessage(); }
        $scenarios++;
        try {
            $result=yc_test_request(['mode'=>'invalidate']);$state=$result['state'];
            yc_test_expect($state['generation_changed'],true,'write changes content generation');
            yc_test_expect($state['coalesced'],true,'repeated writes coalesce');
            yc_test_expect($state['invalidated_twice'],true,'shutdown invalidates completed write batch');
        } catch (\Throwable $error) { $failures[]=$error->getMessage(); }
        if ($failures) {
            foreach ($failures as $failure) fwrite(STDERR,'FAIL '.$failure."\n");
            fwrite(STDERR,'EARLY_CACHE_FAILED '.count($failures).'/'.$scenarios." scenarios\n");
            return 1;
        }
        echo 'EARLY_CACHE_'.$scenarios.'_SCENARIOS_'.$GLOBALS['yc_test_checks']."_CHECKS_OK\n";
        return 0;
    }

    if (($argv[1]??'')==='--child') {
        try {
            $case=json_decode(base64_decode($argv[2]??'',true),true);
            if (!is_array($case)) throw new \RuntimeException('Invalid child scenario');
            yc_test_child($case);
        } catch (\Throwable $error) {
            fwrite(STDERR,'YC_TEST_ERROR '.$error->getMessage()."\n");exit(1);
        }
    } else {
        exit(yc_test_main());
    }
}
