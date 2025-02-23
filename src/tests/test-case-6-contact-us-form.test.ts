import { test } from '@playwright/test';
import { UserData } from 'page-object-model/data/user-data';
import { HomePage } from 'page-object-model/pages/home';
import { FeedbackWorkflow } from 'page-object-model/workflows/feedback-workflow';

let testUser: UserData.User;

test.describe('Test Case 6: Contact Us Form', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Fill out Contact Us page and submit', async ({ page }) => {
    await test.step('Navigate to the website', async () => {
      const homePage = new HomePage(page);
      await homePage.navigateTo();
    });
    await test.step('Execute Contact Us Workflow', async () => {
      await FeedbackWorkflow.SubmitFeedback(page, testUser);
    });
    await test.step('Cleanup Test Data', async () => {
      page.close();
    });
  });
});
