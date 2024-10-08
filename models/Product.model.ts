export interface Category {
  id: number;
  name: string;
  speciesId: number;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

export interface User {
  id: number;
  email: string;
  name?: any;
  phone?: any;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  point: number;
}

export interface Sku {
  id: number;
  productId: number;
  sku: string;
  price: number;
  discount: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  priceDisplay: string;
}

export interface Detailattribute {
  id: number;
  name: string;
  attributeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attribute {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  detailattributes: Detailattribute[];
}

export interface Productattribute {
  id: number;
  productId: number;
  attributeId: number;
  createdAt: Date;
  updatedAt: Date;
  attribute: Attribute;
}

export interface ProductImage {
  id: number;
  productId: number;
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
  slug: string;
  category: Category;
  user: User;
  skus: Sku[];
  popular?: any;
  productattributes: Productattribute[];
  productimages: ProductImage[];
}
