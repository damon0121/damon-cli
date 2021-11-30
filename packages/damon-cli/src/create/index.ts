import path from "path";
import fs from "fs-extra";
import { Argv } from "yargs";
import { logger, yarnEnable } from "@damon/utils";
import inquirer from "inquirer";
import ValidateNpmPackageName from "validate-npm-package-name";
import chalk from "chalk";
import _ from "lodash";
import getPackageParams from "./getPackageParams";
import getTemplateParams from "./getTemplateParams";
import getProjectName from "./getProjectName";
import copyTemplateProject from "./copyTemplateProject";

export default function registerCreate(yargs: Argv) {
  yargs.command(
    "create [name]",
    "创建项目",
    (yargs) => {
      yargs.positional("name", {
        type: "string",
        describe: "项目/工程名称",
      });
    },
    async function (argv) {
      let projectName: string = argv.name as string;
      if (!argv.name) {
        projectName = await getProjectName();
      }
      const projectPath = path.resolve(process.cwd(), projectName);
      // 项目名称校验
      const result = ValidateNpmPackageName(projectName);
      if (!result.validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${argv.name}"`));
        result.errors &&
          result.errors.forEach((err) => {
            console.error(chalk.red.dim("Error: " + err));
          });
        result.warnings &&
          result.warnings.forEach((warn) => {
            console.error(chalk.yellowBright.dim("Warning: " + warn));
          });
        return;
      }
      // 检查文件夹是否存在
      if (fs.existsSync(projectPath)) {
        const { isOverwrite } = await inquirer.prompt({
          name: "isOverwrite",
          type: "confirm",
          message: `当前目录已存在文件夹${chalk.cyan(projectName)}，是否覆盖？`,
          default: true,
        });
        if (isOverwrite) {
          logger.log(`\n删除目录 ${chalk.cyan(projectPath)}...`);
          await fs.remove(projectPath);
        } else {
          return;
        }
      }
      const packageParams = await getPackageParams(projectName);
      const templateParams = await getTemplateParams();
      // 选择包管理器
      const pkgManagerParams = { pkgManager: "npm" };
      if (yarnEnable()) {
        pkgManagerParams.pkgManager = "yarn";
      }
      logger.log(`开始创建 ${projectName} 项目!`);
      await fs.mkdir(projectPath);
      copyTemplateProject(projectPath, packageParams, templateParams);
      logger.log(
        `🎉  Successfully created project ${chalk.yellow(argv.name)}.`
      );
      logger.log(
        `👉  Get started with the following commands:\n\n` +
          chalk.cyan(` ${chalk.gray("$")} cd ${argv.name}\n`) +
          chalk.cyan(
            ` ${chalk.gray("$")} ${
              pkgManagerParams.pkgManager === "yarn"
                ? "yarn serve"
                : "npm run serve"
            }`
          )
      );
    }
  );
}
