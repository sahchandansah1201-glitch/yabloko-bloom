(async (page) => {
  const rows = [];
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({width, height:844});
    await page.reload();
    await page.locator("reviews-widget .ym-reviews").waitFor();
    await page.locator("reviews-widget").scrollIntoViewIfNeeded();
    for (const source of ["Яндекс", "2ГИС", "Google", "ПроДокторов"]) {
      await page.locator("reviews-widget").getByRole("tab", {name:source, exact:true}).click();
      const row = await page.evaluate(() => {
        const w = document.querySelector("reviews-widget");
        const root = w.shadowRoot;
        const panel = root.querySelector(".rw-panel");
        const text = panel.textContent.replace(/\s+/g, " ").trim();
        let hash = 2166136261;
        for (let i=0;i<text.length;i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
        const wr = w.getBoundingClientRect();
        const fr = document.querySelector("footer").getBoundingClientRect();
        return {
          gap:fr.top-wr.bottom,
          wrapperExtra:w.closest(".elementor-widget").getBoundingClientRect().height-wr.height,
          panelVisible:panel.getBoundingClientRect().height>0,
          panelTextHash:(hash>>>0).toString(16),
          linkCount:panel.querySelectorAll("a[href]").length,
          nativePanel:panel.firstElementChild.className,
          horizontalOverflow:document.documentElement.scrollWidth>innerWidth,
          footerVisible:fr.height>0,
          settingsInFooter:!!document.querySelector("footer #yaclinic-analytics-settings")
        };
      });
      rows.push({width, source, ...row});
    }
  }
  return rows;
})
