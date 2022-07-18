const error_log = require(".");
const { setMainDirectory } = require(".");

setMainDirectory(__dirname + "/test");

error_log({
    options: { logFileName: "test.log" },
    message: "halo",
    code: 400,
});
