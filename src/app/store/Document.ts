import { QuillContent } from "app/utils/QuillContent"

export interface IDocumentInfo
{
    id:string
    uri:string
}

export class Document implements IDocumentInfo
{
    constructor(public readonly id:string, public readonly uri:string, public readonly content:QuillContent) {}
}