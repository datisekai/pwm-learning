
export interface OrderModel {
    id: number;
    customerId: number;
    total: number;
    staffId: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
