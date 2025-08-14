export interface LoginResponse {
  IsSuccess: boolean,
  Message: string,
  StatusCode?: number
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface AuthSuccessResponse {
    success: boolean;
    message: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
}
