type ErrorType =
    'invalid_locale' |
    'invalid_language_code' |
    'invalid_country_code'

class CustomError {

    error: ErrorType

    constructor(error: ErrorType) {
        this.error = error
    }
}