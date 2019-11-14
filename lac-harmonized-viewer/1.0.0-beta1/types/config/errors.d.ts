declare type ErrorType = 'invalid_locale' | 'invalid_language_code' | 'invalid_country_code';
declare class CustomError {
    error: ErrorType;
    constructor(error: ErrorType);
}
