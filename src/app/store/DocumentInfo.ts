import { Document as DocumentWithHistory} from "text-versioncontrol";

export interface IDocumentInfo
{
    id:string
    uri:string
    document:DocumentWithHistory
}

export class DocumentInfo implements IDocumentInfo
{
    constructor(public readonly id:string, public readonly uri:string, public readonly document:DocumentWithHistory) {}
}