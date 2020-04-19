export class Product {
    _id: string;
    category: string;
    subCategory: string;
    microCategory: string;
    name: string;
    price: number;
    model: string;
    brand: string;
    comments: Array<any>;
    imageUrl: string;
    link: string;
    cargo: boolean;
    storeId: string;
    available: boolean;
    details: string;
    productCode: string;
    eanUpcCode: string;
    priceIncVat: string;
    searchCount: {
      count: number;
      words: Array<any>;
    };
    clickCount: number;
  }