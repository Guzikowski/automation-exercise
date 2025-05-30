import { CommonData } from 'page-object-model/data/common-data';
import { ProductData } from 'page-object-model/data/product-data';
import { UserData } from 'page-object-model/data/user-data';
import { CartWorkflow } from 'page-object-model/workflows/cart-workflow';
import { ProductWorkflow } from 'page-object-model/workflows/product-workflow';
import { test } from '../../fixtures/extended-test';
import { teardownUser } from '../../fixtures/user-management-fixture';

test.use({ productNames: [ProductData.ProductName.WinterTop] });

test.describe('Test Case 14: Place Order: Register while Checkout', { tag: ['@e2e', '@TC-14'] }, () => {
  test('Place Order and Register while Checking Out', async ({
    homePage,
    productsPage,
    productDetailsPage,
    viewCartPage,
    loginPage,
    signUpPage,
    accountCreatePage,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    testProducts,
    testUser
  }) => {
    const testProduct = testProducts[0] as ProductData.ProductData;
    await test.step('Navigate to All Products', async () => {
      await ProductWorkflow.navigateToAllProducts(homePage, productsPage, testProduct);
    });
    await test.step('View Product Details', async () => {
      await ProductWorkflow.viewProductDetails(productsPage, productDetailsPage, testProduct);
    });
    await test.step('Increase Quantity and Add to Cart', async () => {
      await ProductWorkflow.increaseQuantityAddToCart(productDetailsPage, testProduct);
    });
    await test.step('Verify Products in Cart', async () => {
      await CartWorkflow.verifyProductInCart(viewCartPage, testProduct);
    });
    await test.step('Proceed to Checkout and Register', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.clickProceedToCheckout();
      await viewCartPage.clickRegisterLogin();
    });
    await test.step('Enter Account Information', async () => {
      await loginPage.landedOn();
      await loginPage.checkNewUserSignup();
      await loginPage.enterNewUserName(testUser.userName);
      await loginPage.enterNewUserEmail(testUser.email);
      await loginPage.clickSignup();
    });
    await test.step('Enter Account Information', async () => {
      await signUpPage.landedOn();
      await signUpPage.checkEnterAccountInformation();
      await signUpPage.enterPassword(testUser.password);
      await signUpPage.selectBirthDate(testUser.birthDate);
      if (testUser.newsletter) {
        await signUpPage.checkNewsletter();
      }
      if (testUser.offers) {
        await signUpPage.checkSpecialOffers();
      }
      await signUpPage.checkTitle(testUser.gender);
      await signUpPage.enterFirstName(testUser.firstName);
      await signUpPage.enterLastName(testUser.lastName);
      await signUpPage.enterCompany(testUser.company);
      await signUpPage.enterAddress(testUser.address);
      await signUpPage.enterAddress2(testUser.address2);
      await signUpPage.selectCountry(UserData.getCountryFromCode(testUser.location.country));
      await signUpPage.enterState(testUser.location.state);
      await signUpPage.enterCity(testUser.location.city);
      await signUpPage.enterZip(testUser.location.zip);
      await signUpPage.enterMobileNumber(testUser.mobileNumber);
      await signUpPage.clickCreateAccount();
    });
    await test.step('Check Account Created', async () => {
      await accountCreatePage.landedOn();
      await accountCreatePage.checkAccountCreated();
      await accountCreatePage.clickContinue();
      await homePage.landedOn();
      await homePage.checkUserLoggedIn(testUser.userName);
    });
    await test.step('Proceed to Checkout', async () => {
      await homePage.landedOn();
      await homePage.clickCart();
      await viewCartPage.landedOn();
      await viewCartPage.clickProceedToCheckout();
    });
    await test.step('Checkout', async () => {
      await checkoutPage.landedOn();
      await checkoutPage.verifyOrderDetails(testUser, testProduct);
      await checkoutPage.fillMessage(CommonData.randomSentence());
      await checkoutPage.clickPlaceOrder();
    });
    await test.step('Payment', async () => {
      await paymentPage.landedOn();
      const fullName = `${testUser.firstName} ${testUser.lastName}`;
      await paymentPage.enterCardOwner(fullName);
      await paymentPage.enterCardNumber(testUser.creditCard.number);
      await paymentPage.enterCardCvc(testUser.creditCard.ccv);
      await paymentPage.enterCardExpiryMonth(testUser.creditCard.expiryMonth);
      await paymentPage.enterCardExpiryYear(testUser.creditCard.expiryYear);
      await paymentPage.clickPayAndConfirmOrder();
    });
    await test.step('Payment', async () => {
      await paymentDonePage.landedOn();
      await paymentDonePage.checkOrderPlaced();
      await paymentDonePage.clickContinue();
    });
  });
  test.afterEach(async ({ verifyLoginHelper, deleteAccountHelper, testUser, homePage }) => {
    await test.step('Delete User via API if exists', async () => {
      await teardownUser(verifyLoginHelper, deleteAccountHelper, testUser);
    });
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
