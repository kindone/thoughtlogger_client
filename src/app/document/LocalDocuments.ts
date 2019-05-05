import { DocumentInfo, IDocumentInfo } from "app/store/DocumentInfo"
import { Document as DocumentWithHistory } from "text-versioncontrol";
import * as _ from 'underscore'




export default class LocalDocuments {

    public static getDocumentsInFolder(): Promise<IDocumentInfo[]> {
        return new Promise((resolve, reject) => {
            const docInfos:IDocumentInfo[] = []
            for(const docId in this.docs) {
                if(this.docs[docId]) {
                    const doc = this.docs[docId]
                    docInfos.push({id:docId, uri: doc.uri, document:doc.document})
                }
            }
            resolve(docInfos)
            // reject(err)
        })
    }

    public static createDoc(uri: string, document:DocumentWithHistory):Promise<IDocumentInfo> {
        return new Promise((resolve, reject) => {
            if(typeof this.find(uri) !== 'undefined')
                reject('attemped to create a document with existing name')

            // const document = new DocumentWithHistory(uri, content)
            const id = this.docs.length.toString()
            const documentInfo = new DocumentInfo(id, uri, document)
            this.docs.push(documentInfo)
            resolve({id: (this.docs.length-1).toString(), uri, document})
        })
    }

    public static loadDoc(docId: string): Promise<IDocumentInfo> {
        return new Promise((resolve, reject) => {
            const id = Number.parseInt(docId, 10)
            if(this.docs.length >= id)
                reject("unable to find document with docId")

            resolve(this.docs[id])
        })
    }

    public static saveDoc(docId: string, document: DocumentWithHistory): Promise<IDocumentInfo> {
        return new Promise((resolve, reject) => {
            const id = Number.parseInt(docId, 10)
            if(this.docs.length >= id)
                reject("unable to find document with docId")

            this.docs[id] = new DocumentInfo(docId, document.getName(), document)

            resolve({id: docId, uri: this.docs[id].uri, document})
        })
    }

    // private static readonly docs: { [name: string]: Document } = {}
    private static readonly docs:DocumentInfo[] = []

    private static find(name:string):DocumentInfo | undefined {
        for(const doc of this.docs) {
            if(name === doc.uri)
                return doc
        }
        return undefined
    }


}
