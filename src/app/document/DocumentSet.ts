import { Document } from "text-versioncontrol";


// temporary object for testing excerpt
export class DocumentSet {
    private readonly docs: { [name: string]: Document } = {}

    constructor(docs:Document[]) {
        for(const doc of docs) {
            this.docs[doc.getName()] = doc
        }
    }

    public getDocument(name:string):Document {
        return this.docs[name]
    }
}
