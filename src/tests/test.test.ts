import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  await page.getByRole('link', { name: ' Contact us' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('testName');
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('test@test');
  await page.getByRole('textbox', { name: 'Subject' }).fill('testSubject');
  await page.getByRole('textbox', { name: 'Your Message Here' }).fill('testMessage');
  page.once('dialog', (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });

  // await page.waitForTimeout(2000); // FIXME: Can we remove this???

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#contact-page')).toContainText('Success! Your details have been submitted successfully.');
  await page.getByRole('link', { name: ' Home' }).click();
});
