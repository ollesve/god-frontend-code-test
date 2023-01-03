import { test, expect } from '@playwright/test';


test('carousel is initialized with 8 cards', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const carousel = page.locator('body>div>div>div:nth-child(2)>div');

  await expect(carousel).toHaveCount(8)
});

test('can search for body type', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByLabel('Search').fill('suv');
  const carouselChildren = page.locator('body>div>div>div:nth-child(2)>div');
  const nextCardButton = page.getByRole('button', { name: 'Next image' });


  await expect(nextCardButton).toBeDisabled()
  await expect(carouselChildren).toHaveCount(4)
});

test('can search for model name', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByLabel('Search').fill('Xc90 recharge');
  const carouselChildren = page.locator('body>div>div>div:nth-child(2)>div');
  const nextCardButton = page.getByRole('button', { name: 'Next image' });


  await expect(nextCardButton).toBeDisabled()
  await expect(carouselChildren).toHaveCount(1)
});

test('can search for model type', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByLabel('Search').fill('plug-in hybrid');
  const carouselChildren = page.locator('body>div>div>div:nth-child(2)>div');
  const nextCardButton = page.getByRole('button', { name: 'Next image' });


  await expect(nextCardButton).toBeEnabled()
  await expect(carouselChildren).toHaveCount(7)
});


