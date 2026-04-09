// types/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  mobile_number?: string;
  user_type: "admin" | "employee" | "super-admin";
  companies?: Array<{ company_slug: string }>;
  created_at?: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  mobile_number: string;
  email?: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}
