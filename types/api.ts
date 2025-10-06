export interface ApiResult<T> {
    data: T,
    message: string,
    errors: [string],
    statusCode: number,
    isSuccess: boolean
}

