import { IDocumentInfo } from "app/store/DocumentInfo"
import { AsnycStatus } from "app/utils/AsyncStatus"
import { QuillContent } from "app/utils/QuillContent"
import { Document as DocumentWithHistory} from "text-versioncontrol";

export interface IEditorState extends IDocumentInfo {
    readonly id: string
    readonly isPersisted: boolean
    readonly loadStatus: AsnycStatus
    readonly docId: string
    readonly uri:string
    readonly document:DocumentWithHistory
}

export class EditorState implements IEditorState {
    public static createUntitledEditor(id:string) {
        return new EditorState(id)
    }

    public static openEditorLoaded(id:string, docId:string, uri:string, document:DocumentWithHistory) {
        return new EditorState(id, docId, uri, document)
    }

    public static openEditorToBeLoaded(id:string, docId:string, uri:string) {
        return new EditorState(id, docId, uri)
    }

    public static changeDocumentInfo(obj: EditorState, docId:string, uri:string, document?:DocumentWithHistory) {
        if(document)
            return EditorState.openEditorLoaded(obj.id, docId, uri, document)
        else
            return EditorState.openEditorToBeLoaded(obj.id, docId, uri)
    }

    public static updateContent(obj: EditorState, document: DocumentWithHistory) {
        return new EditorState(obj.id,
            obj.isPersisted ? obj.docId : undefined,
            obj.uri,
            document)
    }

    public static setPersisted(obj: EditorState, docId: string, uri:string) {
        return new EditorState(obj.id, docId, uri, obj.document)
    }

    public static setLoading(obj: EditorState) {
        return new EditorState(obj.id, obj.docId, obj.uri, undefined, AsnycStatus.INPROGRESS)
    }

    public static setLoaded(obj: EditorState, document:DocumentWithHistory) {
        return new EditorState(obj.id, obj.docId, obj.uri, document)
    }

    private static counter: number = 1

    private static generateID() {
        return (this.counter++).toString()
    }

    private static generateURI() {
        return "noname_" + this.generateID()
    }

    public readonly id: string
    public readonly isPersisted: boolean
    public readonly loadStatus: AsnycStatus
    public readonly docId: string
    public readonly uri: string
    public readonly document:DocumentWithHistory

    private constructor(id: string, docId?: string, uri?:string, document?:DocumentWithHistory, loadStatus?:AsnycStatus) {
        this.id = id

        this.isPersisted = docId ? true : false
        this.docId = docId || ''
        this.uri = uri || EditorState.generateURI()

        this.loadStatus = loadStatus ? loadStatus : (document ? AsnycStatus.COMPLETE : AsnycStatus.INITIAL)

        if(!document)
            this.document = new DocumentWithHistory(this.uri, QuillContent.empty())
        else
            this.document = document
    }


}
