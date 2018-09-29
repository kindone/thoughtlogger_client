// import { EditorState } from "./EditorState";
import SaveAsModalState from 'app/store/SaveAsModalState'
import { EditingState } from './EditingState'
import { NavigationState } from './NavigationState'

export default class ThoughtLogggerState {
    public static DefaultState() {
        return new ThoughtLogggerState(new NavigationState(),
         EditingState.addEmptyEditor(new EditingState()), new SaveAsModalState())
    }

    public readonly synchronized: boolean

    // default empty state
    constructor(public readonly navigation: NavigationState,
        public readonly editing: EditingState,
        public readonly saveAsModal: SaveAsModalState)
    {
        this.synchronized = false
    }
}
