export class AbstractResponse {
    code: number
    status: string
    data: any
}

export class ErrorResponse {
    code: number
    status: string
    message: string
}
