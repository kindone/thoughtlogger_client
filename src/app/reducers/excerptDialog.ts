import { ExcerptDialogAction } from "app/actions";
import { CLOSE_EXCERPT_DIALOG, OPEN_EXCERPT_DIALOG } from "app/actions/EditorActions";
import ExcerptDialogState from "app/store/ExcerptDialogState";



export function excerptDialog(state: ExcerptDialogState, action: ExcerptDialogAction): ExcerptDialogState {
    switch (action.type) {
        case OPEN_EXCERPT_DIALOG:
            const data = action.payload.data
            return new ExcerptDialogState(true, data.sourceUri, data.sourceRev, data.sourceStart, data.sourceEnd,
                data.targetUri, data.targetRev, data.targetStart, data.targetEnd)
        case CLOSE_EXCERPT_DIALOG: {
            return new ExcerptDialogState(false)
        }
        default:
            return state
    }
}
