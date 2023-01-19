interface Product {
    id: number;
    name: string;
    thumbnail: string;
    description: string;
    status: boolean;
    categoryId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
}

export interface PopularModel {
    id: number;
    productId: number;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
}