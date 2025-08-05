export namespace ProductData {
  export enum ProductName {
    BlueTop = 'Blue Top',
    MenTShirt = 'Men Tshirt',
    SleevelessDress = 'Sleeveless Dress',
    StylishDress = 'Stylish Dress',
    WinterTop = 'Winter Top',
    SummerWhiteTop = 'Summer White Top',
    MadameTopForWomen = 'Madame Top For Women',
    FancyGreenTop = 'Fancy Green Top'
  }

  export enum ProductAvailability {
    InStock = 'In Stock'
  }
  export enum ProductCondition {
    New = 'New'
  }
  export enum ProductBrand {
    Polo = 'Polo',
    HAndM = 'H&M',
    Madame = 'Madame',
    MastAndHarbour = 'Mast & Harbour'
  }
  export enum ProductCategory {
    Women = 'Women',
    Men = 'Men',
    Kids = 'Kids'
  }
  export enum ProductSubCategory {
    Dress = 'Dress',
    Tops = 'Tops',
    Saree = 'Saree',
    TShirts = 'Tshirts',
    Jeans = 'Jeans',
    TopsAndShirts = 'Tops & Shirts'
  }
  export enum ProductCategoryId {
    WomenDress = 1,
    WomenTops = 2,
    WomenSaree = 3,
    MenTShirts = 4,
    MenJeans = 5,
    KidsDress = 6,
    KidsTopsAndShirts = 7
  }

  export type Product = {
    id: number;
    name: ProductName;
    category: ProductCategoryId;
    price: number;
    availability: ProductAvailability;
    condition: ProductCondition;
    brand: ProductBrand;
    quantity: number;
  };
  export interface ProductData {
    product: Product;
    categoryDisplayText: string;
    availabilityDisplayText: string;
    conditionDisplayText: string;
    brandDisplayText: string;
    priceDisplayText: string;
    totalDisplayText: string;
  }
  export class ProductContext implements ProductData {
    public product: Product;

    public get categoryDisplayText(): string {
      const { category } = this.product;
      const categoryData = getCategorySubCategoryById(category);

      return categoryData ? `Category: ${categoryData.category} > ${categoryData.subCategory}` : `Category: ${category}`;
    }
    public get availabilityDisplayText(): string {
      return `Availability: ${this.product.availability}`;
    }
    public get conditionDisplayText(): string {
      return `Condition: ${this.product.condition}`;
    }
    public get brandDisplayText(): string {
      return `Brand: ${this.product.brand}`;
    }
    public get priceDisplayText(): string {
      return `Rs. ${this.product.price}`;
    }
    public get totalDisplayText(): string {
      const total = this.product.quantity * this.product.price;
      return `Rs. ${total}`;
    }
    constructor(product: Product) {
      this.product = product;
    }
  }

  // Table of products
  export const products: Product[] = [
    {
      id: 1,
      name: ProductName.BlueTop,
      category: ProductCategoryId.WomenTops,
      price: 500,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.Polo,
      quantity: 1
    },
    {
      id: 2,
      name: ProductName.MenTShirt,
      category: ProductCategoryId.MenTShirts,
      price: 400,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.HAndM,
      quantity: 1
    },
    {
      id: 3,
      name: ProductName.SleevelessDress,
      category: ProductCategoryId.WomenDress,
      price: 1000,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.Madame,
      quantity: 1
    },
    {
      id: 4,
      name: ProductName.StylishDress,
      category: ProductCategoryId.WomenDress,
      price: 1500,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.Madame,
      quantity: 1
    },
    {
      id: 5,
      name: ProductName.WinterTop,
      category: ProductCategoryId.WomenTops,
      price: 600,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.MastAndHarbour,
      quantity: 1
    },
    {
      id: 6,
      name: ProductName.SummerWhiteTop,
      category: ProductCategoryId.WomenTops,
      price: 400,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.HAndM,
      quantity: 1
    },
    {
      id: 7,
      name: ProductName.MadameTopForWomen,
      category: ProductCategoryId.WomenTops,
      price: 1000,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.Madame,
      quantity: 1
    },
    {
      id: 8,
      name: ProductName.FancyGreenTop,
      category: ProductCategoryId.WomenTops,
      price: 700,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.Polo,
      quantity: 1
    }
  ];
  // Function to get a product by name
  export function getProductByName(name: ProductName): Product {
    const product = products.find((product) => product.name === name);
    if (!product) {
      throw new Error(`Product with name ${name} not found`);
    }
    return product;
  }

  export type ProductCategoryFilter = {
    id: ProductCategoryId;
    category: ProductCategory;
    subCategory: ProductSubCategory;
  };

  export const productCategoryList: ProductCategoryFilter[] = [
    { id: ProductCategoryId.WomenDress, category: ProductCategory.Women, subCategory: ProductSubCategory.Dress },
    { id: ProductCategoryId.WomenTops, category: ProductCategory.Women, subCategory: ProductSubCategory.Tops },
    { id: ProductCategoryId.WomenSaree, category: ProductCategory.Women, subCategory: ProductSubCategory.Saree },
    { id: ProductCategoryId.MenTShirts, category: ProductCategory.Men, subCategory: ProductSubCategory.TShirts },
    { id: ProductCategoryId.MenJeans, category: ProductCategory.Men, subCategory: ProductSubCategory.Jeans },
    { id: ProductCategoryId.KidsDress, category: ProductCategory.Kids, subCategory: ProductSubCategory.Dress },
    { id: ProductCategoryId.KidsTopsAndShirts, category: ProductCategory.Kids, subCategory: ProductSubCategory.TopsAndShirts }
  ];

  export function getCategorySubCategoryById(id: ProductCategoryId): ProductCategoryFilter | undefined {
    return productCategoryList.find((item) => item.id === id);
  }

  export function getCategorySubCategory(category: ProductCategory, subCategory: ProductSubCategory): ProductCategoryFilter | undefined {
    return productCategoryList.find((item) => item.category === category && item.subCategory === subCategory);
  }
}
export default { ProductData };
