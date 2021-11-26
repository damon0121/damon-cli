import which from "which";

export default function yarnEnable() {
  return which.sync("yarn", { nothrow: true });
}
