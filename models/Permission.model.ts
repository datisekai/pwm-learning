export interface PermissionModel {
  id: number;
  name: string;
  note?: any;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  perDetailActions: { detailActionId: number }[];
}
