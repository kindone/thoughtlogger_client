import {
    CHANGE_EDITOR_CONTENT,
    EditorAction,
    LOAD_DOC_CONTENT_FAIL,
    LOAD_DOC_CONTENT_REQUEST,
    LOAD_DOC_CONTENT_SUCCESS,
    SAVE_DOC_CONTENT_FAIL,
    SAVE_DOC_CONTENT_SUCCESS,
    SAVE_DOC_FIRST_TIME_SUCCESS
} from 'app/actions/EditorActions'
import { EditorState } from 'app/store/EditorState'

export function editor(state: EditorState, action: EditorAction): EditorState {
    switch (action.type) {
        case LOAD_DOC_CONTENT_REQUEST:
            console.log(LOAD_DOC_CONTENT_REQUEST)
            return state
        case LOAD_DOC_CONTENT_SUCCESS:
            console.log(LOAD_DOC_CONTENT_SUCCESS)
            return EditorState.setLoaded(state, action.payload.document.content)
        case LOAD_DOC_CONTENT_FAIL:
            console.log('LOAD_DOC_CONTENT_FAIL: editorId=' + action.payload.editorId)
            return state
        case SAVE_DOC_CONTENT_SUCCESS: {
            console.log('SAVE_DOC_CONTENT_SUCCESS')
            const document = action.payload.document
            return EditorState.setPersisted(state, document.id, document.uri)
        }
        case SAVE_DOC_CONTENT_FAIL:
            console.log('SAVE_DOC_CONTENT_FAIL')
            return state
        case SAVE_DOC_FIRST_TIME_SUCCESS: {
            const document = action.payload
            return EditorState.setPersisted(state, document.docId, document.uri)
        }
        case CHANGE_EDITOR_CONTENT:
            return EditorState.updateContent(state, action.payload.content)
        default:
            return state
    }
}
