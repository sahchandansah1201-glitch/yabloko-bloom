"""Build format-only derivatives of the two explicitly audited homepage PNGs."""
import hashlib
import io
import json
import urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent
SOURCES = (
    'blob-edited-no-edvans',
    'exec-2a2dbc73-41e2-48f8-a099-9090930fcd01',
)
BASE = 'https://new.yaclinic.ru/wp-content/uploads/2026/04/'


def main():
    out = ROOT / 'image-derivatives'
    out.mkdir(exist_ok=True)
    rows = []
    for stem in SOURCES:
        for size in ('150x150', '300x300', '768x768', '1024x1024', ''):
            name = stem + ('-' + size if size else '') + '.png'
            with urllib.request.urlopen(BASE + name, timeout=30) as response:
                original = response.read()
            image = Image.open(io.BytesIO(original))
            assert image.format == 'PNG'
            destination = out / (name[:-4] + '-perf.webp')
            assert not destination.exists(), 'Preserve previous build; inspect before replacing'
            image.save(destination, 'WEBP', quality=90, method=6,
                       icc_profile=image.info.get('icc_profile', b''))
            converted = Image.open(destination)
            assert converted.size == image.size, 'Geometry changed'
            assert converted.convert('RGBA').getchannel('A').tobytes() == image.convert('RGBA').getchannel('A').tobytes(), 'Alpha changed'
            assert destination.stat().st_size < len(original), 'No size benefit'
            rows.append({'source': BASE + name, 'target': BASE + destination.name,
                         'source_sha256': hashlib.sha256(original).hexdigest(),
                         'target_sha256': hashlib.sha256(destination.read_bytes()).hexdigest(),
                         'width': image.width, 'height': image.height,
                         'before_bytes': len(original), 'after_bytes': destination.stat().st_size,
                         'alpha_equal': True, 'original_modified': False})
    (out / 'manifest.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2))
    mobile = [r for r in rows if r['width'] == 768]
    print(json.dumps({'files': len(rows), 'mobile_before': sum(r['before_bytes'] for r in mobile),
                      'mobile_after': sum(r['after_bytes'] for r in mobile)}))


if __name__ == '__main__':
    main()
