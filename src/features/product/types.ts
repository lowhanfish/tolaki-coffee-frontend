export interface FilesInterface {
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

export interface ProductInterface {
  id: string;
  title: string;
  price: number | string;
  unit_price: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  companyProfileId: string;
  files: FilesInterface[];
}

export interface ProductListInterface {
  total: number;
  skip: number;
  limit: number;
  data: ProductInterface[];
}
