"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var create_1 = __importDefault(require("./src/create"));
yargs_1.default
    .strict(true)
    .scriptName("damon")
    .usage("$0 <命令> [选项]")
    .alias("help", "h")
    .alias("version", "v")
    .wrap(null)
    .fail(function (msg, err, yargs) {
    yargs.showHelp();
    if (err)
        process.exit(1);
});
(0, create_1.default)(yargs_1.default);
if (process.argv.slice(2).length) {
    yargs_1.default.parse(process.argv.slice(2));
}
else {
    yargs_1.default.showHelp();
}
//# sourceMappingURL=index.js.map