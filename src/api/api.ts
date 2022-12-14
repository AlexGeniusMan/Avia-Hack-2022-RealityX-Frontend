export const baseURL = process.env.REACT_APP_PRODUCTION_URL || window.location.origin + "/";

export enum StatusCodesEnum {
    Success = 200,
    NotFound = 404,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    ServerError = 500,
}

export type ErrorResponseType<M = '', RC = StatusCodesEnum> = {
    message: M
    status: RC
}
