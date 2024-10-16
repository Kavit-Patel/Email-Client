export interface EmailItem {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
  isRead?: boolean;
  isFavorite?: boolean;
}

export interface EmailListResponse {
  list: EmailItem[];
  total: number;
}

export interface EmailBodyResponse {
  id: string;
  body: string;
}
