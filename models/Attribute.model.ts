export interface Detailattribute {
  id: number;
  name: string;
  attributeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttributeModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  detailattributes: Detailattribute[];
}

export interface AttributeAdd {
  uuid: string;
  id: number;
  name: string;
  detailattributes: Detailattribute[];
}
