import {Document, IDocumentInfo } from "app/store/Document"
import { QuillContent } from "app/utils/QuillContent";
import Axios from "axios"
import * as _ from 'underscore'



export default class Documents {
    public static getDocumentsInFolder(): Promise<IDocumentInfo[]> {
        return new Promise((resolve, reject) => Axios.get('http://localhost:4000/document')
            .then((response) => {
                resolve(response.data as IDocumentInfo[])
            })
            .catch((err) => {
                console.error('document list retrieval failed', err)
                reject(err)
            })
        )
    }

    public static createDoc(uri: string, content:QuillContent):Promise<IDocumentInfo> {
        return new Promise((resolve, reject) => Axios.post('http://localhost:4000/document', {uri, content})
            .then((response) => {
                resolve(response.data as IDocumentInfo)
            })
            .catch((err) => {
                console.error('document creation failed', err)
                reject(err)
            })
        )
    }

    public static loadDoc(docId: string): Promise<Document> {
        return new Promise((resolve, reject) => Axios.get('http://localhost:4000/document/' + docId)
            .then((response) => {
                resolve(Documents.responseDataToDocument(response.data))
            })
            .catch((err) => {
                console.error('document retrieval failed', err)
                reject(err)
            })
        )
    }

    public static saveDoc(docId: string, content: QuillContent): Promise<IDocumentInfo> {
        return new Promise((resolve, reject) => Axios.put('http://localhost:4000/document/' + docId, {content})
            .then((response) => {
                resolve(response.data as IDocumentInfo)
            })
            .catch((err) => {
                console.error('document update failed', err)
                reject(err)
            })
        )
    }

    private static responseDataToDocument(data:any):Document {
        console.log('responseDataToDocument', data)
        // return new Document(data.id, data.uri, JSON.parse(data.content))
        return new Document(data.id, data.uri, data.content)
    }
}
