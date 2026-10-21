"""Hash-pinned derived assets; never modify the installed plugin's originals."""
import hashlib
import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PINNED = {
    'booking-widget-before.js': '8517c04d2f0d18200c5e6dea0bb8dd0cf816f62e24b6105294487237294bdb66',
    'reviews-widget-before.js': 'c580ffc4c68efda69537b1fd64c3068ca699efb829c1d6474a39059db0bd524b',
}


def read_pinned(name):
    raw = (ROOT / name).read_bytes()
    assert hashlib.sha256(raw).hexdigest() == PINNED[name], 'Source drift: ' + name
    return raw.decode()


def main():
    out = ROOT / 'derived-assets'
    out.mkdir(exist_ok=True)
    booking = read_pinned('booking-widget-before.js')
    needle = 'document.addEventListener("sqns:open-booking",v),()=>'
    assert booking.count(needle) == 1, 'Ready hook not unique'
    booking = booking.replace(needle,
        'document.addEventListener("sqns:open-booking",v),document.dispatchEvent(new CustomEvent("sqns:booking-ready",{detail:v})),()=>')
    # A delayed retry must not mount React twice if the earlier request completes late.
    booking = '(function(){if(window.ycBookingBundleStarted)return;window.ycBookingBundleStarted=true;\n' + booking + '\n})();\n'
    (out / 'booking-widget-ready.js').write_text(booking)

    reviews = read_pinned('reviews-widget-before.js')
    font_urls = (
        'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
        'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap',
    )
    for index, url in enumerate(font_urls):
        needle = '@import url("' + url + '");'
        assert reviews.count(needle) == 1, 'Font import not unique'
        request = urllib.request.Request(url, headers={'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'})
        with urllib.request.urlopen(request, timeout=30) as response:
            css = response.read().decode()
        assert '@font-face' in css and 'font-display: swap' in css
        assert "format('woff2')" in css and '.ttf' not in css, 'Do not replace WOFF2 with a heavier format'
        assert '`' not in css and '${' not in css and '@import' not in css
        (out / f'font-source-{index}.css').write_text(css)
        # Font files still load only when their family is used by the native pane.
        # Eliminate the three CSS round trips, not any native font or font weight.
        reviews = reviews.replace(needle, css)
    (out / 'reviews-widget-fonts.js').write_text(reviews)
    manifest = {p.name: {'sha256': hashlib.sha256(p.read_bytes()).hexdigest(), 'bytes': p.stat().st_size}
                for p in out.iterdir() if p.suffix in ('.js', '.css')}
    (out / 'manifest.json').write_text(json.dumps(manifest, indent=2))
    print(json.dumps(manifest, indent=2))


if __name__ == '__main__':
    main()
