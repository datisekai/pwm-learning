export interface StatisticCount {
  views: number;
  users: number;
  blogs: number;
  products: number;
}

interface Category {
  id: number;
  name: string;
  speciesId: number;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
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
  category: Category;
  skus: Sku[];
}

interface Blog {
  name: string;
  thumbnail: string;
}

export interface StatisticLatest {
  product: Product[];
  blog: Blog[];
}
