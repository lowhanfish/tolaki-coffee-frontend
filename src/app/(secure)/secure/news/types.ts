export interface NewsResponseInterface {
  id: string;
  title: string;
  description: string;
  news: string;
  source: string;
  file: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface NewsCreateInterface {
  id?: string;
  title: string;
  description: string;
  news: string;
  source: string;
  file: File | null;
}

export interface NewsResponseListInterface {
  skip: number;
  limit: number;
  total: number;
  data: NewsResponseInterface[];
}
