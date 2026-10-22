<?php
// Code Snippets: omit the opening tag. Staging-only mobile layout corrections.
add_action('wp_enqueue_scripts', function () {
    if ('new.yaclinic.ru' !== wp_parse_url(home_url(), PHP_URL_HOST)) {
        return;
    }
    if (! is_singular('doctor') && ! is_single(2403)) {
        return;
    }

    wp_add_inline_style('elementor-frontend', <<<'CSS'
@media (max-width: 767px) {
  /* Shared doctor template: avoid stacking 50 + 80 + 50 px around results. */
  body.single-doctor .elementor-1077 .elementor-element-6df51e7 > .e-con-inner {
    padding-bottom: 24px;
  }
  body.single-doctor .elementor-1077 .elementor-element-ec53768 {
    margin-top: 32px;
  }
  body.single-doctor .elementor-1077 .elementor-element-ec53768 > .e-con-inner {
    padding-top: 24px;
  }
  /* Only the confirmed empty Rosacea promo; future configured media stays visible. */
  body.postid-2403 .elementor-1594 .elementor-element-e7d4f87.yc-empty-mobile-promo {
    display: none;
  }
}
CSS
    );
}, 100);

add_action('wp_footer', function () {
    if ('new.yaclinic.ru' !== wp_parse_url(home_url(), PHP_URL_HOST) || ! is_single(2403)) {
        return;
    }
    // A configured image can still be waiting for Elementor lazy loading.
    if (function_exists('get_field') && get_field('hero_media', 2403)) {
        return;
    }
    ?>
<script id="yc-mobile-empty-promo">
(() => {
  const column = document.querySelector('body.postid-2403 .elementor-1594 .elementor-element-e7d4f87');
  const frame = column?.querySelector('.elementor-element-cf9dfd0');
  if (!frame) return;
  const hasBackground = getComputedStyle(frame).backgroundImage.includes('url(');
  const hasImage = [...frame.querySelectorAll('img')].some(image =>
    !image.closest('.uc-svg-image, [aria-hidden="true"]') && !!image.getAttribute('src')?.trim()
  );
  const hasPlayer = [...frame.querySelectorAll('video[src], video source[src], iframe[src]')].some(media =>
    !!media.getAttribute('src')?.trim()
  );
  const hasVideoLink = [...frame.querySelectorAll('a[data-lity][href]')].some(link => {
    const href = link.getAttribute('href').trim();
    return href !== '' && href !== '#' && !href.startsWith('javascript:');
  });
  column.classList.toggle('yc-empty-mobile-promo', !hasBackground && !hasImage && !hasPlayer && !hasVideoLink);
})();
</script>
    <?php
}, 100);
