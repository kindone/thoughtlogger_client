import { IActionWithPayload } from 'app/actions/helpers'
import { LoadDocListAsync } from 'app/actions/NavigationActions'
import ThoughtLogggerState from 'app/store/ThoughtLoggerState'
import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'


interface IAppProps {
    onComponentDidMount?: () => void
}

class AppComponent extends React.Component<IAppProps> {
    public componentDidMount() {
        if (this.props.onComponentDidMount) this.props.onComponentDidMount()
    }

    public render() {
        return <div id="App">{this.props.children}</div>
    }
}

const mapStateToProps = (state: { thoughtLoggerApp: ThoughtLogggerState }): IAppProps => {
    return {}
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<{ thoughtLoggerApp: ThoughtLogggerState }, void, IActionWithPayload<any>>
): Partial<IAppProps> => {
    return {
        onComponentDidMount: () => {
            // dispatch(LoadInitialStateAction())
            dispatch(LoadDocListAsync())
        }
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent)

export default App
