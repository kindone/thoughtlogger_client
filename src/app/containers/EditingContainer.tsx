import { ChangeActiveEditor, CreateNewEmptyEditor } from 'app/actions/EditorActions'
import { IActionWithPayload } from 'app/actions/helpers'
import EditingView, { IEditingProps } from 'app/components/EditingView'
import ThoughtLogggerState from 'app/store/ThoughtLoggerState'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'



const mapStateToProps = (state: { thoughtLoggerApp: ThoughtLogggerState }): IEditingProps => {
    return { ...state.thoughtLoggerApp.editing }
}

const mapDispatchToProps = (dispatch: Dispatch<IActionWithPayload<any>>): Partial<IEditingProps> => {
    return {
        onTabChange: (id: string) => {
            dispatch(ChangeActiveEditor(id))
        },
        onCreateNewEditor: () => {
            dispatch(CreateNewEmptyEditor())
        }
    }
}

const EditingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditingView)
export default EditingContainer
