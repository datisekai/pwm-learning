interface Permission {
  id: number;
  name: string;
  note?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel {
  id: number;
  email: string;
  status: boolean;
  permissionId: number;
  createdAt: Date;
  updatedAt: Date;
  permission: Permission;
}
