const { test, expect } = require('@playwright/test');

test.describe('Production smoke', () => {
  test('Home page renders with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('LIKWAPU - Vintage Fashion');
    await expect(page.locator('#root')).toBeVisible();
  });

  test('Register route loads and shows Create Account heading', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('h2:text("Create Account")')).toBeVisible();
  });
});