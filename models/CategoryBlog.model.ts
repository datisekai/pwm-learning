export interface CategoryBlogModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  slug: string;
  blogs?: BlogModelCb[];
  isMenu:boolean
}

export interface BlogModelCb {
  id: number;
  name: string;
  categoriesBlogId: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  userId: number;
  thumbnail: string;
  slug: string;
}
