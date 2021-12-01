import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import create from "./src/create/index.js";

const damon = yargs(hideBin(process.argv))
  .strict(true)
  .scriptName("damon")
  .usage("$0 <命令> [选项]")
  .alias("help", "h")
  .alias("version", "v")
  .wrap(null)
  .fail((msg, err, yargs) => {
    yargs.showHelp();
    if (err) process.exit(1);
  });

// 注册创建项目命令
create(damon);

if (process.argv.slice(2).length) {
  damon.parse(process.argv.slice(2));
} else {
  damon.showHelp();
}
