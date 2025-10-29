const { test, expect } = require('@playwright/test');

test.describe('Products fetching', () => {
  test('renders products from API', async ({ page }) => {
    await page.route('**/api/products**', async (route) => {
      const payload = {
        products: [
          {
            id: 'p1',
            name: 'Mock A Jacket',
            description: 'A classic vintage piece',
            price: 49.99,
            image: 'https://via.placeholder.com/800x800?text=MockA',
            size: 'M',
            color: 'Black',
            era: '1990s',
          },
        ],
      };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(payload),
      });
    });

    await page.goto('/catalog');
    await expect(page.getByText('Mock A Jacket', { exact: false })).toBeVisible();
  });

  test('falls back to offline products when network fails', async ({ page }) => {
    await page.route('**/api/products**', (route) => route.abort());
    await page.route('**/api/catalog**', (route) => route.abort());
    await page.route('**/products**', (route) => route.abort());
    await page.goto('/catalog');
    // Expect offline banner to appear
    const banner = page.locator('#offline-banner');
    await expect(banner).toBeVisible({ timeout: 15000 });
  });
});