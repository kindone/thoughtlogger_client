import { SaveDocFirstTimeAsync } from 'app/actions/DocumentActions'
import { CancelSaveDocAs } from 'app/actions/EditorActions'
import { IActionWithPayload } from 'app/actions/helpers'
import { ISaveAsModalProps, SaveAsModal } from 'app/components/SaveAsModal'
import ThoughtLogggerState from 'app/store/ThoughtLoggerState'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

const mapStateToProps = (state: { thoughtLoggerApp: ThoughtLogggerState }): ISaveAsModalProps => {
  return {
    editorId: state.thoughtLoggerApp.editing.focusedEditorId,
    open: state.thoughtLoggerApp.saveAsModal.isModalOpen,
    status: state.thoughtLoggerApp.saveAsModal.status
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{ thoughtLoggerApp: ThoughtLogggerState }, void, IActionWithPayload<any>>
): Partial<ISaveAsModalProps> => {
  return {
    onClose: () => {
      dispatch(CancelSaveDocAs())
    },
    onSubmit: (editorId: string, uri:string):void => {
      dispatch(SaveDocFirstTimeAsync(editorId, uri))
    }
  }
}

const SaveAsModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveAsModal)

export default SaveAsModalContainer