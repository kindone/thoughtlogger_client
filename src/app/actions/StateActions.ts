import { IActionWithPayload } from 'app/actions/helpers'
import ThoughtLogggerState from 'app/store/ThoughtLoggerState'
import { Dispatch } from 'redux'

import Axios from 'axios'

export const LOAD_INITIAL_STATE_REQUEST = 'state/load'
export const LOAD_INITIAL_STATE_SUCCESS = 'state/load_success'
export const LOAD_INITIAL_STATE_FAIL = 'state/load_fail'

export const SAVE_STATE_REQUEST = 'state/save'
export const SAVE_STATE_SUCCESS = 'state/save_success'
export const SAVE_STATE_FAIL = 'state/save_fail'

export function LoadInitialStateAction() {
    return (dispatch: Dispatch<IActionWithPayload<any>>, getState: () => { thoughtLoggerApp: ThoughtLogggerState }) => {
        dispatch({ type: LOAD_INITIAL_STATE_REQUEST, payload: {} })

        Axios.get('http://localhost:4000/state')
            .then((response) => {
                const newState: ThoughtLogggerState = {
                    ...response.data.data.thoughtLoggerApp
                }

                console.log('response:', response.data.data.thoughtLoggerApp)
                console.log('newState:', newState)

                dispatch({ type: LOAD_INITIAL_STATE_SUCCESS, payload: { state: newState } })
            })
            .catch((err) => {
                dispatch({ type: LOAD_INITIAL_STATE_FAIL, payload: { err } })
                console.log('initial state retrival failed:', err)
            })
    }
}

export function SaveStateAction() {
    return (dispatch: Dispatch<IActionWithPayload<any>>, getState: () => { thoughtLoggerApp: ThoughtLogggerState }) => {
        dispatch({ type: SAVE_STATE_REQUEST, payload: {} })

        const newState = getState()

        Axios.put('http://localhost:4000/state', newState)
            .then((response) => {
                dispatch({ type: SAVE_STATE_SUCCESS, payload: { state: newState } })
            })
            .catch((err) => {
                dispatch({ type: SAVE_STATE_FAIL, payload: { err } })
                console.log('save state failed', err)
            })
    }
}
