export interface IDocumentInfo
{
    id:string
    uri:string
}

export class Document implements IDocumentInfo
{
    public id:string
    public uri:string
    public content:string
}