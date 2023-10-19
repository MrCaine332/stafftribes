
export type ErrorsToSend = {
    [key: string]: {
        msg: string
    }
}

export class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors: ErrorsToSend = {}) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static BadRequest(message: string, errors: ErrorsToSend = {}) {
        return new ApiError(400, message, errors)
    }

    static UnauthorizedError() {
        return new ApiError(401, "Unauthorized access")
    }

    static Forbidden() {
        return new ApiError(403, "Forbidden")
    }

    static NotFound() {
        return new ApiError(404, "Not found")
    }

    static Conflict(message: string, errors: ErrorsToSend = {}) {
        return new ApiError(409, message, errors)
    }
}