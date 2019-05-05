import {IDocumentInfo} from "app/store/DocumentInfo"


export class NavigationState {
    public readonly documents: IDocumentInfo[]

    constructor(documents: IDocumentInfo[] = []) {
        this.documents = documents
    }
}
