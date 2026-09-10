export interface Files {
  id: string;
  title: string;
  type: string;
  path: string;
  createdAt: string;
  updatedAt: string;
  table_name: string;
  table_id: string;
  createdBy: string;
}

export interface ProductItem {
  id: string;
  title: string;
  price: number;
  unit_price: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  companyProfileId: string;
  files: Files;
}
