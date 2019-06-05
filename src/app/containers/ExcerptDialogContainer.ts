import { CloseExcerptDialog } from 'app/actions/EditorActions';
import { IActionWithPayload } from 'app/actions/helpers'
import ExcerptDialog, { IExcerptDialogProps } from 'app/components/ExcerptDialog';
import ThoughtLogggerState from 'app/store/ThoughtLoggerState'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'



const mapStateToProps = (state: { thoughtLoggerApp: ThoughtLogggerState }): IExcerptDialogProps => {
    return {...state.thoughtLoggerApp.excerptDialog}
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{ thoughtLoggerApp: ThoughtLogggerState }, void, IActionWithPayload<any>>
): Partial<IExcerptDialogProps> => {
  return {
    onClose: () => {
        dispatch(CloseExcerptDialog())
    },
  }
}

const ExcerptDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExcerptDialog)

export default ExcerptDialogContainer