export class Product {
    _id: string;
    category: string;
    subCategory: string;
    microCategory: string;
    name: string;
    price: number;
    model: string;
    brand: string;
    features: Array<any>;
    comments: Array<any>;
    imageUrls: Array<any>;
    links: Array<any>;
    cargo: boolean;
    storeId: string;
    available: boolean;
    searchCount: {
      count: number;
      words: Array<any>;
    };
    clickCount: number;
  }