const fs = require("fs");
const moment = require("moment");

let MAIN_DIRECTORY = __dirname
    .replace(/\\/g, "/")
    .replace("/node_modules/error-printer", "");
let OPTIONS = {
    outputFileName: "error_log",
    errorMessagePrefix: "Error Message",
    errorCodePrefix: "Error Code",
    errorDatePrefix: "Error Date",
    errorDateFormat: undefined,
};

/**
 * Sets directory of the output log file
 * @param {string} directory
 */
const setMainDirectory = (directory) => {
    MAIN_DIRECTORY = directory;
};

/**
 * Set options to be used globally
 * @param {{
 *  outputFileName?: string,
 *  errorMessagePrefix?: string,
 *  errorCodePrefix?: string,
 *  errorDatePrefix?: string,
 *  errorDateFormat?: string
 * }} options
 */
const setOptions = (options) => {
    OPTIONS = {
        ...OPTIONS,
        ...options,
    };
};

/**
 * @typedef {{
 *  outputFileName?: string,
 *  errorMessagePrefix?: string,
 *  errorCodePrefix?: string,
 *  errorDatePrefix?: string,
 *  errorDateFormat?: string
 * }} Options
 * @property {string} outputFileName - (optional) Name of the output file. Default value: "error_log".
 * @property {string} errorMessagePrefix - (optional) Prefix string to be appended just before the error message. Default value: "Error Message".
 * @property {string} errorCodePrefix - (optional) Prefix string to be appended just before the error code. Default value: "Error Code".
 * @property {string} errorDatePrefix - (optional) Prefix string to be appended just before the error date. Default value: "Error Date".
 * @property {string} errorDateFormat - (optional) Format string for date formatting {@link https://momentjs.com/docs/#/displaying/format/}
 *
 * @typedef {{
 *  message: string,
 *  code: string,
 *  options?: Options
 * }} Params
 * @property {string} message - error message to be printed
 * @property {string} code - error code to be printed
 * @property {Options} options - (optional) printing options
 *
 * @param {Params} params
 *
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
const error_log = ({ options, message, code }) => {
    const _options = {
        ...OPTIONS,
        ...options,
    };

    // Check whether file exists
    const fileExists = fs.existsSync(
        MAIN_DIRECTORY + `/${_options.logFileName}`
    );

    // Create file if it does not exist
    if (!fileExists) {
        fs.writeFileSync(MAIN_DIRECTORY + `/${_options.logFileName}`, "");
    }

    // Error message:
    let errorData = `${_options.errorMessagePrefix}: ${message}\n`;

    if (code) {
        errorData += `${_options.errorCodePrefix}: ${code}\n`;
    }

    if (!_options.errorDateFormat) {
        errorData += `${
            _options.errorDatePrefix
        }: ${new Date().toISOString()}\n`;
    } else {
        errorData += `${_options.errorDatePrefix}: ${moment(new Date()).format(
            _options.errorDateFormat
        )}\n`;
    }

    errorData += `\n`;

    // Write new error message to output file.
    fs.appendFile(
        MAIN_DIRECTORY + `/${_options.logFileName}`,
        errorData,
        (err) => {
            if (err) {
                console.error(err);
                return err;
            }
        }
    );
};

module.exports = error_log;
module.exports.setMainDirectory = setMainDirectory;
module.exports.setOptions = setOptions;
