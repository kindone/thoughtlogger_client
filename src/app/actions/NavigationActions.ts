import { createAction, createActionWithPayload, IActionWithPayload } from 'app/actions/helpers'
import { IDocumentInfo } from 'app/store/Document';
import ThoughtLogggerState from 'app/store/ThoughtLoggerState'
import Documents from 'app/utils/Documents'
import { Dispatch } from 'redux'

export const OPEN_DOC_ON_NEW_TAB = 'navigation/open_doc_on_new_tab'
export const OPEN_DOC_ON_CURRENT_TAB = 'navigation/open_doc_on_cur_tab'

export const LOAD_DOC_LIST = 'navigation/load_doc_list'
export const LOAD_DOC_LIST_REQUEST = 'navigation/load_doc_list_request'
export const LOAD_DOC_LIST_SUCCESS = 'navigation/load_doc_list_success'
export const LOAD_DOC_LIST_FAIL = 'navigation/load_doc_list_fail'


export function OpenDocOnNewTab(docId:string, uri:string) {
    return createActionWithPayload(OPEN_DOC_ON_NEW_TAB, { docId, uri})
}


export function OpenDocOnCurrentTab(docId:string, uri:string) {
    return createActionWithPayload(OPEN_DOC_ON_CURRENT_TAB, {docId, uri})
}

function LoadDocList() {
    return createAction(LOAD_DOC_LIST_REQUEST)
}

function LoadDocListSuccess(documents:IDocumentInfo[]) {
    return createActionWithPayload(LOAD_DOC_LIST_SUCCESS, documents)
}

function LoadDocListFail(error:any) {
    return createActionWithPayload(LOAD_DOC_LIST_FAIL, error)
}

export function LoadDocListAsync() {
    return (dispatch: Dispatch<IActionWithPayload<any, any>>, getState: () => { thoughtLoggerApp: ThoughtLogggerState }) => {
        dispatch(LoadDocList())

        Documents.getDocumentsInfolder()
            .then((documents) => {
                dispatch(LoadDocListSuccess(documents))
            })
            .catch((error) => {
                dispatch(LoadDocListFail(error))
            })
    }
}


export type LoadDocListAsyncAction = ReturnType<typeof LoadDocList>
export type LoadDocListSuccessAction = ReturnType<typeof LoadDocListSuccess>
export type LoadDocListFailAction = ReturnType<typeof LoadDocListFail>
export type OpenDocOnNewTabAction = ReturnType<typeof OpenDocOnNewTab>
export type OpenDocOnCurrentTabAction = ReturnType<typeof OpenDocOnCurrentTab>