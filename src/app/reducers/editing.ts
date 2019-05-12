import { EditingAction } from 'app/actions'
import {
  LOAD_DOC_CONTENT_SUCCESS,
  SAVE_DOC_FIRST_TIME_SUCCESS
  } from 'app/actions/DocumentActions'
import {
  CHANGE_ACTIVE_EDITOR,
  CHANGE_EDITOR_CONTENT,
  CREATE_EMPTY_EDITOR,
  TAKE_EXCERPT
  } from 'app/actions/EditorActions'
import { OPEN_DOC_ON_CURRENT_TAB, OPEN_DOC_ON_NEW_TAB } from 'app/actions/NavigationActions'
import { IDocumentInfo } from 'app/store/DocumentInfo'
import { EditingState } from 'app/store/EditingState'
import { editor } from './editor'

export function editing(state: EditingState, action: EditingAction): EditingState {
    switch (action.type) {
        case CHANGE_ACTIVE_EDITOR:
            return EditingState.setFocused(state, action.payload.id)
        case CREATE_EMPTY_EDITOR:
            return EditingState.addEmptyEditor(state)
        case OPEN_DOC_ON_NEW_TAB: {
            const editorState = EditingState.findByDocId(state, action.payload.docId)
            if(editorState) {
              return EditingState.setFocused(state, editorState.id)
            }
            else {
              return EditingState.addEditorForDoc(state, action.payload.docId, action.payload.uri)
            }
        }
        case OPEN_DOC_ON_CURRENT_TAB: {
            const editorState = EditingState.findByDocId(state, action.payload.docId)
            if(editorState) {
              return EditingState.setFocused(state, editorState.id)
            }
            else {
                const curEditorState = EditingState.find(state, state.focusedEditorId)
                if(curEditorState.isPersisted)
                    return EditingState.setFocused(
                        EditingState.updateEditor(state, curEditorState.id, editor(curEditorState, action)),
                        curEditorState.id)
                else
                    return EditingState.addEditorForDoc(state, action.payload.docId, action.payload.uri)
            }
        }
        case LOAD_DOC_CONTENT_SUCCESS: {
            const documentInfo:IDocumentInfo = action.payload.documentInfo
            const editorState = EditingState.findByDocId(state, documentInfo.id)

            if (!editorState)
              return state

            return EditingState.updateEditor(state, editorState.id, editor(editorState, action))
        }
        case SAVE_DOC_FIRST_TIME_SUCCESS: {
            const document = action.payload
            const editorState = EditingState.find(state, document.editorId)
            return EditingState.updateEditor(state, editorState.id, editor(editorState, action))
        }
        case CHANGE_EDITOR_CONTENT: {
            const id = action.payload.id
            return EditingState.updateEditor(state, id, editor(EditingState.find(state, id), action))
        }
        case TAKE_EXCERPT: {
            return EditingState.setExcerpt(state, action.payload.excerptSource)
        }
        default:
            return state
    }
}
