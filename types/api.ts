export interface ApiResult<T> {
    data: T,
    message: string;
    statusCode: number;
    isSuccess: boolean;
}

