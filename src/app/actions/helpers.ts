import { Action } from 'redux'

export interface IAction<T> extends Action<T> {
    type: T
}
export interface IActionWithPayload<T,P = {}> extends IAction<T> {
    readonly payload: P
}

export function createAction<T extends string>(type:T):IActionWithPayload<T> {
    return createActionWithPayload(type, {})
}

export function createActionWithPayload<T extends string, P>(type:T, payload:P):IActionWithPayload<T,P> {
    return {type, payload}
}