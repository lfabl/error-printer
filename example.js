const error_log = require(".");
const { setMainDirectory } = require(".");

setMainDirectory(__dirname + "/test");

error_log({
    options: { outputFileName: "test.log" },
    message: "halo",
    code: 400,
});
