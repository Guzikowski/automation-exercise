import { expect } from '@playwright/test';
import { test } from '../../fixtures/base-pom';

test.describe('Products Page Visual Regression', () => {
  test.beforeAll(async () => {
    test.skip(!!process.env.CI, 'Skipping visual regression test in CI, until snapshots are updated');
  });
  test('Check Products Page', async ({ homePage, productsPage }) => {
    await test.step('Navigate to Products', async () => {
      await homePage.landedOn();
      await homePage.clickProducts();
    });
    await test.step('Verify Products Page Snapshot', async () => {
      await productsPage.landedOn();
      await expect(productsPage.getPage()).toHaveScreenshot('products-page.png');
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
