import {Document, IDocumentInfo } from "app/store/Document"
import Axios from "axios"
import * as _ from 'underscore'


export default class Documents {
    public static getDocumentsInfolder(): Promise<IDocumentInfo[]> {
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

    public static createDoc(uri: string, content:string):Promise<IDocumentInfo> {
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
                resolve(response.data as Document)
            })
            .catch((err) => {
                console.error('document retrieval failed', err)
                reject(err)
            })
        )
    }

    public static saveDoc(docId: string, content: string): Promise<IDocumentInfo> {
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
}
