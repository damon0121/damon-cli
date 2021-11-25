1. lerna add [packageName]  添加公共库`packageName`
2. lerna add [packageName] --scope=[moduleName]  为`moduleName`单独添加`packageName` (moduleName代表项目内的某个package, packageName为第三方依赖)
2. lerna add [moduleName1] --scope=[moduleName2]  为`moduleName2`添加`moduleName1` （moduleName代表项目内的某个package）