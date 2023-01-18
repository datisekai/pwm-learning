interface Product {
  id: number;
  name: string;
}

interface Attribute {
  id: number;
  name: string;
}

interface Detailattribute {
  id: number;
  name: string;
}

interface Skuvalue {
  id: number;
  attributeId: number;
  detailAttributeId: number;
  skuId: number;
  detailattributeId: number;
  attribute: Attribute;
  detailattribute: Detailattribute;
}

export interface SkuModel {
  id: number;
  productId: number;
  sku: string;
  price: number;
  discount: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  skuvalues: Skuvalue[];
}
