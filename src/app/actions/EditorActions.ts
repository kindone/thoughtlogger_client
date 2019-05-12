import { createAction, createActionWithPayload } from 'app/actions/helpers'
import { Document as DocumentWithHistory} from "text-versioncontrol";
import { ExcerptSource } from 'text-versioncontrol/lib/excerpt';


export const CREATE_EMPTY_EDITOR = 'editor/create_empty_editor'
export const SAVE_DOC_AS = 'editor/save_doc_as'
export const CANCEL_SAVE_DOC_AS = 'editor/cancel_save_doc_as'

export const CHANGE_EDITOR_CONTENT = 'editor/change_editor_content'
export const CHANGE_ACTIVE_EDITOR = 'editor/change_active_editor'
export const CHANGE_EDITOR_DOCUMENT = 'editor/change_editor_document'

export const TAKE_EXCERPT = 'editor/take_excerpt'

export function ChangeActiveEditor(editorId: string) {
    return createActionWithPayload(CHANGE_ACTIVE_EDITOR, {id: editorId})
}

export function CreateNewEmptyEditor() {
    return createAction(CREATE_EMPTY_EDITOR)
}

export function SaveDocAs(editorId: string, document: DocumentWithHistory) {
    return createActionWithPayload(SAVE_DOC_AS, { editorId, content: document })
}

export function CancelSaveDocAs() {
    return createAction(CANCEL_SAVE_DOC_AS)
}

export function ChangeEditorContent(id: string, document: DocumentWithHistory) {
    return createActionWithPayload(CHANGE_EDITOR_CONTENT, { id, content: document })
}

export function TakeExcerpt(id: string, excerptSource:ExcerptSource) {
    return createActionWithPayload(TAKE_EXCERPT, { id, excerptSource })
}

export type ChangeActiveEditorAction = ReturnType<typeof ChangeActiveEditor>
export type CreateNewEmptyEditorAction = ReturnType<typeof CreateNewEmptyEditor>
export type ChangeEditorContentAction = ReturnType<typeof ChangeEditorContent>
export type SaveDocAsAction = ReturnType<typeof SaveDocAs>
export type CancelSaveDocAsAction = ReturnType<typeof CancelSaveDocAs>
export type TakeExcerptAction = ReturnType<typeof TakeExcerpt>
