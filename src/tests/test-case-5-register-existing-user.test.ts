import { test } from '@playwright/test';
import { UserData } from 'page-object-model/data/user-data';
import { HomePage } from 'page-object-model/pages/home';
import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';

let testUser: UserData.User;

test.describe('Test Case 5: Register User with existing email', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Register User, Log Out, Re-Register User Then Log In User to Delete', async ({ page }) => {
    await test.step('Navigate to the website', async () => {
      const homePage = new HomePage(page);
      await homePage.navigateTo();
    });
    await test.step('Execute Register User Workflow', async () => {
      await AccountWorkflow.RegisterUser(page, testUser);
    });

    await test.step('Execute Log Out User Workflow', async () => {
      await AccountWorkflow.LogOut(page, testUser);
    });

    await test.step('Execute Register Existing User Workflow', async () => {
      await AccountWorkflow.RegisterExistingUser(page, testUser);
    });

    await test.step('Execute Log In User Workflow', async () => {
      await AccountWorkflow.LogIn(page, testUser);
    });

    await test.step('Execute Delete Logged In User Workflow', async () => {
      await AccountWorkflow.DeleteLoggedInUser(page);
    });
    await test.step('Cleanup Test Data', async () => {
      page.close();
    });
  });
});
