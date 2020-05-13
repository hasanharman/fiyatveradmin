export class Category {
    _id?: string;
    name: string;
    slug: string;
    image?: string;
    items: number;
    children?: {
        _id?: string;
        name: string;
        slug: string;
        image?: string;
        items: number;
        children?: {
            _id?: string;
            name: string;
            slug: string;
            image?: string;
            items: number;
        }
    }
    __v?: number
}