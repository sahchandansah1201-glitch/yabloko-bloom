<?php

/**
 * Yaclinic — объединённые отзывы главной (стенд)
 */
// Stage homepage only. Rollback: deactivate this snippet; no content records changed.
function yc_unified_home_reviews_scope() {
    return 'new.yaclinic.ru' === wp_parse_url(home_url(), PHP_URL_HOST) && is_front_page() && 6 === get_queried_object_id();
}
add_filter('elementor/frontend/container/should_render', static function ($render, $element) {
    if (yc_unified_home_reviews_scope() && '3d3b13f' === $element->get_id()) {
        return false;
    }
    return $render;
}, 30, 2);
add_action('wp_head', static function () {
    if (!yc_unified_home_reviews_scope()) return;
    echo '<style id="yc-home-review-width">body.page-id-6 .elementor-6 .elementor-element-48f6d12{padding-left:0;padding-right:0}body.page-id-6 .elementor-6 .elementor-element-48f6d12>.e-con-inner{width:100%;max-width:1280px}@media(max-width:767px){body.page-id-6 .elementor-6 .elementor-element-48f6d12>.e-con-inner{display:block}}</style>';
}, 1005);
add_action('wp_footer', static function () {
    if (!yc_unified_home_reviews_scope()) return;
    echo <<<'HTML'
<script id="yc-unified-home-reviews">
(function () {
  'use strict';
  var widget = document.querySelector('reviews-widget');
  if (!widget || !window.customElements) return;
  var css = `
    .rw-container{display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:20px;align-items:center;max-width:1216px}
    .rw-widget{padding:64px 32px}
    .rw-header{grid-column:1/-1;max-width:none;margin-bottom:24px}
    .rw-kicker{color:#4d7f25;font-size:16px;letter-spacing:0;text-transform:none;font-weight:600;margin:0 0 6px}
    .rw-title{font-size:36px;line-height:1.2;font-weight:650;margin:0 0 12px}
    .rw-subtitle{margin:0;font-size:16px;line-height:1.5;color:#737373}
    .rw-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;max-width:820px}
    .rw-tab{display:flex;align-items:center;justify-content:center;gap:12px;min-height:56px;padding:12px;border-radius:8px;background:#fff;color:#333;font-size:16px;font-weight:500;line-height:1.4;box-shadow:none;border:1px solid #e4e4e0}
    .rw-tab[aria-selected=true]{background:#f2f5ed;color:#4d7f25;border-color:#4d7f25}
    .rw-tab:before{content:'';width:28px;height:28px;flex-shrink:0;background-size:contain;background-repeat:no-repeat;background-position:center}
    .rw-tab[id$="-tab-yandex"]:before{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAE30lEQVR42q2WX4jUVRTHP+feO7O5altiG7WmPfUwEa6Oa7AZs7toSAhFMD0UQkLRg3+KICIqBl+Koh6ChFQEax9S9tVIaNFdw/KhYZUepESpUDbbIUvEZef3u/f0cH8zO7vurot14fL78fvde773nO/33HOEBYaCARAIADrw+P24+nLSpB1vDTkzhdOaHD87AaCVioG9yN64fq4h84KVsTKEV3D0d2/Eml6UZzHShbEdCIYQbuL9eUS+AR2R4bEfIzBmPlCZG6xsZWjIa/+6NRizC8NunG3Da7YggAIicToDdT8BYT+JPySj535t2LgtoIIRCFpa203O7SNne0mCQvAogoigKtPbNSAoIg5nIdHvSeo7ZfTc2YatVvtmBlilEsEGugvk3QFytpd6kqCqIA4RCxhEIrAg8Zs4ggaStI6TXvLuoG7tLgiEyOs8gABaKjnEvoe1PdR9ghiHZOtEwNo4TfZsxkoMSJ7UJzi7gUQqWi7k5w2plkpORkdT3bz+eZBDQDuqmaEMDIXJSbLvcbbdBWIirwCqikhAxON1j5yo7m/YbnqoIPT1BS3hUHkRZ5ehITTBALyHEODBVbBxE2wagM4HIE3Bp9mBIHIcAs7mMbJVi8UcnZ2qmXMyQ5VPrt1I3h7F2YdJvc84A2NgagqefgZe3g0dKyLA+GU4/DmcOA7OQmiomIARg4YriL4g346damBED+69FJ9trogxa/AhNMGshev/QPcGePUNWHFfjIkqdK2G19+BnifiGusaRBlUFSNdqHmkFcPMYnQleScovsmbZh72lqDjHkiTKBhjIElg6VJYWwQfZiaZqsc6MKxcSKXu1lsgQFsbtC+NHDbEIpJlWYC7O2DZckhb81wCRkBZMj+gmuvxpFliq4JzMVy1P6NXqhEkhGnvr47DzRuz0kQNCqhM3Qr48zLNvKmReB9jRvzmAyxphzPfwW+XwOUiiDHxMBcvwKlhyLVNp0YUviVJ64heAaDaCtjXFzLAMQgXYiiy3cHHcJ7/CT54F06PRHVe/h2qZ+DT9+HiL5HLEFr4s4KGC4TkBwC2bfNzJ/6Wni9xZjv1eoKYXMtNAkk9Gu1aHdOkdjUGw7nZvCfkXI40fCHD1ZdaL/JpDjs7YwiTcJQkvYaxrullY+TbIJeH8SvwVy2+53LTST/tnSP1f5BycLYGm4AyNOS1XLYyUv0alQNYEYSAZlw2xGIM5PNxNkSkzYRXBMUYIeigjFRPzy5TM1VaKKiCIdWPSfwRnHWIelpLzAyVauvugOBxzpH4I4j7UMFQKOgi62FxJVY/Im93kIYoota7dcam7J814MNhEt6U0WrttvWw0b9opWJktFrjZn4nU2EPwg2MMaj6ORofj7EG4QZJ+haS7JLRaq1RWxff04BBURFU+9dtx9nPgLsJGpr1UdVjjAWukfrX5OTYYGuU5rJrFuiuAoJouWzl5NggafIKqhNYMaiGTI0W9G9CukNOjg1qqeQWAlvQw9Yrg2LRSbWaaP+653D2EGhH1t9cQ9OdMnz2Ky0Wc1SrqTRuqP8yFEQLsV3QgfWf6JZiqpuLk9rf/TZA499ihlnMIgGlXE4VhHqyD2snyLtxJuv7tVIxlMsp//dQEK1kLcnWnmP6VM+xRregi6DmzkFBtPTYKt3w6EN3AvQvQVlXBwLP6gwAAAAASUVORK5CYII=")}
.rw-tab[id$="-tab-2gis"]:before{background-image:url("data:image/png;base64,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")}
.rw-tab[id$="-tab-google"]:before{background-image:url("data:image/png;base64,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")}
.rw-tab[id$="-tab-prodoctorov"]:before{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAE2UlEQVR42r2WXYhdVxXHf/+19713ZnJnmpE6mGIN+iCSNpHa0pvUmlEs5sM+2MAdWmj1TSzRRylY9XpbsSA+xTcVoWAQ5jwIxVrFh+mIjFPTPNiSqdCi/cIUhGkyH/XOvWfv5cO5memUfDWmLthwOOfs/V9r7bX+/wXXzzTd8QjQ6qzuu+ux1ZcO/ODcm3c+tvxpgE7HDSBeF6jhYfNdla3u2pEYa7/IubypNt5E66tfAf7227OnA5D/N0B3MYPRVQLX/u7Kd0KM33XPo172N9zH6mDbtsRrBWrPYIWUgNTqLO8LWv2x1XccSv01HM+SDNB7t14W0IcbBA6u9iy2p413pVxA+mxn+WM5Nr6O9K0QGxODjZUsJCEDTxc7cxPQOxjPThtT806BC3IFtFkTXsyQAA50Vj6lqK96qN0frP7x1F9n0FtJkoUrJSdeAFOXDPN5mwML+0YZbZqeWli9+4lzk4OevmwxHAE/HGo7PpTK/1D2zychuxLY+caEgSteAPN79u+lzj2Ij+L+Ef7qU4zY7oHFM8B9qbTjozvHHy97iVz2GPTOZ4GuJiqAV376yQ2AqC7Z7z1wHHicYJNVeBkyEAykN6tXqueEp421HjAimb2fOrvrh+t3rDXGXop+tHUMOIG70S8HyIUjICMCobp8U0gIARFJV0cFW4+hEX6yo3f+jQh8G9zIOSPVQNWP7uJdpe3uuqYOGjrnrhRqzQcj+G1kfHj4B2fuOO4R1OD/YlWTGc5biPyB47lnWZBhFIRguA8qctlc1ze+qGbur//b8Pwjsi9Sr9UqVpKGhZJxT0BZ0Zxn95yR3pczcncAT/lZlx6K+t2pt/zQ7cfw2qPAUcQE+BhohFqQXJMAMm/WGmaDtWxISe6G7PKV+y7X/vzIyKOgHB1Mfzh9FvimT+9pUhvfRc2mUL6Rjf7N2RqrAJbz3MbaxkEpfCY0mtHLHqncSEJ2NX25p3MmtvEyCvJQFaT5pTXg5eHaphrq3PDM7q/Nzd30idv2pvKdB4SOxZGJ3XnQI6d+khQuokabNnq2592faSjA7bapKJIfbR2jXjuO5z5QcWSZn9TTiydn27Nh5skv9F6DU8CpVufsCeEPYPHhWN95c+qtuFdsYVdUCyiGoYTXKcuDmEXcocrUfj/celHFzAuz7XY4s2fWl25BxYxeBZ5odd7+tafyEbP4DSwqDd65rEwZgIpK5/TMwvNkf56UEmUeMCj7xDCO8XmANtDtKhczSrir3fbwXHfy1b98v/lwwo+4p7/HkfHgntNmxWh7i9mW/nWGz/5HYgzgBkRydtChKhHFFkFIXhRKdNxoe1j8XvP3DNa/mAf938TRncFRQmTPXr8oIEtLwxu3BcqUqm8S2YX8Dr/vc7sE7u+dirrKFErTnbm40P3wv8698I/7c3/9RBiZGAHM3f8J0Ny16tsEZHhj7nfvnWTn2J+Q3UqZMzgEE85DenrxpE9PR83Pl5ccF7vK1Wy6/CDBxkbSDb+c76ocStDWTCPwSv1ffNuPtk4TuKUKCCdYpEwHgZNMTV2aabrK4MLhOelXF2OB7elZalcRB54a0pwhGSmD+5f83ttvVFEkv1zDIUfy6c5cvDCJX0KTt8ZCDt85DvwcsxncM0FGymdo2kEVi8sX0n8tJP5f8Ck1bbYmW+wAAAAASUVORK5CYII=")}
    .yc-review-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 20px;border:1px solid #4d7f25;border-radius:8px;color:#4d7f25;text-decoration:none;font-size:16px;font-weight:600;line-height:1.4;white-space:nowrap}
    .yc-review-cta:hover{background:#f2f5ed}
    .rw-tab:focus-visible,.yc-review-cta:focus-visible{outline:2px solid #333;outline-offset:3px}
    .rw-panel{grid-column:1/-1;margin-top:20px}
    @media(max-width:1000px){.rw-container{grid-template-columns:minmax(0,1fr)}.rw-tabs{max-width:none}.yc-review-cta{justify-self:end;margin-top:12px}}
    @media(max-width:600px){.rw-widget{padding:40px 16px}.rw-title{font-size:28px}.rw-tabs{grid-template-columns:repeat(2,minmax(0,1fr))}.rw-tab{justify-content:flex-start;padding:12px 10px;gap:8px}}
  `;
  customElements.whenDefined('reviews-widget').then(function () {
    var root = widget.shadowRoot;
    if (!root || root.querySelector('#yc-review-wrapper-style')) return;
    var style = document.createElement('style');
    style.id = 'yc-review-wrapper-style';
    style.textContent = css;
    root.appendChild(style);
    function decorate() {
      var title = root.querySelector('.rw-title');
      var kicker = root.querySelector('.rw-kicker');
      var subtitle = root.querySelector('.rw-subtitle');
      if (title && title.textContent !== 'Отзывы пациентов') title.textContent = 'Отзывы пациентов';
      if (kicker && kicker.textContent !== 'Нам доверяют') kicker.textContent = 'Нам доверяют';
      if (subtitle && subtitle.textContent !== 'Отзывы с независимых площадок — выберите источник') subtitle.textContent = 'Отзывы с независимых площадок — выберите источник';
      var tabs = root.querySelector('.rw-tabs');
      if (tabs && !root.querySelector('.yc-review-cta')) {
        var cta = document.createElement('a');
        cta.className = 'yc-review-cta';
        cta.href = '/multilink/';
        cta.textContent = 'Оставить отзыв ↗';
        tabs.after(cta);
      }
    }
    new MutationObserver(decorate).observe(root, {childList:true,subtree:true,characterData:true});
    decorate();
  });
})();
</script>
HTML;
}, 1005);
