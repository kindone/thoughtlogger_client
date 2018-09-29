import { editor } from './editor'

import {
    CHANGE_ACTIVE_EDITOR,
    CHANGE_EDITOR_CONTENT,
    CREATE_EMPTY_EDITOR,
    EditingAction,
    LOAD_DOC_CONTENT_SUCCESS,
    SAVE_DOC_FIRST_TIME_SUCCESS
} from '../actions/EditorActions'

import { OPEN_DOC } from 'app/actions/NavigationActions'
import { Document } from 'app/store/Document'
import { EditingState } from 'app/store/EditingState'

export function editing(state: EditingState, action: EditingAction): EditingState {
    switch (action.type) {
        case CHANGE_ACTIVE_EDITOR:
            return EditingState.setFocused(state, action.payload.id)
        case CREATE_EMPTY_EDITOR:
            return EditingState.addEmptyEditor(state)
        case OPEN_DOC: {
            const editorState = EditingState.findByDocId(state, action.payload.id)
            if(editorState) {
              return EditingState.setFocused(state, editorState.id)
            }
            else {
              return EditingState.addEditorForDoc(state, action.payload.id, action.payload.uri)
            }
        }
        case LOAD_DOC_CONTENT_SUCCESS: {
            const document:Document = action.payload.document
            const editorState = EditingState.findByDocId(state, document.id)

            if (!editorState)
              return state

            return EditingState.updateEditor(state, editorState.id, editor(editorState, action))

        }
        case SAVE_DOC_FIRST_TIME_SUCCESS: {
            const document = action.payload
            const editorState = EditingState.find(state, document.editorId)
            return EditingState.updateEditor(state, editorState.id, editor(editorState, action))
        }
        case CHANGE_EDITOR_CONTENT:
            const id = action.payload.id
            return EditingState.updateEditor(state, id, editor(EditingState.find(state, id), action))
        default:
            return state
    }
}
