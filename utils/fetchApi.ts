import { API_BASE_URL } from "../constants/api";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: string[];
  statusCode: number;
  isSuccess: boolean;
}

export class HttpError extends Error {
    constructor(
        message: string,
        public statusCode: number, 
        public apiResponse: ApiResponse<any>    
    ) {
     super(message);
     this.name = 'Http Error';   
    }
}

const defaultHeaders = {
    "Content-Type": "application/json"
}

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit
): Promise<ApiResponse<T>>
{
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
        credentials: 'include',
        headers: {
            ...options.headers,
            ...defaultHeaders
        },
        ...options
    }

    const response = await fetch(url, config);
    let apiResult: ApiResponse<T>;
    
    try {
        apiResult = await response.json();
    } catch (jsonError) {
        throw new HttpError(
            `Invalid server response: ${response.status}`,
            response.status,
            { 
                data: null as any,
                errors: [`Server return invalid JSON response. ${jsonError}`],
                statusCode: response.status,
                isSuccess: false 
            }
        );
    }

    if(!response.ok) {
        throw new HttpError(
            apiResult.message || `Request failed status ${response.status}`,
            response.status,
            apiResult
        );
    }
    return apiResult;
}

export const get = <T>(endpoint: string, options: RequestInit = {}) =>
    fetchApi<T>(endpoint, {...options, method: 'GET'});

export const post = <T>(endpoint: string, body: any, options: RequestInit = {}) =>
    fetchApi<T>(endpoint, {
        ...options, 
        method: 'POST',
        body: JSON.stringify(body)});

export const put = <T>(endpoint: string, body: any, options: RequestInit = {}) =>
    fetchApi<T>(endpoint, {
        ...options, 
        method: 'PUT',
        body: JSON.stringify(body)});

export const del = <T>(endpoint: string, options: RequestInit = {}) =>
    fetchApi<T>(endpoint, {
        ...options,
        method: 'DELETE',
    });