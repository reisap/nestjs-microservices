export class AbstractResponse {
    protected code?: number
    protected status?: string
    protected data?: any
    constructor({code: code, status: status, data: data}) {
        this.code = code
        this.status = status
        this.data = data
    }
}

export class ErrorResponse {
    code?: number
    status?: string
    message?: string
}
