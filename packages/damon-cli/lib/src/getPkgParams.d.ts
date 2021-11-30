export interface IPkgParams {
    name: string;
    version: string;
    auther: string;
    description: string;
    simoVersion: string;
}
declare const getPackageParams: () => Promise<IPkgParams>;
export default getPackageParams;
