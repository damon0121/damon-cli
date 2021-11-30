export interface ITplParams {
    name: string;
    repository: string;
    description: string;
    isBuiltIn: boolean;
}
declare const getTemplateParams: () => Promise<ITplParams>;
export default getTemplateParams;
