import chalk from "chalk";
import glob from "glob";
import fs from "fs-extra";
import Mustache from "mustache";
import path from "path";
import { IPkgParams } from "./getPackageParams";
import { ITplParams } from "./getTemplateParams";

const copyPackageTpl = (
  cwd: string,
  params: { templatePath: string; target: string; context: object }
) => {
  const tpl = fs.readFileSync(params.templatePath, "utf-8");
  const content = Mustache.render(tpl, params.context);
  console.log(`${chalk.green("Write:")} ${path.relative(cwd, params.target)}`);
  fs.writeFileSync(params.target, content, "utf-8");
};

// 复制模板
function copyTemplateProject(
  target: string,
  packageParams: IPkgParams,
  template: ITplParams
) {
  const { repository } = template;
  // 由于改为了esm，导致__dirname不可用，故用import.meta.url代替
  // @ts-ignore
  const sourcePath = path.resolve(path.dirname(import.meta.url.slice('file://'.length)), `../../../${repository}`);
  const files = glob.sync("**/*", {
    cwd: sourcePath,
    dot: true,
    ignore: ["**/node_modules/**"],
  });
  files.forEach((file) => {
    const absFile = path.join(sourcePath, file);
    const absTarget = path.join(target, file);
    // 是否是目录
    if (fs.statSync(absFile).isDirectory()) {
      // 是否已存在
      if (!fs.existsSync(absTarget)) {
        return fs.mkdirSync(absTarget);
      }
      return;
    } else {
      if (file.endsWith(".tpl")) {
        copyPackageTpl(target, {
          templatePath: absFile,
          target: path.join(target, file.replace(/\.tpl$/, "")),
          context: { packageParams },
        });
      } else {
        fs.copyFileSync(absFile, absTarget);
      }
    }
  });
}

export default copyTemplateProject;
