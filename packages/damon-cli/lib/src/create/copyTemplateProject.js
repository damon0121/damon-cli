"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var glob_1 = __importDefault(require("glob"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var mustache_1 = __importDefault(require("mustache"));
var path_1 = __importDefault(require("path"));
var copyPackageTpl = function (cwd, params) {
    var tpl = fs_extra_1.default.readFileSync(params.templatePath, "utf-8");
    var content = mustache_1.default.render(tpl, params.context);
    console.log("".concat(chalk_1.default.green("Write:"), " ").concat(path_1.default.relative(cwd, params.target)));
    fs_extra_1.default.writeFileSync(params.target, content, "utf-8");
};
function copyTemplateProject(target, packageParams, template) {
    var repository = template.repository;
    var sourcePath = path_1.default.resolve(__dirname, "../../".concat(repository));
    var files = glob_1.default.sync("**/*", {
        cwd: sourcePath,
        dot: true,
        ignore: ["**/node_modules/**"],
    });
    files.forEach(function (file) {
        var absFile = path_1.default.join(sourcePath, file);
        var absTarget = path_1.default.join(target, file);
        if (fs_extra_1.default.statSync(absFile).isDirectory()) {
            if (!fs_extra_1.default.existsSync(absTarget)) {
                return fs_extra_1.default.mkdirSync(absTarget);
            }
            return;
        }
        else {
            if (file.endsWith(".tpl")) {
                copyPackageTpl(target, {
                    templatePath: absFile,
                    target: path_1.default.join(target, file.replace(/\.tpl$/, "")),
                    context: { packageParams: packageParams },
                });
            }
            else {
                fs_extra_1.default.copyFileSync(absFile, absTarget);
            }
        }
    });
}
exports.default = copyTemplateProject;
//# sourceMappingURL=copyTemplateProject.js.map