import inquirer from "inquirer";

// 获取项目名
async function getProjectName(): Promise<string> {
  const value = await inquirer.prompt({
    type: "input",
    name: "projectName",
    message: "请输入项目名称",
  });
  return value.projectName;
}
export default getProjectName
