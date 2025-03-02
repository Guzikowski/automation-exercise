import { test } from '@playwright/test';
import { UserData } from 'page-object-model/data/user-data';
import { blockAds } from 'page-object-model/pages/common';
import { HomePage } from 'page-object-model/pages/home';
import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';

let testUser: UserData.User;

test.describe('Test Case 3: Login User with incorrect email', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Attempt to Login with Unregistered User', async ({ page }) => {
    await test.step('Block adds in website', async () => {
      await blockAds(page);
    });
    await test.step('Navigate to the website', async () => {
      const homePage = new HomePage(page);
      await homePage.navigateTo();
    });
    await test.step('Execute Incorrect Log In User Workflow', async () => {
      await AccountWorkflow.IncorrectLogIn(page, testUser);
    });
    await test.step('Cleanup Test Data', async () => {
      page.close();
    });
  });
});
