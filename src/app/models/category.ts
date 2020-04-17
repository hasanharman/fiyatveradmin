export class Category {
  _id?: string;
  category?: {
      name?: string,
      subCategory?: [
          {
              _id?: string;
              name?: string;
              microCategory?: [
                  {
                      _id?: string;
                      name?: string;
                  }
              ]
          }
      ]
  };
  __v?: number
  }