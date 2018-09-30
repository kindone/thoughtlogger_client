import { NavigationAction } from 'app/actions'
import { LOAD_DOC_LIST_SUCCESS } from 'app/actions/NavigationActions'
import { NavigationState } from 'app/store/NavigationState'

export function navigation(state: NavigationState, action: NavigationAction): NavigationState {
    switch (action.type) {
        case LOAD_DOC_LIST_SUCCESS:
            return { documents: action.payload }
        default:
            return state
    }
}
