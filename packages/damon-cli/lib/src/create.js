"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@damon/utils");
function registerCreate(yargs) {
    yargs.command("create [name]", "创建项目", function (yargs) {
        yargs.positional("name", {
            type: "string",
            describe: "项目/工程名称",
        });
    }, function (argv) {
        utils_1.logger.warn("\u5F00\u59CB\u521B\u5EFA ".concat(argv.name, " \u9879\u76EE!"));
    });
}
exports.default = registerCreate;
