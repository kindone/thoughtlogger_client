import { IActionWithPayload } from 'app/actions/helpers'
import { LoadDocListAsync, OpenDocOnCurrentTab, OpenDocOnNewTab } from 'app/actions/NavigationActions'
import Navigation, { INavigationProps } from 'app/components/Navigation'
import ThoughtLogggerState from 'app/store/ThoughtLoggerState'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

const mapStateToProps = (state: { thoughtLoggerApp: ThoughtLogggerState }): INavigationProps => {
    return { ...state.thoughtLoggerApp.navigation }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{ thoughtLoggerApp: ThoughtLogggerState }, void, IActionWithPayload<any>>): Partial<INavigationProps> => {
    return {
        onRefresh: () => {
            dispatch(LoadDocListAsync())
        },
        onOpenOnNewTab: (docId: string, uri:string) => {
            dispatch(OpenDocOnNewTab(docId, uri))
        },
        openDocumentOnCurrentTab: (docId: string, uri:string) => {
            dispatch(OpenDocOnCurrentTab(docId, uri))
        }
    }
}

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation)
export default NavigationContainer
