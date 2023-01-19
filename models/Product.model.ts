import { CategoryModel } from "./Category.model";

interface User {
  id: number;
  email: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Detailattribute {
  id: number;
  name: string;
  productId: number;
  attributeId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SkuValues {
  id: number;
  productId: number;
  attributeId: number;
  detailAttributeId: number;
  skuId: number;
  createdAt: Date;
  updatedAt: Date;
  detailattributeId: number;
}

interface Attribute {
  id: number;
  name: string;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  detailattributes?: Detailattribute[];
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
  skuvalues:SkuValues[]
}

interface Popular {
  id: number;
  productId: number;
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
  popular?:Popular | null
  slug:string
}
