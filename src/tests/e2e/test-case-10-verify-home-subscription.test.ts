import { UserData } from 'page-object-model/data/user-data';
import { test } from '../../fixtures/base-pom';

let testUser: UserData.User;

test.describe('Test Case 10: Verify Subscription on Home Page', { tag: ['@e2e', '@TC-10'] }, () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Submit Subscription from Home Page', async ({ homePage }) => {
    await test.step('Submit Subscription', async () => {
      await homePage.landedOn();
      await homePage.checkFooterForSubscription();
      await homePage.fillEmailForSubscription(testUser.email);
      await homePage.submitSubscription();
      await homePage.checkSubscriptionSuccess();
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Delete User if Logged In', async () => {
      if (await homePage.isUserLoggedIn()) {
        await homePage.clickDeleteAccount();
      }
    });
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
