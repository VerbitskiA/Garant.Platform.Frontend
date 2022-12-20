export namespace ResponsesModel{
  export interface DefaultBackendMessageModel {
    id?: string;
    message: string;
    statusCode: number;
  }

  export enum ResponseCodes{
    GOOD = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    TOO_LONG_SIZE = 413,
    UNPROCESSABLE_ENTITY = 422,
    SERVER_ERROR = 500,
  }

  export const ResponseDefaultMessages = {
    [ResponseCodes.GOOD]: 'Done!',
    [ResponseCodes.BAD_REQUEST]: 'An error has occurred. Please contact our support team',
    [ResponseCodes.UNAUTHORIZED]: 'You are not logged in. Try to log in',
    [ResponseCodes.FORBIDDEN]: 'Your don\'t have permission to access',
    [ResponseCodes.NOT_FOUND]: 'The request for this user could not be found. Try again',
    [ResponseCodes.TOO_LONG_SIZE]: 'An error has occurred. Please contact our support team',
    [ResponseCodes.UNPROCESSABLE_ENTITY]: 'An error has occurred. Please contact our support team',
    [ResponseCodes.SERVER_ERROR]: 'An error has occurred. Please contact our support team',
  }
}
