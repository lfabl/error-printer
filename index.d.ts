/**
 * Sets directory of the output log file.
 */
export function setMainDirectory(directory: string): void;

export type Options = {
    /**
     * Name of the output file.
     * @default "error_log"
     */
    outputFileName?: string;
    /**
     * Prefix string to be appended just before the error message.
     * @default "Error Message"
     */
    errorMessagePrefix?: string;
    /**
     * Prefix string to be appended just before the error code.
     * @default "Error Code"
     */
    errorCodePrefix?: string;
    /**
     * Prefix string to be appended just before the error date.
     * @default "Error Date"
     */
    errorDatePrefix?: string;
    /**
     * Format string for date formatting See {@link https://momentjs.com/docs/#/displaying/format/ here} for details.
     */
    errorDateFormat?: string;
};

/**
 * Set options to be used globally.
 * @param  {Options} options
 */
export function setOptions(options?: Options): void;

/**
 * @example
 * ```
 * // ES6
 * import error_log from "error-printer";
 *
 * error_log({
 *    options: {
 *      outputFileName: "test.log",
 *      errorMessagePrefix: "Message",
 *      errorCodePrefix: "Code",
 *      errorDatePrefix: "OccuredAt",
 *      errorDateFormat: "DD MMMM YYYY hh:mm A",
 *    },
 *    message: "halo",
 *    code: 400,
 * });
 * ```
 */
declare function error_log(params: {
    message: string;
    options?: Options;
    code?: string;
}): void;

export = error_log;
