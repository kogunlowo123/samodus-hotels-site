import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/rooms', '/rooms/room-type-one', '/experience', '/gallery', '/location', '/about', '/contact', '/book', '/reviews', '/privacy'];

for (const route of routes) {
  test(`axe: ${route} has no WCAG 2.2 A/AA violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical' || v.impact === 'moderate');
    expect(
      serious,
      serious.map((v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`).join('\n\n'),
    ).toEqual([]);
  });
}

test('keyboard: skip link, focus order and visible focus', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop keyboard flow');
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();

  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    const ok = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return false;
      const cs = getComputedStyle(el);
      // Chromium focuses the calendar button inside <input type="date"> as a sub-part;
      // it draws its own ring while the host input reports outline: none.
      const isDate = el instanceof HTMLInputElement && el.type === 'date';
      return cs.outlineStyle !== 'none' || el.tagName === 'BODY' || isDate;
    });
    expect(ok).toBeTruthy();
  }
});
