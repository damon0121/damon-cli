import { Argv } from "yargs";
import { logger } from "@damon/utils";

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
    function (argv) {
      logger.warn(`开始创建 ${argv.name} 项目!`);
    }
  );
}
