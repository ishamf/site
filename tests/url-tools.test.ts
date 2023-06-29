import { test, expect } from '@playwright/test';

test('basic url generation', async ({ page }) => {
  await page.goto('/p/url-tools');

  await page.getByPlaceholder('Enter URL...').click();
  await page.getByPlaceholder('Enter URL...').fill('https://google.com');
  await page.getByPlaceholder('Key...').click();
  await page.getByPlaceholder('Key...').fill('query');
  await page.getByPlaceholder('Value...').first().click();
  await page.getByPlaceholder('Value...').first().fill('Test Query');

  await expect(page.getByText('https://google.com/?query=Test+Query')).toBeVisible();
});

test('url parsing', async ({ page }) => {
  await page.goto('/p/url-tools');

  await page.getByPlaceholder('Enter URL...').click();
  await page.getByPlaceholder('Enter URL...').fill('https://google.com/?query=Test+Query');
  await page.getByRole('button', { name: 'Parse params' }).click();

  await expect(page.getByPlaceholder('Enter URL...')).toHaveValue('https://google.com/');
  await expect(page.getByPlaceholder('Key...').first()).toHaveValue('query');
  await expect(page.getByPlaceholder('Value...').first()).toHaveValue('Test Query');
});
