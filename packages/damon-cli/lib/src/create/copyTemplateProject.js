import chalk from "chalk";
import glob from "glob";
import fs from "fs-extra";
import Mustache from "mustache";
import path from "path";
var copyPackageTpl = function (cwd, params) {
    var tpl = fs.readFileSync(params.templatePath, "utf-8");
    var content = Mustache.render(tpl, params.context);
    console.log("".concat(chalk.green("Write:"), " ").concat(path.relative(cwd, params.target)));
    fs.writeFileSync(params.target, content, "utf-8");
};
function copyTemplateProject(target, packageParams, template) {
    var repository = template.repository;
    var sourcePath = path.resolve(path.dirname(import.meta.url.slice('file://'.length)), "../../../".concat(repository));
    var files = glob.sync("**/*", {
        cwd: sourcePath,
        dot: true,
        ignore: ["**/node_modules/**"],
    });
    files.forEach(function (file) {
        var absFile = path.join(sourcePath, file);
        var absTarget = path.join(target, file);
        if (fs.statSync(absFile).isDirectory()) {
            if (!fs.existsSync(absTarget)) {
                return fs.mkdirSync(absTarget);
            }
            return;
        }
        else {
            if (file.endsWith(".tpl")) {
                copyPackageTpl(target, {
                    templatePath: absFile,
                    target: path.join(target, file.replace(/\.tpl$/, "")),
                    context: { packageParams: packageParams },
                });
            }
            else {
                fs.copyFileSync(absFile, absTarget);
            }
        }
    });
}
export default copyTemplateProject;
//# sourceMappingURL=copyTemplateProject.js.map