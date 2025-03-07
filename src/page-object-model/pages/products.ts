import { type Locator, type Page, expect } from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';
import { BasePage } from './base-page';

export class ProductsPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;
  private allProductsText: Locator;
  private searchProductInput: Locator;
  private searchButton: Locator;
  private continueShoppingButton: Locator;
  private viewCartLink: Locator;
  private searchedProductsText: string;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - All Products/i;
    this.baseURL = 'https://automationexercise.com/products';
    this.allProductsText = this.page.locator('body').locator('text=All Products');
    this.searchProductInput = this.page.getByRole('textbox', { name: 'Search Product' });
    this.searchButton = this.page.getByRole('button', { name: '' });
    this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartLink = this.page.getByRole('link', { name: 'View Cart' });
    this.searchedProductsText = 'Searched Products';
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }

  async checkAllProductsForProduct(testProduct: ProductData.ProductData): Promise<void> {
    await expect(this.allProductsText).toBeVisible();
    await expect(this.page.locator('body')).toContainText(testProduct.product.name);
  }

  async clickFirstViewProductOnAllProducts(): Promise<void> {
    await this.page.locator('.choose > .nav > li > a').first().click();
  }

  async clickViewProductOnAllProducts(index = 1): Promise<void> {
    if (index === 1) {
      await this.clickFirstViewProductOnAllProducts();
    } else {
      const child = index + 2;
      await this.page.locator(`div:nth-child(${child}) > .product-image-wrapper > .choose > .nav > li > a`).click();
    }
  }

  async searchForProduct(productName: string): Promise<void> {
    await this.searchProductInput.fill(productName);
    await this.searchButton.click();
    await expect(this.page.locator('body')).toContainText(this.searchedProductsText);
    await expect(this.page.getByText(productName).nth(1)).toBeVisible();
  }

  async clickFirstProductOnSearchedProducts(): Promise<void> {
    await this.page.locator('.choose > .nav > li > a').first().click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async clickViewCart(): Promise<void> {
    await this.viewCartLink.click();
  }

  async addToCart(index = 0): Promise<void> {
    await this.page.locator('.productinfo > img').nth(index).hover();
    await this.page.locator('.overlay-content > .btn').nth(index).waitFor({ state: 'visible' });
    await this.page.locator('.overlay-content > .btn').nth(index).click();
  }
}

export default { ProductsPage };
