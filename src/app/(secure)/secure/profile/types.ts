export interface ProfileCreateInterface {
  brand: string;
  quotes: string;
  description: string;
  detail: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  file?: File | null;
}

export interface ProfileResponseInterface {
  id: string;
  brand: string;
  quotes: string;
  description: string;
  detail: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  file?: string | null;
  createdAt: string;
  updateAt: string;
  createdBy: string;
}

export interface ProfileResponseListInterface {
  skip: number;
  limit: number;
  total: number;
  data: ProfileResponseInterface[];
}
