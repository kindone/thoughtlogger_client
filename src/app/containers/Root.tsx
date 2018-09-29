// import { SAVE_STATE_FAIL, SAVE_STATE_SUCCESS } from 'app/actions/StateActions'
// import Axios from 'axios'
import Routes from 'app/routes'
import { History } from 'history'
import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import * as Redux from 'redux'
import * as _ from 'underscore'

interface IRootType {
    store: Redux.Store<any>
    history: History
}

export default function Root({ store, history }: IRootType) {

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Routes />
            </ConnectedRouter>
        </Provider>
    )
}
