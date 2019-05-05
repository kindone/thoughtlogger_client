import { IDGenerator } from 'app/utils/IDGenerator'
import { Document as DocumentWithHistory} from "text-versioncontrol";
import { EditorState, IEditorState } from './EditorState'



export type EditorStateDictionary = { [id in string]: EditorState }

export type IEditorStateDictionary = { [id in string]: IEditorState }

export interface IEditingState {
    editors: IEditorStateDictionary
    focusedEditorId: string
}

export class EditingState implements IEditingState {
    public static addEmptyEditor(obj: EditingState) {
        const editorId = IDGenerator.generate()
        const newEditor = EditorState.createUntitledEditor(editorId)

        return new EditingState({ ...obj.editors, [editorId]: newEditor }, editorId)
    }

    public static addEditorForDoc(obj: EditingState, docId: string, uri:string, document?: DocumentWithHistory) {
        const editorId = IDGenerator.generate()
        const newEditor = document ? EditorState.openEditorLoaded(editorId, docId, uri, document) : EditorState.openEditorToBeLoaded(editorId, docId, uri)

        return new EditingState({ ...obj.editors, [editorId]: newEditor }, editorId)
    }

    public static updateEditor(obj: EditingState, editorId: string, editor: EditorState) {
        return new EditingState({ ...obj.editors, [editorId]: editor }, editorId) // FIXME focusedEditorId
    }

    public static setFocused(obj: EditingState, editorId: string) {
        if (EditingState.find(obj, editorId)) return new EditingState(obj.editors, editorId)
        else return obj
    }

    public static isFocused(obj: EditingState, editorId: string) {
        return obj.focusedEditorId === editorId
    }

    public static isPersistent(obj: EditingState, editorId: string) {
        const editorState = EditingState.find(obj, editorId)
        return editorState ? editorState.isPersisted : false
    }

    public static find(obj: EditingState, editorId: string):EditorState {
        return obj.editors[editorId]
    }

    public static findIdByDocId(obj: EditingState, docId: string) {
        for (const editorId in obj.editors) {
            if (obj.editors[editorId].docId === docId) return editorId
        }
        return undefined
    }

    public static findByDocId(obj: EditingState, docId: string) {
        for (const editorId in obj.editors) {
            if (obj.editors[editorId].docId === docId) return obj.editors[editorId]
        }
        return undefined
    }

    constructor(public readonly editors: EditorStateDictionary = {}, public readonly focusedEditorId = '') {
    }
}
