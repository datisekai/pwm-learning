interface Detailorder {
  id: number;
  orderId: number;
  skuId: number;
  price: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Infoorder {
  id: number;
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
