import { routerReducer as routing } from 'react-router-redux'
import { combineReducers, Reducer } from 'redux'
import thoughtLoggerApp from './thoughtLoggerApp'

const rootReducer = combineReducers({
    thoughtLoggerApp,
    routing: routing as Reducer<any>
})

export default rootReducer
