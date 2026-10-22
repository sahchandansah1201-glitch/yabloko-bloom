<?php
/** Transform a complete header early; preserve the remainder as one complete body. */
function yc_p1_header_stream_rewriter(?callable $rewrite=null): callable {
    $rewrite=$rewrite ?? 'yaclinic_p1_rewrite_html';
    $pending='';$sent=false;
    return static function (string $html,int $phase) use ($rewrite,&$pending,&$sent): string {
        if ($phase & PHP_OUTPUT_HANDLER_CLEAN) { $pending='';$sent=false;return ''; }
        $pending.=$html;
        if ($phase & PHP_OUTPUT_HANDLER_FINAL) {
            $result=$rewrite($pending);$pending='';return $result;
        }
        if (!$sent && preg_match('~<body\b[^>]*>~i',$pending,$body,PREG_OFFSET_CAPTURE)) {
            $offset=$body[0][1]+strlen($body[0][0]);
            if (preg_match('~<header\b[^>]*>~i',$pending,$header,PREG_OFFSET_CAPTURE,$offset)) {
                $end=stripos($pending,'</header>',$header[0][1]+strlen($header[0][0]));
                if ($end!==false) {
                    $end+=strlen('</header>');$prefix=substr($pending,0,$end);
                    $pending=substr($pending,$end);$sent=true;return $rewrite($prefix);
                }
            }
        }
        return '';
    };
}
