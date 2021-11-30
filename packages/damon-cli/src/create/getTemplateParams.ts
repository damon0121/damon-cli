import inquirer from "inquirer";
import _ from "lodash";

export interface ITplParams {
  name: string;
  repository: string;
  description: string;
  isBuiltIn: boolean;
}
const templatesData: ITplParams[] = [
  {
    name: "simo-template",
    repository: "./templates/simo-template",
    description: "Js 模版 ",
    isBuiltIn: true,
  },
  {
    name: "simo-template-typescript",
    repository: "./templates/simo-template-typescript",
    description: "Ts 模版 ",
    isBuiltIn: true,
  },
];
// 获取模板
const getTemplateParams = async (): Promise<ITplParams> => {
  // 读取模版名称
  const templatesTypes = templatesData.map((item: ITplParams) => ({
    key: item.name,
    name: item.name,
    value: item.name,
  }));

  const template = await inquirer.prompt([
    {
      name: "templateType",
      message: "请选择模版?",
      type: "list",
      choices: templatesTypes,
    },
  ]);
  return _.find(templatesData, { name: template.templateType }) as ITplParams;
};

export default getTemplateParams