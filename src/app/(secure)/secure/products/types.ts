export interface ProductFileInterface {
  id: string;
  title: string;
  type: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponseInterface {
  id: string;
  title: string;
  price: number | string;
  unit_price: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  companyProfileId: string;
  files: ProductFileInterface[];
}

export interface ProductResponseListInterface {
  total: number;
  skip: number;
  limit: number;
  data: ProductResponseInterface[];
}

export interface ProductCreateInterface {
  id?: string;
  title: string;
  price: number;
  unit_price: string;
  description: string;
  files: File[];
}
