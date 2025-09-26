export interface ApiResult<T> {
    data: T,
    message: string,
    errorMessages: [string],
    statusCode: number,
    isSuccess: boolean
}

