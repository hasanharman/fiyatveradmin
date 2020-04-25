export class User {
    _id: string;
    email: string;
    password: string;
    tokens?: string;
    photo?: string;
    firstName: string;
    lastName: string;
    phone: string;
    registerDate: Date;
    history: {
      comments: Array<any>;
      searches: Array<any>;
      products: Array<any>;
      stores: Array<any>;
      clicks: Array<any>;
    }
  }