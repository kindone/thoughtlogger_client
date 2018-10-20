import rootReducer from 'app/reducers'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'


const history = createBrowserHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)

export default {
    history,
    configureStore(initialState?: object) {
        return createStore(rootReducer, initialState!, enhancer)
    }
}
