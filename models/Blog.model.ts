interface CategoriesBlog {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  slug: string;
}

interface User {
  id: number;
  email: string;
}

export interface BlogModel {
  id: number;
  name: string;
  categoriesBlogId: number;
  content: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  userId: number;
  thumbnail: string;
  slug: string;
  categories_blog?: CategoriesBlog;
  user?: User;
  view: { count: number };
}

