import {IDocumentInfo} from "app/store/Document"


export class NavigationState {
    public readonly documents: IDocumentInfo[]

    constructor(documents: IDocumentInfo[] = []) {
        this.documents = documents
    }
}
