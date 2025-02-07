export interface Booking {
  id: number;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status: 'Bekræftet' | 'Afventer' | 'Annulleret';
  message?: string;
}

export interface Subscriber {
  id: number;
  email: string;
  date: string;
  interests: string[];
  isActive: boolean;
}

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface LoginCredentials {
  email: string;
  password: string;
} 