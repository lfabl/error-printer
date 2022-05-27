const fs = require("fs");
const moment = require("moment");

let MAIN_DIRECTORY = __dirname.replace(/\\/g, '/').replace("/node_modules/error-printer", "");
let OPTIONS = {
  logFileName: "error_log",
  messageTitle: "Error message",
  codeTitle: "Error code",
  datePureTitle: "Error Date ( Pure )",
  dateFormattedTitle: "Error Date ( Formatted )",
  formattedDateConfig: "DD MMMM YYYY hh:mm A",
  isWritePureDate: true,
  isWriteFormattedDate: true
};

const setMainDirectory = (directory) => {
  MAIN_DIRECTORY = directory;
}

const setOptions = (options) => {
  OPTIONS = {
    ...OPTIONS,
    ...options
  }
};

const error_log = ({
  options,
  message,
  code
}) => {
  const _options = {
    ...OPTIONS,
    ...options
  };

  // Error file exists control:
  const fileExists = fs.existsSync(MAIN_DIRECTORY + `/${_options.logFileName}`);

  // If error file do not exists, it will be create:
  if (!fileExists) {
    fs.writeFileSync(MAIN_DIRECTORY + `/${_options.logFileName}`, "");
  }

  // Error message:
  let errorData = `
${_options.messageTitle}: ${message}
`;

  if (code) {
    errorData += `${_options.codeTitle}: ${code}`;
  }

  if (_options.isWritePureDate) {
    errorData += `${_options.datePureTitle}: ${new Date().toISOString()}\n`;
  }

  if (_options.isWriteFormattedDate) {
    errorData += `${_options.dateFormattedTitle}: ${moment(new Date()).format(_options.formattedDateConfig)}\n`;
  }

  errorData += `\n`;

  // Write new error message to error_log file.
  fs.appendFile(MAIN_DIRECTORY + `/${_options.logFileName}`, errorData, err => {
    if (err) {
      console.error(err);
      return err;
    }
  });
};

module.exports = error_log;
module.exports.setMainDirectory = setMainDirectory;
module.exports.setOptions = setOptions;
