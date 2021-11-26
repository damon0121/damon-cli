import yargs from "yargs";
import create from './src/create'

yargs
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
create(yargs)


if (process.argv.slice(2).length) {
  yargs.parse(process.argv.slice(2));
} else {
  yargs.showHelp();
}
