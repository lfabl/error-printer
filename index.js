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

const setMainDirectory = (directory) => {
    MAIN_DIRECTORY = directory;
};

const setOptions = (options) => {
    OPTIONS = {
        ...OPTIONS,
        ...options,
    };
};

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
