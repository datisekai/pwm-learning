interface DetailAction {
  id: number;
  name: string;
  actionId: number;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActionModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  detailActions: DetailAction[];
}
