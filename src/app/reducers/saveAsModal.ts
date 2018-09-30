import { SaveAsModalAction } from "app/actions"
import { SAVE_DOC_FIRST_TIME_FAIL,
    SAVE_DOC_FIRST_TIME_REQUEST,
    SAVE_DOC_FIRST_TIME_SUCCESS } from "app/actions/DocumentActions"
import { CANCEL_SAVE_DOC_AS, SAVE_DOC_AS } from "app/actions/EditorActions"
import SaveAsModalState from "app/store/SaveAsModalState"
import { AsnycStatus } from "app/utils/AsyncStatus"

export function saveAsModal(state: SaveAsModalState, action: SaveAsModalAction): SaveAsModalState {
    switch (action.type) {
        case SAVE_DOC_AS:
            return { ...state, isModalOpen: true, status: AsnycStatus.INITIAL }
        case CANCEL_SAVE_DOC_AS:
            return { ...state, isModalOpen: false }
        case SAVE_DOC_FIRST_TIME_REQUEST:
        return { ...state, status: AsnycStatus.INPROGRESS}
        case SAVE_DOC_FIRST_TIME_SUCCESS:
            return { ...state, isModalOpen: false, status: AsnycStatus.COMPLETE}
        case SAVE_DOC_FIRST_TIME_FAIL:
            return { ...state, status: AsnycStatus.FAILED}
        default:
            return state
    }
}
