var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import path from "path";
import fs from "fs-extra";
import { logger, yarnEnable } from "@damon/utils";
import inquirer from "inquirer";
import ValidateNpmPackageName from "validate-npm-package-name";
import chalk from "chalk";
import getPackageParams from "./getPackageParams.js";
import getTemplateParams from "./getTemplateParams.js";
import getProjectName from "./getProjectName.js";
import copyTemplateProject from "./copyTemplateProject.js";
import install from "./install.js";
export default function registerCreate(yargs) {
    yargs.command("create [name]", "创建项目", function (yargs) {
        yargs.positional("name", {
            type: "string",
            describe: "项目/工程名称",
        });
    }, function (argv) {
        return __awaiter(this, void 0, void 0, function () {
            var projectName, projectPath, result, isOverwrite, packageParams, templateParams, pkgManagerParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectName = argv.name;
                        if (!!argv.name) return [3, 2];
                        return [4, getProjectName()];
                    case 1:
                        projectName = _a.sent();
                        _a.label = 2;
                    case 2:
                        projectPath = path.resolve(process.cwd(), projectName);
                        result = ValidateNpmPackageName(projectName);
                        if (!result.validForNewPackages) {
                            console.error(chalk.red("Invalid project name: \"".concat(argv.name, "\"")));
                            result.errors &&
                                result.errors.forEach(function (err) {
                                    console.error(chalk.red.dim("Error: " + err));
                                });
                            result.warnings &&
                                result.warnings.forEach(function (warn) {
                                    console.error(chalk.yellowBright.dim("Warning: " + warn));
                                });
                            return [2];
                        }
                        if (!fs.existsSync(projectPath)) return [3, 6];
                        return [4, inquirer.prompt({
                                name: "isOverwrite",
                                type: "confirm",
                                message: "\u5F53\u524D\u76EE\u5F55\u5DF2\u5B58\u5728\u6587\u4EF6\u5939".concat(chalk.cyan(projectName), "\uFF0C\u662F\u5426\u8986\u76D6\uFF1F"),
                                default: true,
                            })];
                    case 3:
                        isOverwrite = (_a.sent()).isOverwrite;
                        if (!isOverwrite) return [3, 5];
                        logger.log("\n\u5220\u9664\u76EE\u5F55 ".concat(chalk.cyan(projectPath), "..."));
                        return [4, fs.remove(projectPath)];
                    case 4:
                        _a.sent();
                        return [3, 6];
                    case 5: return [2];
                    case 6: return [4, getPackageParams(projectName)];
                    case 7:
                        packageParams = _a.sent();
                        return [4, getTemplateParams()];
                    case 8:
                        templateParams = _a.sent();
                        pkgManagerParams = { pkgManager: "npm" };
                        if (yarnEnable()) {
                            pkgManagerParams.pkgManager = "yarn";
                        }
                        logger.log("\u5F00\u59CB\u521B\u5EFA ".concat(projectName, " \u9879\u76EE!"));
                        return [4, fs.mkdir(projectPath)];
                    case 9:
                        _a.sent();
                        copyTemplateProject(projectPath, packageParams, templateParams);
                        return [4, install(projectPath, pkgManagerParams.pkgManager)];
                    case 10:
                        _a.sent();
                        logger.log("\uD83C\uDF89  Successfully created project ".concat(chalk.yellow(argv.name), "."));
                        logger.log("\uD83D\uDC49  Get started with the following commands:\n\n" +
                            chalk.cyan(" ".concat(chalk.gray("$"), " cd ").concat(argv.name, "\n")) +
                            chalk.cyan(" ".concat(chalk.gray("$"), " ").concat(pkgManagerParams.pkgManager === "yarn"
                                ? "yarn serve"
                                : "npm run serve")));
                        return [2];
                }
            });
        });
    });
}
//# sourceMappingURL=index.js.map