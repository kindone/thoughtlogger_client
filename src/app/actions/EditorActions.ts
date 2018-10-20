import { createAction, createActionWithPayload } from 'app/actions/helpers'
import { QuillContent } from 'app/utils/QuillContent'


export const CREATE_EMPTY_EDITOR = 'editor/create_empty_editor'
export const SAVE_DOC_AS = 'editor/save_doc_as'
export const CANCEL_SAVE_DOC_AS = 'editor/cancel_save_doc_as'

export const CHANGE_EDITOR_CONTENT = 'editor/change_editor_content'
export const CHANGE_ACTIVE_EDITOR = 'editor/change_active_editor'
export const CHANGE_EDITOR_DOCUMENT = 'editor/change_editor_document'

export function ChangeActiveEditor(editorId: string) {
    return createActionWithPayload(CHANGE_ACTIVE_EDITOR, {id: editorId})
}

export function CreateNewEmptyEditor() {
    return createAction(CREATE_EMPTY_EDITOR)
}

export function SaveDocAs(editorId: string, content: QuillContent) {
    return createActionWithPayload(SAVE_DOC_AS, { editorId, content })
}

export function CancelSaveDocAs() {
    return createAction(CANCEL_SAVE_DOC_AS)
}

export function ChangeEditorContent(id: string, content: QuillContent) {
    return createActionWithPayload(CHANGE_EDITOR_CONTENT, { id, content })
}

export type ChangeActiveEditorAction = ReturnType<typeof ChangeActiveEditor>
export type CreateNewEmptyEditorAction = ReturnType<typeof CreateNewEmptyEditor>
export type ChangeEditorContentAction = ReturnType<typeof ChangeEditorContent>
export type SaveDocAsAction = ReturnType<typeof SaveDocAs>
export type CancelSaveDocAsAction = ReturnType<typeof CancelSaveDocAs>
