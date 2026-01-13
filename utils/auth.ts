import { get, post, put, del, HttpError } from "../utils/fetchApi";
import { AuthError, AuthSuccessResponse, LoginRequest, LoginResponse, SignupRequest, SignupResponse, User } from "../types/auth"


export async function loginUser(loginRequest: LoginRequest) {
        const response = await post<LoginResponse>("/api/auth/login", loginRequest);

        return {
            success: true,
            message: response.message || 'Login Successful',
            data: response.data
        };
}

export const signupUser = async (signupRequest: SignupRequest): Promise<AuthSuccessResponse> => {
        const response = await post<SignupResponse>("/api/auth/register", signupRequest);

        return {
                success: true,
                message: response.message || 'Registration successful',
                data: response.data
            };
    }

export const logoutUser = async (): Promise<AuthSuccessResponse> => {
        const response = await post<object>("/api/auth/logout", {});

        return {
          success: true,
          message: response.message || 'Logged out successfully'
        };
}

export async function getCurrentUser():Promise<User | null> {
   try {
      const response = await get<User>('/api/users/me');

      return response.isSuccess ? response.data : null;
   } catch (error) {
      if (error instanceof HttpError && error.statusCode === 401)
        return null;

      console.error("Not Authorized to fetch User data", error);
      throw error;
   }
}

export async function checkAuthentication(): Promise<boolean> {
   try {
      const response = await get<any>("/api/auth/verify");

      return response.isSuccess;
   } catch {
      return false;
   }
}