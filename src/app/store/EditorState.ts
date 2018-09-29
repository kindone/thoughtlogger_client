import { IDocumentInfo } from "app/store/Document"
import { AsnycStatus } from "app/utils/AsyncStatus";

export interface IEditorState extends IDocumentInfo {
    id: string
    isPersisted: boolean
    loadStatus: AsnycStatus
    docId: string
    content: string
}

export class EditorState implements IEditorState {
    public static createUntitledEditor(id:string) {
        return new EditorState(id)
    }

    public static openEditorLoaded(id:string, docId:string, uri:string, content:string) {
        return new EditorState(id, docId, uri, content)
    }

    public static openEditorToBeLoaded(id:string, docId:string, uri:string) {
        return new EditorState(id, docId, uri)
    }

    public static updateContent(obj: EditorState, content: string) {
        return new EditorState(obj.id,
            obj.isPersisted ? obj.docId : undefined,
            obj.isPersisted ? obj.uri : undefined,
            content)
    }

    public static setPersisted(obj: EditorState, docId: string, uri:string) {
        return new EditorState(obj.id, docId, uri, obj.content)
    }

    public static setLoading(obj: EditorState) {
        return new EditorState(obj.id, obj.docId, obj.uri, undefined, AsnycStatus.INPROGRESS)
    }

    public static setLoaded(obj: EditorState, content:string) {
        return new EditorState(obj.id, obj.docId, obj.uri, content)
    }

    public readonly id: string
    public readonly isPersisted: boolean
    public readonly loadStatus: AsnycStatus
    public readonly docId: string
    public readonly uri:string
    public readonly content: string

    private constructor(id: string, docId?: string, uri?:string, content?: string, loadStatus?:AsnycStatus) {
        this.id = id

        this.isPersisted = docId ? true : false
        this.docId = docId || ''
        this.uri = uri || ''

        this.loadStatus = loadStatus ? loadStatus : (content ? AsnycStatus.COMPLETE : AsnycStatus.INITIAL)
        this.content = content || ''
    }
}
