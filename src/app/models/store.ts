export class Store {
    _id: string;
    email?: string;
    password?: string;
    token?: string;
    photo?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    storeName?: string;
    tc?: number;
    balance?: number;
    city?: string;
    country?: string;
    address?: string;
    state?: boolean;
    transferList?: [];
    registeredDate?: Date;
    products?: [];
    tokens?: [];
    xml?: {
      state?: boolean,
      link?: string
    };
    details?: string;
    eft?: boolean;
    payAtTheDoor?: boolean;
    creditCard?: boolean;
    __v?: number;
  }