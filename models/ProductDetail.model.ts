 interface User {
    id: number;
    email: string;
    name?: any;
    phone?: any;
    status: boolean;
    permissionId: number;
    createdAt: Date;
    updatedAt: Date;
    point: number;
}

 interface Skuvalue {
    id: number;
    productId: number;
    attributeId: number;
    detailAttributeId: number;
    skuId: number;
    createdAt: Date;
    updatedAt: Date;
    detailattributeId: number;
}

 interface Sku {
    id: number;
    productId: number;
    sku: string;
    price: number;
    discount: number;
    image?: any;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    skuvalues: Skuvalue[];
}

 interface Category {
    id: number;
    name: string;
    speciesId: number;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
}

 interface Detailattribute {
    id: number;
    name: string;
    attributeId: number;
    createdAt: Date;
    updatedAt: Date;
}

 interface Attribute {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    detailattributes: Detailattribute[];
}

 interface Productattribute {
    id: number;
    productId: number;
    attributeId: number;
    createdAt: Date;
    updatedAt: Date;
    attribute: Attribute;
}

 interface Detailattribute2 {
    id: number;
    name: string;
    attributeId: number;
    createdAt: Date;
    updatedAt: Date;
}

 interface Attribute2 {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    detailattributes: Detailattribute2[];
}



 interface ProductImage {
    id: number;
    productId: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  }
export interface ProductDetailModel {
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
    user: User;
    skus: Sku[];
    category: Category;
    productattributes: Productattribute[];
    attributes: Attribute2[];
    productimages:ProductImage[]
}