export class AuthError extends Error {
    readonly statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.name = "AuthError"
        this.statusCode = statusCode
    }
}

export interface LoginResponse {
  IsSuccess: boolean,
  Message: string,
  StatusCode?: number,
}

export interface LoginRequest {
    email: string
    password: string,
}

export interface RegisterRequest {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  streetAddress: string,
  city: string,
  state: string,
  zipcode: string,
}

export interface User {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  streetAddress: string,
  city: string,
  state: string,
  zipcode: string,
  role?: string,
  createdAt: string,
}

export interface AuthContextType {
  user: User | null,
  loading: boolean,
  login: (request: LoginRequest) => Promise<AuthSuccessResponse>,
  logout: () => Promise<void>,
  register: (request: RegisterRequest) => Promise<AuthSuccessResponse>,
  checkAuthStatus: () => Promise<void>,
  isAuthenticated: boolean,
}

export interface AuthSuccessResponse {
    success: boolean,
    message: string,
}

export interface User {
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  streetAddress: string,
  city: string,
  state: string,
  zipcode: string,
}
