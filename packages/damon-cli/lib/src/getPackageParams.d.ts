export interface IPkgParams {
    name: string;
    version: string;
    auther: string;
    description: string;
    simoVersion: string;
}
declare const getPackageParams: (name: string) => Promise<IPkgParams>;
export default getPackageParams;
