import { LoadDocContentAsync, SaveDocContentAsync } from 'app/actions/DocumentActions'
import { IActionWithPayload } from 'app/actions/helpers'
import Editor, { IEditorProps } from 'app/components/Editor'
import { EditingState } from 'app/store/EditingState'
import { IEditorState } from 'app/store/EditorState'
import ThoughtLogggerState from 'app/store/ThoughtLoggerState'
import { Delta, Sources } from 'quill'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Document as DocumentWithHistory } from 'text-versioncontrol'
import {
    ChangeEditorContent,
    SaveDocAs
} from '../actions/EditorActions'





const mapStateToProps = (state: { thoughtLoggerApp: ThoughtLogggerState }, ownProps: { id: string }): IEditorProps => {
    // console.log('mapStateToProps', ownProps)
    const editor:IEditorState = EditingState.find(state.thoughtLoggerApp.editing, ownProps.id)
    return { ...editor }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<{ thoughtLoggerApp: ThoughtLogggerState }, void, IActionWithPayload<any>>
): Partial<IEditorProps> => {
    // console.log('mapDispatchToProps', ownProps)
    return {
        onChange: (id: string, document: DocumentWithHistory, delta: Delta, source: Sources) => {
            dispatch(ChangeEditorContent(id, document))
        },
        onSave: (id: string, document: DocumentWithHistory) => {
            dispatch(SaveDocContentAsync(id, document))
        },
        onSaveAs: (id: string, document: DocumentWithHistory) => {
            dispatch(SaveDocAs(id, document))
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
