<?php
/** Plugin Name: Yaclinic staging public HTML cache */
namespace Yaclinic\Performance;

final class Public_HTML_Cache {
    private const DIR = '/var/cache/yaclinic-production-html';
    private const TTL = 120;

    public static function eligible(array $server,array $cookies): bool {
        $path=$server['REQUEST_URI']??'';
        return ($server['HTTP_HOST']??'')==='yaclinic.ru'
            && ($server['REQUEST_METHOD']??'')==='GET' && ($server['HTTPS']??'')==='on'
            && !$cookies && preg_match('~^/(?:[a-zA-Z0-9_-]+/)*$~D',$path)
            && !preg_match('~^/(?:wp-|feed/|xmlrpc|robots|sitemap)~',$path)
            && empty($server['HTTP_AUTHORIZATION']) && empty($server['REDIRECT_HTTP_AUTHORIZATION'])
            && empty($server['HTTP_X_WP_NONCE']) && empty($server['HTTP_X_REQUESTED_WITH'])
            && empty($server['HTTP_RANGE']);
    }

    public static function can_store(string $html,array $headers,int $status): bool {
        if ($status!==200 || !str_contains($html,'<body') || !str_contains($html,'</html>')
            || str_contains($html,'id="wpadminbar"')) return false;
        return self::public_headers($headers);
    }

    private static function public_headers(array $headers,bool $require_html=true): bool {
        $type=false;
        foreach ($headers as $header) {
            if (preg_match('~^(Set-Cookie|Location):|^Cache-Control:.*(private|no-store)|^Vary:.*(Cookie|Authorization|User-Agent)~i',$header)) return false;
            if (stripos($header,'Content-Type:')===0 && stripos($header,'Content-Type: text/html')!==0) return false;
            if (stripos($header,'Content-Type: text/html')===0) $type=true;
        }
        return $type || !$require_html;
    }

    public static function option_affects_content(string $name): bool {
        return !in_array($name,['yc_public_html_generation','cron','_elementor_pro_license_v2_data',
            '_elementor_design_system_sync_css_meta','elementor_log'],true)
            && !str_starts_with($name,'_transient_') && !str_starts_with($name,'_site_transient_');
    }

    public static function fresh(array $meta,string $generation,int $now): bool {
        return ($meta['generation']??null)===$generation && ($meta['expires']??0)>$now;
    }

    private static function generation(): string {
        return hash('sha256',(string) get_option('yc_public_html_generation','0').'|'.wp_nonce_tick().'|'.filemtime(__FILE__));
    }

    public static function invalidate($reason=''): void {
        static $changed=false;
        if ($changed || wp_parse_url(home_url(),PHP_URL_HOST)!=='yaclinic.ru') return;
        $changed=true;
        // Invalidate at the first write and again when a multi-row sync finishes.
        update_option('yc_public_html_generation',bin2hex(random_bytes(12)),false);
        add_action('shutdown',static function () {
            update_option('yc_public_html_generation',bin2hex(random_bytes(12)),false);
        },PHP_INT_MAX);
    }

    /** Only previously validated anonymous HTML may bypass init and the main query. */
    public static function serve_early(): void {
        if (!self::eligible($_SERVER,$_COOKIE) || is_user_logged_in() || is_admin() || wp_doing_ajax()
            || (defined('DONOTCACHEPAGE') && DONOTCACHEPAGE)
            || (defined('REST_REQUEST') && REST_REQUEST)
            || wp_parse_url(home_url(),PHP_URL_HOST)!=='yaclinic.ru'
            || !self::public_headers(headers_list(),false)) return;
        $file=self::DIR.'/'.hash('sha256',$_SERVER['REQUEST_URI'].'|'.(int) wp_is_mobile()).'.html';
        if (!is_file($file)) return;
        $cached=file_get_contents($file);$line=strpos($cached,"\n");
        $meta=$line!==false?json_decode(substr($cached,0,$line),true):null;
        if (!is_array($meta) || !self::fresh($meta,self::generation(),time())) return;
        $html=substr($cached,$line+1);
        if (!str_contains($html,'<body') || !str_contains($html,'</html>') || str_contains($html,'id="wpadminbar"')) return;
        header('Content-Type: text/html; charset=UTF-8');
        header('X-YC-Public-Cache: HIT');
        header('Cache-Control: no-cache, must-revalidate, max-age=0');
        foreach (($meta['headers']??[]) as $header) {
            if (is_string($header) && !str_contains($header,"\r") && !str_contains($header,"\n")
                && preg_match('~^(Link|X-Robots-Tag|Content-Language):~i',$header)) header($header,false);
        }
        echo $html;exit;
    }

    public static function serve(): void {
        if (!self::eligible($_SERVER,$_COOKIE) || is_user_logged_in() || is_admin()
            || wp_doing_ajax() || is_preview() || is_customize_preview() || is_404() || is_search()
            || is_feed() || (!is_singular() && !is_post_type_archive(['service','service_group','doctor','advice','clinic_document']))
            || (is_singular() && post_password_required())
            || (defined('DONOTCACHEPAGE') && DONOTCACHEPAGE)
            || (defined('REST_REQUEST') && REST_REQUEST)
            || wp_parse_url(home_url(),PHP_URL_HOST)!=='yaclinic.ru') return;
        if (!is_dir(self::DIR) || !is_writable(self::DIR) || !self::public_headers(headers_list())) return;
        $generation=self::generation();
        $file=self::DIR.'/'.hash('sha256',$_SERVER['REQUEST_URI'].'|'.(int) wp_is_mobile()).'.html';
        if (is_file($file)) {
            $cached=file_get_contents($file);$line=strpos($cached,"\n");
            $meta=$line!==false?json_decode(substr($cached,0,$line),true):null;
            if (is_array($meta) && self::fresh($meta,$generation,time())) {
                header('X-YC-Public-Cache: HIT');
                header('Cache-Control: no-cache, must-revalidate, max-age=0');
                echo substr($cached,$line+1);exit;
            }
        }
        header('X-YC-Public-Cache: MISS');
        $copy='';$cleaned=false;
        ob_start(static function ($html,$phase) use ($file,$generation,&$copy,&$cleaned) {
            if ($phase & PHP_OUTPUT_HANDLER_CLEAN) { $cleaned=true;return $html; }
            $copy.=$html;
            if (!($phase & PHP_OUTPUT_HANDLER_FINAL)) return $html;
            if ($cleaned || self::generation()!==$generation || !self::can_store($copy,headers_list(),http_response_code())) return $html;
            $tmp=$file.'.'.bin2hex(random_bytes(6)).'.tmp';
            $public_headers=array_values(array_filter(headers_list(),static fn($header)=>preg_match('~^(Link|X-Robots-Tag|Content-Language):~i',$header)));
            $meta=json_encode(['generation'=>$generation,'expires'=>time()+self::TTL,'headers'=>$public_headers]);
            // The cache buffer sits inside the legacy URL/legal-link rewrite buffer.
            $stored_copy=function_exists('yaclinic_p1_rewrite_html') ? \yaclinic_p1_rewrite_html($copy) : $copy;
            if (file_put_contents($tmp,$meta."\n".$stored_copy,LOCK_EX)!==false) {
                chmod($tmp,0600);rename($tmp,$file);
            }
            return $html;
        },function_exists('yc_p1_early_header_scope') && \yc_p1_early_header_scope() ? 1 : 4096);
    }
}

// Hooks also run on admin/cron/REST writes, but only this staging installation.
add_action('plugins_loaded',[Public_HTML_Cache::class,'serve_early'],PHP_INT_MAX);
add_action('template_redirect',[Public_HTML_Cache::class,'serve'],999);
foreach (['save_post','deleted_post','trashed_post','set_object_terms','created_term','edited_term','delete_term',
    'code_snippets/update_snippet','code_snippets/activate_snippet','code_snippets/deactivate_snippet'] as $hook) {
    add_action($hook,[Public_HTML_Cache::class,'invalidate']);
}
foreach (['added_post_meta','updated_post_meta','deleted_post_meta'] as $hook) {
    add_action($hook,static function ($meta_id,$post_id,$key) {
        if (!in_array($key,['_edit_lock','_edit_last','_elementor_css'],true)) Public_HTML_Cache::invalidate($key);
    },10,3);
}
foreach (['added_option','updated_option','deleted_option'] as $hook) {
    add_action($hook,static function ($name) {
        if (Public_HTML_Cache::option_affects_content($name)) Public_HTML_Cache::invalidate($name);
    });
}
