/**
 * @module lib/error
 *
 * AppError class that includes status codes.
 * 
 *
 * Exports:
 *  - STATUS_CODES
 *  - StatusCode
 *  - AppError
 *
 * Uses as const map for status code to be able to pass strings.
 *
 * @author Ali Zaghloul
 * @license MIT
 */


export const STATUS_CODES = {
  // Informational
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  EARLY_HINTS: 103,

  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,

  // Redirection
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,

  // Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  I_AM_A_TEAPOT: 418,
  UNPROCESSABLE_ENTITY: 422,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,

  // Server Error
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
} as const;

export type StatusCode = keyof typeof STATUS_CODES;

/**
 * A custom error class for application-specific errors.
 *
 * Extends the native `Error` class and adds structured properties such as
 * HTTP status code and an operational flag to distinguish expected errors
 * (e.g., bad input) from programming errors (e.g., bugs).
 *
 * This is useful for consistent error handling throughout the application.
 *
 * @example
 * throw new AppError('User not found', 'NOT_FOUND');
 */
export class AppError extends Error {
  /**
   * The status code associated with the error, derived from STATUS_CODES.
   */
  public readonly statusCode: (typeof STATUS_CODES)[StatusCode];

  /**
   * A flag indicating whether the error is expected (operational) or a bug.
   * Operational errors can be safely shown to users or logged.
   */
  public readonly isOperational: boolean;

  /**
   * Creates an instance of AppError.
   *
   * @param message 
   *   A descriptive message explaining the error.
   * @param statusCodeKey 
   *   A key from the `StatusCode` enum to map to an HTTP status code.
   * @param isOperational 
   *   Whether the error is expected (default: `true`).
   */
  constructor(message: string, statusCodeKey: StatusCode, isOperational: boolean = true) {
    super(message);
    this.statusCode = STATUS_CODES[statusCodeKey];
    this.isOperational = isOperational;

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

