// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  number?: string;
  phone?: string;
  user_type: string;
  profile_image?: string | null;
  profileImage?: string | null;
  uid?: string;
  email_verified_at?: string | null;
  emailVerifiedAt?: string | null;
  created_at?: string;
  createdAt?: string;
  address?: string;
  company?: string;
  location?: string;
  stats?: {
    companies: number;
    tickets: number;
    projects: number;
  };
}

export interface Session {
  token_id: string;
  ip_address: string;
  location: string;
  created_at: string;
  last_used_at: string;
}

export interface ButtonPosition {
  x: number;
  y: number;
  width: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginSessionsResponse {
  total_logins: number;
  sessions: Session[];
}
