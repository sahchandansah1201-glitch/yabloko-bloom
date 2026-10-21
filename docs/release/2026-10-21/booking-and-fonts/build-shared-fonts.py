"""One shared URL for common font faces; preserve native styles and fallback."""
import hashlib
import json
import urllib.request
from pathlib import Path

ROOT=Path(__file__).resolve().parent
raw=(ROOT/'reviews-widget-before.js').read_bytes()
assert hashlib.sha256(raw).hexdigest()=='c580ffc4c68efda69537b1fd64c3068ca699efb829c1d6474a39059db0bd524b'
needle=b'@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700&display=swap");'
assert raw.count(needle)==1
weights=','.join(str(w)+','+str(w)+'italic' for w in range(100,901,100))
common='https://fonts.googleapis.com/css?family=Inter:'+weights+'%7CMontserrat:'+weights+'&display=swap&subset=cyrillic'
shared=('@import url("'+common+'");').encode()
result=raw.replace(needle,shared)
assert result.replace(shared,needle)==raw
path=ROOT/'derived-assets/reviews-widget-common-fonts.js'
path.write_bytes(result)
(ROOT/'derived-assets/shared-fonts-manifest.json').write_text(json.dumps({
    'source_sha256':hashlib.sha256(raw).hexdigest(),'target_sha256':hashlib.sha256(result).hexdigest(),
    'before_bytes':len(raw),'after_bytes':len(result),
    'native_css_unchanged':True,'common_url':common,'all_weights_and_italics_preserved':True},indent=2))
print(hashlib.sha256(result).hexdigest(),len(result))
fallback=(ROOT/'reviews-fallback-before.css').read_bytes()
assert hashlib.sha256(fallback).hexdigest()=='d61109319975b82615be2ff34ddb399c56014e0694b12e0146baa9a1eb1b554c'
assert fallback.count(needle)==1
(ROOT/'derived-assets/reviews-fallback-common-fonts.css').write_bytes(fallback.replace(needle,shared))
booking=(ROOT/'derived-assets/booking-widget-ready.js').read_bytes()
booking_font=b'@import"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap";'
assert booking.count(booking_font)==1
(ROOT/'derived-assets/booking-widget-common-fonts.js').write_bytes(booking.replace(booking_font,shared))
request=urllib.request.Request(common,headers={'User-Agent':'Mozilla/5.0 Chrome/131.0.0.0 Safari/537.36'})
with urllib.request.urlopen(request,timeout=30) as response:css=response.read()
assert b"font-family: 'Inter'" in css and b"font-family: 'Montserrat'" in css and b'font-display: swap' in css
for weight in range(100,901,100):assert ('font-weight: '+str(weight)).encode() in css
assert b'font-style: italic' in css
(ROOT/'derived-assets/common-fonts-api-check.css').write_bytes(css)
print('COMMON_FONTS_ALL_WEIGHTS_ITALICS_AND_NATIVE_CSS_OK')
