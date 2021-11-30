import inquirer from "inquirer";
import _ from "lodash";

export interface IPkgParams {
  name: string;
  version: string;
  auther: string;
  description: string;
  simoVersion: string;
}

// 获取输入参数
const getPackageParams = async (name: string): Promise<IPkgParams> => {
  const result = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "请输入项目名称?",
      default: name,
      filter: (v) => _.trim(v),
    },
    {
      type: "input",
      name: "version",
      message: "请输入版本号?",
      default: "1.0.0",
      filter: (v) => _.trim(v),
    },
    {
      type: "input",
      name: "author",
      message: "请输入作者名称？",
      filter: (v) => _.trim(v),
    },
    {
      type: "input",
      name: "description",
      message: "请输入描述？",
      filter: (v) => _.trim(v),
    },
  ]);

  return result;
};

export default getPackageParams;
