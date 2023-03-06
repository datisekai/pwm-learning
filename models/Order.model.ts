 interface Product {
  name: string;
  slug: string;
  thumbnail: string;
}

 interface Sku {
  image: string;
  product: Product;
}

 interface Detailorder {
  id: number;
  orderId: number;
  skuId: number;
  price: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  sku: Sku;
  qty:number
}

 interface Infoorder {
  id: number;
  name: string;
  phone: string;
  address: string;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;
}

 interface Customer {
  id: number;
  email: string;
}

 interface Staff {
  id: number;
  email: string;
}

export interface OrderModel {
  id: number;
  customerId: number;
  total: number;
  staffId: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  userId?: any;
  detailorders: Detailorder[];
  infoorder: Infoorder;
  customer: Customer;
  staff: Staff;
}
