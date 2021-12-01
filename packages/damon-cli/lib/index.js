import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import create from "./src/create/index.js";
var damon = yargs(hideBin(process.argv))
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
create(damon);
if (process.argv.slice(2).length) {
    damon.parse(process.argv.slice(2));
}
else {
    damon.showHelp();
}
//# sourceMappingURL=index.js.map