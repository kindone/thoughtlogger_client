import { EditorAction } from 'app/actions'
import {
    LOAD_DOC_CONTENT_FAIL,
    LOAD_DOC_CONTENT_REQUEST,
    LOAD_DOC_CONTENT_SUCCESS,
    SAVE_DOC_CONTENT_FAIL,
    SAVE_DOC_CONTENT_SUCCESS,
    SAVE_DOC_FIRST_TIME_SUCCESS } from 'app/actions/DocumentActions'
import {
    CHANGE_EDITOR_CONTENT
} from 'app/actions/EditorActions'
import { OPEN_DOC_ON_CURRENT_TAB } from 'app/actions/NavigationActions'
import { EditorState } from 'app/store/EditorState'




export function editor(state: EditorState, action: EditorAction): EditorState {
    switch (action.type) {
        case LOAD_DOC_CONTENT_REQUEST:
            console.log(LOAD_DOC_CONTENT_REQUEST)
            return state
        case LOAD_DOC_CONTENT_SUCCESS:
            console.log(LOAD_DOC_CONTENT_SUCCESS)
            return EditorState.setLoaded(state, action.payload.documentInfo.document)
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
        case OPEN_DOC_ON_CURRENT_TAB: {
            const { docId, uri } = action.payload
            return EditorState.changeDocumentInfo(state, docId, uri)
        }
        case CHANGE_EDITOR_CONTENT:
            return EditorState.updateContent(state, action.payload.content)
        default:
            return state
    }
}
