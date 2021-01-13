export interface Review {
    id: string;
    user: {
        id: string;
        name: string;
    };
    rating: number;
    text: string;
    likesCount: number;
    isLiked?: boolean;
    createdOn: string;
}

export interface Photo {
    url: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    discount: number;
    stock: number;
    description: string;
    photos: Photo[];
    reviews: Review[];
}

export interface ProductData {
    product: Product;
}
