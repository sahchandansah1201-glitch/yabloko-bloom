<?php
/**
 * Pure synthetic tests for the per-buffer header streaming callback.
 * Run: YC_STREAM_SOURCE=/absolute/header-stream.php php test-header-stream.php
 * The candidate file must define only yc_p1_header_stream_rewriter() and helpers.
 * No WordPress, network, temporary files, deletes, or raw HTML test output.
 */

function yaclinic_p1_rewrite_html(string $html): string {
    if ($GLOBALS['yc_stream_record']??false) $GLOBALS['yc_stream_rewrite_inputs'][]=$html;
    $html=str_replace('http://marysiet.beget.tech/','https://yaclinic.ru/',$html);
    $html=preg_replace_callback(
        "~<a\\b[^>]*href=([\"'])#\\1[^>]*>\\s*Политика обработки персональных данных\\s*</a>~u",
        static function (array $match): string {
            return preg_replace("~href=([\"'])#\\1~",'href="https://yaclinic.ru/private-police/"',$match[0],1);
        },$html
    );
    return str_replace('>Политика конфиденциальности</a>','>Политика обработки персональных данных</a>',$html);
}

function yc_stream_expected(string $html): string {
    $record=$GLOBALS['yc_stream_record']??false;
    $GLOBALS['yc_stream_record']=false;
    $result=yaclinic_p1_rewrite_html($html);
    $GLOBALS['yc_stream_record']=$record;
    return $result;
}

function yc_stream_description($value): string {
    if (is_string($value)) return 'string bytes='.strlen($value).' sha256='.hash('sha256',$value);
    return gettype($value).' '.json_encode($value);
}

function yc_stream_check($actual,$expected,string $label): void {
    $GLOBALS['yc_stream_checks']++;
    if ($actual!==$expected) {
        throw new RuntimeException($label.': expected '.yc_stream_description($expected).', got '.yc_stream_description($actual));
    }
}

function yc_stream_case(string $name,callable $test): void {
    $GLOBALS['yc_stream_scenarios']++;
    $GLOBALS['yc_stream_rewrite_inputs']=[];
    $GLOBALS['yc_stream_record']=true;
    try { $test(); } catch (Throwable $error) { $GLOBALS['yc_stream_failures'][]=$name.': '.$error->getMessage(); }
}

function yc_stream_new_callback(): callable {
    $GLOBALS['yc_stream_rewrite_inputs']=[];
    $callback=yc_p1_header_stream_rewriter();
    if (!is_callable($callback)) throw new RuntimeException('Factory did not return a callable');
    return $callback;
}

function yc_stream_main(): int {
    $GLOBALS['yc_stream_checks']=0;$GLOBALS['yc_stream_scenarios']=0;$GLOBALS['yc_stream_failures']=[];
    $source=getenv('YC_STREAM_SOURCE')?:__DIR__.'/header-stream.php';
    if (!is_file($source)) {
        fwrite(STDERR,"FAIL header stream factory source missing; set YC_STREAM_SOURCE\n");return 1;
    }
    require $source;
    if (!function_exists('yc_p1_header_stream_rewriter')) {
        fwrite(STDERR,"FAIL yc_p1_header_stream_rewriter factory missing\n");return 1;
    }
    $head='<!DOCTYPE html><html><head><script>window.syntheticHeaderEnd="</header>";</script>'.
        '<link href="http://marysiet.beget.tech/assets/style.css"></head>';
    $header='<body class="synthetic"><div id="before-header">Начало</div><header id="page-header">'.
        '<a href="http://marysiet.beget.tech/"><img src="http://marysiet.beget.tech/logo.png"></a></header>';
    $prefix=$head.$header;
    $tail='<main data-synthetic="carry-once"><p>Текст &amp; κόσμος 😀</p>'.
        '<img src="http://marysiet.beget.tech/example.webp">'.
        '<section><header id="secondary-header">SECOND HEADER</header></section></main>'.
        '<footer><a class="policy" href="#">Политика обработки персональных данных</a>'.
        '<a href="/private-police/">Политика конфиденциальности</a></footer></body></html>';
    $html=$prefix.$tail;$expected=yc_stream_expected($html);
    $expectedPrefix=yc_stream_expected($prefix);$expectedTail=yc_stream_expected($tail);

    yc_stream_case('every two-chunk byte boundary',static function () use ($html,$prefix,$expected,$expectedPrefix) {
        for ($split=0;$split<=strlen($html);$split++) {
            $callback=yc_stream_new_callback();
            $first=$callback(substr($html,0,$split),PHP_OUTPUT_HANDLER_START);
            yc_stream_check($first,$split>=strlen($prefix)?$expectedPrefix:'','early prefix at split '.$split);
            $last=$callback(substr($html,$split),PHP_OUTPUT_HANDLER_FINAL);
            yc_stream_check($first.$last,$expected,'full rewrite at split '.$split);
            yc_stream_check(implode('',$GLOBALS['yc_stream_rewrite_inputs']),$html,'each source byte rewritten once at split '.$split);
        }
    });

    foreach ([1,2,3,4,7,8,9,15,16,31,64,127,16384] as $size) {
        yc_stream_case('fixed chunks '.$size,static function () use ($size,$html,$prefix,$expected,$expectedPrefix) {
            $callback=yc_stream_new_callback();$output='';$emitted=false;
            for ($offset=0;$offset<strlen($html);$offset+=$size) {
                $chunk=substr($html,$offset,$size);
                $result=$callback($chunk,$offset===0?PHP_OUTPUT_HANDLER_START:0);
                $complete=$offset+strlen($chunk)>=strlen($prefix);
                yc_stream_check($result,$complete&&!$emitted?$expectedPrefix:'','non-final chunk at offset '.$offset);
                if ($complete) $emitted=true;
                $output.=$result;
            }
            $output.=$callback('',PHP_OUTPUT_HANDLER_FINAL);
            yc_stream_check($output,$expected,'full rewrite');
            yc_stream_check(implode('',$GLOBALS['yc_stream_rewrite_inputs']),$html,'each source byte rewritten once');
        });
    }

    yc_stream_case('body carry is held after prefix including later header tags',static function () use ($html,$prefix,$tail,$expectedPrefix,$expectedTail) {
        $callback=yc_stream_new_callback();$cut=17;
        yc_stream_check($callback($prefix.substr($tail,0,$cut),PHP_OUTPUT_HANDLER_START),$expectedPrefix,'only prefix emitted');
        yc_stream_check($callback(substr($tail,$cut),0),'','rest remains pending');
        yc_stream_check($callback('',PHP_OUTPUT_HANDLER_FLUSH),'','explicit flush keeps body pending');
        yc_stream_check($callback('',PHP_OUTPUT_HANDLER_FINAL),$expectedTail,'body emitted once at FINAL');
        yc_stream_check(implode('',$GLOBALS['yc_stream_rewrite_inputs']),$html,'no prefix or carry rewritten twice');
    });

    $fallbacks=[
        'head-only fake closing tag'=>$head,
        'body without header'=>$head.'<body><main>no page header http://marysiet.beget.tech/image.png</main></body></html>',
        'header without body'=>$head.'<header>not a page body</header></html>',
        'incomplete body opening'=>$head.'<bo',
        'incomplete header opening'=>$head.'<body><hea',
        'incomplete header closing'=>$head.'<body><header>unfinished</head',
        'header-like element is not header'=>$head.'<body><headerish>synthetic</header></body></html>',
    ];
    foreach ($fallbacks as $name=>$fallback) {
        yc_stream_case($name,static function () use ($fallback) {
            $callback=yc_stream_new_callback();
            yc_stream_check($callback($fallback,PHP_OUTPUT_HANDLER_START),'','no early emission');
            yc_stream_check($callback('',PHP_OUTPUT_HANDLER_FLUSH),'','no emission on explicit flush');
            yc_stream_check($callback('',PHP_OUTPUT_HANDLER_FINAL),yc_stream_expected($fallback),'old full rewrite fallback');
            yc_stream_check(implode('',$GLOBALS['yc_stream_rewrite_inputs']),$fallback,'fallback bytes rewritten once');
        });
    }

    yc_stream_case('closing tag before real header does not flush',static function () use ($head,$tail) {
        $preamble=$head.'<body><script>window.moreSynthetic="</header>";</script>';
        $header='<header data-synthetic="real">REAL</header>';
        $callback=yc_stream_new_callback();
        yc_stream_check($callback($preamble,PHP_OUTPUT_HANDLER_START),'','body script closing tag does not flush');
        yc_stream_check($callback($header.$tail,0),yc_stream_expected($preamble.$header),'real header flushes correct prefix');
        yc_stream_check($callback('',PHP_OUTPUT_HANDLER_FINAL),yc_stream_expected($tail),'remaining body');
    });

    yc_stream_case('HTML tag case is insensitive',static function () use ($tail) {
        $prefix='<!DOCTYPE html><HTML><HEAD></HEAD><BODY class="synthetic"><HEADER>UPPERCASE</HEADER>';
        $callback=yc_stream_new_callback();
        yc_stream_check($callback($prefix.$tail,PHP_OUTPUT_HANDLER_START),yc_stream_expected($prefix),'uppercase real header emitted');
        yc_stream_check($callback('',PHP_OUTPUT_HANDLER_FINAL),yc_stream_expected($tail),'uppercase body carry');
    });

    yc_stream_case('FINAL in the first callback returns complete rewrite',static function () use ($html,$expected) {
        $callback=yc_stream_new_callback();
        yc_stream_check($callback($html,PHP_OUTPUT_HANDLER_START|PHP_OUTPUT_HANDLER_FINAL),$expected,'single final output');
        yc_stream_check(implode('',$GLOBALS['yc_stream_rewrite_inputs']),$html,'single final rewrite input');
    });

    yc_stream_case('large real buffer size preserves tail',static function () use ($prefix,$tail,$expectedPrefix) {
        $html=$prefix.str_repeat('<p>http://marysiet.beget.tech/synthetic.jpg Текст</p>',1100).$tail;
        $callback=yc_stream_new_callback();
        $first=$callback(substr($html,0,16384),PHP_OUTPUT_HANDLER_START);
        yc_stream_check($first,$expectedPrefix,'16384-byte chunk emits prefix before FINAL');
        $output=$first;
        for ($offset=16384;$offset<strlen($html);$offset+=16384) {
            $next=$callback(substr($html,$offset,16384),0);
            yc_stream_check($next,'','large remaining chunk held');$output.=$next;
        }
        $output.=$callback('',PHP_OUTPUT_HANDLER_FINAL);
        yc_stream_check($output,yc_stream_expected($html),'large output preserves all bytes');
        yc_stream_check(implode('',$GLOBALS['yc_stream_rewrite_inputs']),$html,'large input rewritten once');
    });

    yc_stream_case('CLEAN discards pending prefix and its input',static function () use ($head,$html,$expectedPrefix,$expectedTail) {
        $callback=yc_stream_new_callback();
        yc_stream_check($callback($head.'<body><header>DISCARD',PHP_OUTPUT_HANDLER_START),'','pending prefix');
        yc_stream_check($callback('</header>DISCARD',PHP_OUTPUT_HANDLER_CLEAN),'','CLEAN never emits');
        yc_stream_check($callback($html,0),$expectedPrefix,'fresh prefix after CLEAN');
        yc_stream_check($callback('',PHP_OUTPUT_HANDLER_FINAL),$expectedTail,'fresh body after CLEAN');
        yc_stream_check(implode('',$GLOBALS['yc_stream_rewrite_inputs']),$html,'discarded bytes never rewritten');
    });

    yc_stream_case('CLEAN with START and FINAL suppresses all output',static function () use ($html) {
        $callback=yc_stream_new_callback();
        yc_stream_check($callback($html,PHP_OUTPUT_HANDLER_START|PHP_OUTPUT_HANDLER_CLEAN|PHP_OUTPUT_HANDLER_FINAL),'','CLEAN FINAL has no output');
        yc_stream_check(implode('',$GLOBALS['yc_stream_rewrite_inputs']),'','CLEAN FINAL does not rewrite discarded data');
    });

    yc_stream_case('CLEAN after early prefix discards only pending body',static function () use ($prefix,$expectedPrefix) {
        $callback=yc_stream_new_callback();$fresh='<main>http://marysiet.beget.tech/fresh.png</main></body></html>';
        $first=$callback($prefix.'<main>DISCARD',PHP_OUTPUT_HANDLER_START);
        yc_stream_check($first,$expectedPrefix,'already emitted prefix');
        yc_stream_check($callback('MORE DISCARD',PHP_OUTPUT_HANDLER_CLEAN),'','CLEAN body suppressed');
        $last=$callback($fresh,PHP_OUTPUT_HANDLER_FINAL);
        yc_stream_check($first.$last,$expectedPrefix.yc_stream_expected($fresh),'prefix remains exactly once');
        yc_stream_check(implode('',$GLOBALS['yc_stream_rewrite_inputs']),$prefix.$fresh,'discarded body never rewritten');
    });

    yc_stream_case('factory callbacks do not share pending state',static function () use ($head,$header,$prefix,$tail,$expectedPrefix,$expectedTail) {
        $first=yc_stream_new_callback();$second=yc_stream_new_callback();
        yc_stream_check($first($head,PHP_OUTPUT_HANDLER_START),'','first incomplete header held');
        yc_stream_check($second($prefix.$tail,PHP_OUTPUT_HANDLER_START),$expectedPrefix,'second prefix independent');
        yc_stream_check($second('',PHP_OUTPUT_HANDLER_FINAL),$expectedTail,'second body independent');
        yc_stream_check($first($header,0),$expectedPrefix,'first pending head preserved');
        yc_stream_check($first($tail,PHP_OUTPUT_HANDLER_FINAL),$expectedTail,'first body independent');
    });

    yc_stream_case('optional callback replaces default rewrite for prefix and body',static function () use ($html,$prefix,$tail) {
        $rewrite=static function (string $chunk): string {
            return str_replace(['synthetic','http://marysiet.beget.tech/'],['optimized','https://optimized.example/'],$chunk);
        };
        $callback=yc_p1_header_stream_rewriter($rewrite);
        $first=$callback($html,PHP_OUTPUT_HANDLER_START);
        yc_stream_check($first,$rewrite($prefix),'custom prefix transformation');
        $last=$callback('',PHP_OUTPUT_HANDLER_FINAL);
        yc_stream_check($last,$rewrite($tail),'custom body transformation');
        yc_stream_check($first.$last,$rewrite($html),'custom callback preserves full transformation');
    });

    yc_stream_case('two wrapper callbacks propagate prefix and preserve transform order',static function () use ($html,$prefix,$tail,$expected,$expectedPrefix,$expectedTail) {
        $optimize=static function (string $chunk): string { return str_replace('synthetic','optimized',$chunk); };
        $firstWrapper=yc_p1_header_stream_rewriter();
        $secondWrapper=yc_p1_header_stream_rewriter($optimize);
        $prefixOutput=$firstWrapper($prefix.substr($tail,0,19),PHP_OUTPUT_HANDLER_START);
        $early=$secondWrapper($prefixOutput,PHP_OUTPUT_HANDLER_START);
        yc_stream_check($early,$optimize($expectedPrefix),'header passes through both wrappers before FINAL');
        $middle=$firstWrapper(substr($tail,19),0);
        yc_stream_check($secondWrapper($middle,0),'','body remains pending through both wrappers');
        $last=$secondWrapper($firstWrapper('',PHP_OUTPUT_HANDLER_FINAL),PHP_OUTPUT_HANDLER_FINAL);
        yc_stream_check($last,$optimize($expectedTail),'body transformed in original order');
        yc_stream_check($early.$last,$optimize($expected),'stack output equals full transformation');
    });

    if ($GLOBALS['yc_stream_failures']) {
        foreach ($GLOBALS['yc_stream_failures'] as $failure) fwrite(STDERR,'FAIL '.$failure."\n");
        fwrite(STDERR,'HEADER_STREAM_FAILED '.count($GLOBALS['yc_stream_failures']).'/'.$GLOBALS['yc_stream_scenarios']." scenarios\n");
        return 1;
    }
    echo 'HEADER_STREAM_'.$GLOBALS['yc_stream_scenarios'].'_SCENARIOS_'.$GLOBALS['yc_stream_checks']."_CHECKS_OK\n";
    return 0;
}

exit(yc_stream_main());
