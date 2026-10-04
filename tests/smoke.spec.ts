import { test, expect, type Page } from '@playwright/test';

const routes = [
  '/',
  '/rooms',
  '/rooms/guest-rooms',
  '/experience',
  '/gallery',
  '/location',
  '/about',
  '/contact',
  '/book',
  '/reviews',
  '/privacy',
];

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => {
    if (r.status() >= 400 && !r.url().includes('favicon')) errors.push(`${r.status()} ${r.url()}`);
  });
  return errors;
}

for (const route of routes) {
  test(`route ${route} renders without errors, overflow or broken images`, async ({ page }) => {
    const errors = await collectErrors(page);
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Samodus Hotels/);
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc && desc.length > 50).toBeTruthy();
    expect(await page.locator('link[rel="canonical"]').count()).toBe(1);
    expect(await page.locator('script[type="application/ld+json"]').count()).toBeGreaterThan(0);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    const imgs = page.locator('img');
    const n = await imgs.count();
    for (let i = 0; i < n; i++) {
      const img = imgs.nth(i);
      expect(await img.getAttribute('alt'), `img ${i} missing alt`).not.toBeNull();
      if (await img.isVisible()) {
        await img.scrollIntoViewIfNeeded();
        const ok = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
        expect(ok, `img ${i} did not load: ${await img.getAttribute('src')}`).toBeTruthy();
      }
    }

    expect(errors, errors.join('\n')).toEqual([]);
  });
}

test('404 page is served for unknown routes', async ({ page }) => {
  const res = await page.goto('/this-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('not here');
});

test('every internal link on the home page resolves', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!));
  const unique = Array.from(new Set(hrefs.map((h) => h.split('#')[0].split('?')[0]).filter(Boolean)));
  for (const h of unique) {
    const r = await request.get(h);
    expect(r.status(), `link ${h}`).toBe(200);
  }
});

test('mobile navigation opens and closes with Escape', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Rooms' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('booking form validates and composes an enquiry', async ({ page }) => {
  await page.goto('/book?room=guest-rooms');
  await expect(page.locator('#iq-room')).toHaveValue('guest-rooms');

  await page.waitForTimeout(2100); // the form rejects submissions faster than 2s as spam
  await page.getByRole('button', { name: /Prepare enquiry|Send/ }).click();
  await expect(page.locator('[data-form-error]')).toBeVisible();
  await expect(page.locator('#iq-name')).toHaveAttribute('aria-invalid', 'true');

  await page.fill('#iq-name', 'Test Guest');
  await page.fill('#iq-phone', '08012345678');
  await page.fill('#iq-in', '2030-01-10');
  await page.fill('#iq-out', '2030-01-12');
  await page.getByRole('button', { name: /Prepare enquiry|Send/ }).click();

  await expect(page.locator('[data-done]')).toBeVisible();
  const text = await page.locator('[data-compose-text]').inputValue();
  expect(text).toContain('Check-in: 2030-01-10');
  expect(text).toContain('Guest rooms');
});

test('availability band prefills the booking form', async ({ page }) => {
  await page.goto('/');
  await page.fill('#av-in', '2030-02-01');
  await page.fill('#av-out', '2030-02-03');
  await page.selectOption('#av-guests', '3');
  await page.getByRole('button', { name: 'Check availability' }).click();
  await expect(page).toHaveURL(/\/book\?/);
  await expect(page.locator('#iq-in')).toHaveValue('2030-02-01');
  await expect(page.locator('#iq-out')).toHaveValue('2030-02-03');
  await expect(page.locator('#iq-guests')).toHaveValue('3');
});

test('gallery filters and lightbox work with keyboard', async ({ page }) => {
  await page.goto('/gallery');
  await page.getByRole('button', { name: 'Rooms', exact: true }).click();
  const visible = page.locator('.gal__grid > li:not([hidden])');
  expect(await visible.count()).toBeGreaterThan(0);
  await visible.first().locator('button').click();
  const dlg = page.locator('dialog[open]');
  await expect(dlg).toBeVisible();
  const first = await dlg.locator('[data-lb-count]').textContent();
  await page.keyboard.press('ArrowRight');
  expect(await dlg.locator('[data-lb-count]').textContent()).not.toBe(first);
  await page.keyboard.press('Escape');
  await expect(dlg).toHaveCount(0);
});

test('map embed is present with a Google Maps link', async ({ page }) => {
  await page.goto('/location');
  await expect(page.locator('iframe[title*="Map showing"]').first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Open in Google Maps/ }).first()).toHaveAttribute('href', /google\.com\/maps/);
});

test('every footer link resolves', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.locator('footer a[href^="/"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!));
  for (const h of Array.from(new Set(hrefs.map((x) => x.split('#')[0])))) {
    expect((await request.get(h)).status(), `footer link ${h}`).toBe(200);
  }
});

test('sitemap and robots are served', async ({ request }) => {
  expect((await request.get('/robots.txt')).status()).toBe(200);
  const sm = await request.get('/sitemap-index.xml');
  expect(sm.status()).toBe(200);
  expect(await sm.text()).toContain('sitemap-0.xml');
});
