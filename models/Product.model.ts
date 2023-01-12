import { CategoryModel } from "./Category.model";

interface User {
  id: number;
  email: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Attribute {
  id: number;
  name: string;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Sku {
  id: number;
  productId: number;
  sku: string;
  price: number;
  discount: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductModel {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  status: boolean;
  categoryId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryModel;
  user: User;
  attributes: Attribute[];
  skus: Sku[];
}
