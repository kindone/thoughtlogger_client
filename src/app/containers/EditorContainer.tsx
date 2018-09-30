import { LoadDocContentAsync, SaveDocContentAsync } from 'app/actions/DocumentActions'
import { IActionWithPayload } from 'app/actions/helpers'
import Editor, { IEditorProps } from 'app/components/Editor'
import { EditingState } from 'app/store/EditingState'
import ThoughtLogggerState from 'app/store/ThoughtLoggerState'
import { Delta, Sources } from 'quill'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import {
    ChangeEditorContent,
    SaveDocAs
} from '../actions/EditorActions'



const mapStateToProps = (state: { thoughtLoggerApp: ThoughtLogggerState }, ownProps: { id: string }): IEditorProps => {
    // console.log('mapStateToProps', ownProps)
    const editor = EditingState.find(state.thoughtLoggerApp.editing, ownProps.id)
    return { ...editor }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<{ thoughtLoggerApp: ThoughtLogggerState }, void, IActionWithPayload<any>>
): Partial<IEditorProps> => {
    // console.log('mapDispatchToProps', ownProps)
    return {
        onChange: (id: string, content: string, delta: Delta, source: Sources) => {
            dispatch(ChangeEditorContent(id, content))
        },
        onSave: (id: string, content: string) => {
            dispatch(SaveDocContentAsync(id, content))
        },
        onSaveAs: (id: string, content: string) => {
            dispatch(SaveDocAs(id, content))
        },
        onReload: (id: string) => {
            dispatch(LoadDocContentAsync(id))
        }
    }
}

const EditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor)
export default EditorContainer
