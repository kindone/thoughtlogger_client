import { SAVE_DOC_FIRST_TIME_FAIL,
     SAVE_DOC_FIRST_TIME_REQUEST,
     SAVE_DOC_FIRST_TIME_SUCCESS } from 'app/actions/DocumentActions'
import { CANCEL_SAVE_DOC_AS, CLOSE_EXCERPT_DIALOG, OPEN_EXCERPT_DIALOG, SAVE_DOC_AS,  } from 'app/actions/EditorActions'
import { IActionWithPayload } from 'app/actions/helpers'
import { LOAD_INITIAL_STATE_SUCCESS } from 'app/actions/StateActions'
import { saveAsModal } from 'app/reducers/saveAsModal'
import ThoughtLogggerState from 'app/store/ThoughtLoggerState'
import { editing } from './editing'
import { excerptDialog } from './excerptDialog';
import { navigation } from './navigation'


export default function thoughtLoggerApp(
    state: ThoughtLogggerState = ThoughtLogggerState.DefaultState(),
    action: IActionWithPayload<any, any>
):ThoughtLogggerState {
    switch(action.type)
    {
        case LOAD_INITIAL_STATE_SUCCESS:
            return {
                ...(action.payload.state as ThoughtLogggerState),
                synchronized: true
            }
        case SAVE_DOC_AS:
        case CANCEL_SAVE_DOC_AS:
        case SAVE_DOC_FIRST_TIME_REQUEST:
        case SAVE_DOC_FIRST_TIME_FAIL:
            return {
                ...state,
                saveAsModal: saveAsModal(state.saveAsModal, action)
            } as ThoughtLogggerState
        case SAVE_DOC_FIRST_TIME_SUCCESS:
            return {
                ...state,
                navigation: navigation(state.navigation, action),
                editing: editing(state.editing, action),
                saveAsModal: saveAsModal(state.saveAsModal, action)
            }
        case OPEN_EXCERPT_DIALOG:
        case CLOSE_EXCERPT_DIALOG:
            return {
                ...state,
                excerptDialog: excerptDialog(state.excerptDialog, action)
            }
        default:
            return {
                ...state,
                navigation: navigation(state.navigation, action),
                editing: editing(state.editing, action)
            }
    }
}
