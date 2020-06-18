export class Product {
    _id: string;
    category: string;
    subCategory: string;
    microCategory: string;
    name: string;
    slug: string;
    price: number;
    model: string;
    brand: string;
    comments: Array<any>;
    images: any;
    categories: Array<string>;
    link: string;
    cargo: boolean;
    storeId: string;
    availability: boolean;
    details: string;
    productCode: string;
    eanUpcCode: string;
    priceIncVat: string;
    reviews: number;
    state: Number;
    sameProducts?: Array<object>;
    editor?: boolean;
    searchCount: {
      count: number;
      words: Array<any>;
    };
    clickCount: number;
    keys?: Array<string>;
    cheapest?: number;
  }