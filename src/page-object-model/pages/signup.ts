import { type Page, expect } from '@playwright/test';

export class SignUpPage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise - Signup/i;
    this.baseURL = 'https://automationexercise.com/signup';
  }
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await this.landedOn();
  }
  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
  async checkEnterAccountInformation(): Promise<void> {
    await expect(this.page.locator('#form')).toContainText('Enter Account Information');
  }
  async enterPassword(password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(password);
  }
  async selectBirthDate(birthDate: Date): Promise<void> {
    const dayValue = birthDate.getDate().toString();
    const monthValue = birthDate.getMonth().toString();
    const yearValue = birthDate.getFullYear().toString();
    await this.page.locator('#days').selectOption(dayValue);
    await this.page.locator('#months').selectOption(monthValue);
    await this.page.locator('#years').selectOption(yearValue);
  }
  async checkNewsletter(): Promise<void> {
    await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  }
  async checkSpecialOffers(): Promise<void> {
    await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
  }
  async enterFirstName(firstName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First name *' }).fill(firstName);
  }
  async enterLastName(lastName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Last name *' }).fill(lastName);
  }
  async enterCompany(company: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill(company);
  }
  async enterAddress(address: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(address);
  }
  async enterAddress2(address2: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Address 2' }).fill(address2);
  }
  async selectCountry(country: string): Promise<void> {
    await this.page.getByLabel('Country *').selectOption(country);
  }
  async enterState(state: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'State *' }).fill(state);
  }
  async enterCity(city: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(city);
  }
  async enterZip(zip: string): Promise<void> {
    await this.page.locator('#zipcode').fill(zip);
  }
  async enterMobileNumber(mobileNumber: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(mobileNumber);
  }
  async clickCreateAccount(): Promise<void> {
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }
  async clickHome(): Promise<void> {
    await this.page.getByRole('link', { name: ' Home' }).click();
  }
  async checkLogInError(): Promise<void> {
    await expect(this.page.locator('form').filter({ hasText: 'Login' })).toContainText('Your email or password is incorrect!');
  }
  async checkSignUpError(): Promise<void> {
    await expect(this.page.locator('form').filter({ hasText: 'Signup' })).toContainText('Email Address already exist!');
  }
}
export default { SignUpPage };
