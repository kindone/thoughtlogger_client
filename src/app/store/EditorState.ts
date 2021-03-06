import { IDocumentInfo } from "app/store/Document"
import { AsnycStatus } from "app/utils/AsyncStatus"
import { QuillContent } from "app/utils/QuillContent"

export interface IEditorState extends IDocumentInfo {
    id: string
    isPersisted: boolean
    loadStatus: AsnycStatus
    docId: string
    content: QuillContent
}

export class EditorState implements IEditorState {
    public static createUntitledEditor(id:string) {
        return new EditorState(id)
    }

    public static openEditorLoaded(id:string, docId:string, uri:string, content:QuillContent) {
        return new EditorState(id, docId, uri, content)
    }

    public static openEditorToBeLoaded(id:string, docId:string, uri:string) {
        return new EditorState(id, docId, uri)
    }

    public static changeDocument(obj: EditorState, docId:string, uri:string, content?:QuillContent) {
        if(content)
            return EditorState.openEditorLoaded(obj.id, docId, uri, content)
        else
            return EditorState.openEditorToBeLoaded(obj.id, docId, uri)
    }

    public static updateContent(obj: EditorState, content: QuillContent) {
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

    public static setLoaded(obj: EditorState, content:QuillContent) {
        return new EditorState(obj.id, obj.docId, obj.uri, content)
    }

    public readonly id: string
    public readonly isPersisted: boolean
    public readonly loadStatus: AsnycStatus
    public readonly docId: string
    public readonly uri:string
    public readonly content: QuillContent

    private constructor(id: string, docId?: string, uri?:string, content?: QuillContent | string, loadStatus?:AsnycStatus) {
        this.id = id

        this.isPersisted = docId ? true : false
        this.docId = docId || ''
        this.uri = uri || ''

        this.loadStatus = loadStatus ? loadStatus : (content ? AsnycStatus.COMPLETE : AsnycStatus.INITIAL)

        if(!content)
            this.content = QuillContent.empty()
        else if(typeof content === 'string')
            this.content = QuillContent.fromString(content)
        else
            this.content = content
    }
}
