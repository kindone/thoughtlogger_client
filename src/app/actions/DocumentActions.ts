
import { createActionWithPayload, IActionWithPayload } from "app/actions/helpers"
import { LoadDocListAsync } from "app/actions/NavigationActions"
import LocalDocuments from "app/document/LocalDocuments";
import {  IDocumentInfo } from "app/store/DocumentInfo"
import { EditingState } from "app/store/EditingState"
import ThoughtLogggerState from "app/store/ThoughtLoggerState"
import { Dispatch } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Document as DocumentWithHistory } from 'text-versioncontrol'





export const LOAD_DOC_CONTENT_REQUEST = 'editor/load_doc_content_req'
export const LOAD_DOC_CONTENT_SUCCESS = 'editor/load_doc_content_success'
export const LOAD_DOC_CONTENT_FAIL = 'editor/load_doc_content_fail'

export const SAVE_DOC_CONTENT_REQUEST = 'editor/save_doc_content_req'
export const SAVE_DOC_CONTENT_SUCCESS = 'editor/save_doc_content_success'
export const SAVE_DOC_CONTENT_FAIL = 'editor/save_doc_content_fail'

export const SAVE_DOC_FIRST_TIME_REQUEST = 'editor/save_doc_first_time_req'
export const SAVE_DOC_FIRST_TIME_SUCCESS = 'editor/save_doc_first_time_succes'
export const SAVE_DOC_FIRST_TIME_FAIL = 'editor/save_doc_first_time_fail'

function LoadDocContentRequest(editorId: string) {
    return createActionWithPayload(LOAD_DOC_CONTENT_REQUEST, { editorId })
}

function LoadDocContentSuccess(editorId:string, documentInfo:IDocumentInfo) {
    return createActionWithPayload(LOAD_DOC_CONTENT_SUCCESS, { editorId, documentInfo })
}

function LoadDocContentFail(editorId:string, docId:string) {
    return createActionWithPayload(LOAD_DOC_CONTENT_FAIL, { editorId, docId })
}

function SaveDocContentRequest(id: string, document: DocumentWithHistory) {
    return createActionWithPayload(SAVE_DOC_CONTENT_REQUEST, { id, document })
}

function SaveDocContentSuccess(editorId:string, document:IDocumentInfo) {
    return createActionWithPayload(SAVE_DOC_CONTENT_SUCCESS, { editorId, document })
}

function SaveDocContentFail(editorId:string) {
    return createActionWithPayload(SAVE_DOC_CONTENT_FAIL, { editorId })
}

export function LoadDocContentAsync(editorId: string) {
    return (dispatch: Dispatch<IActionWithPayload<any,any>>, getState: () => { thoughtLoggerApp: ThoughtLogggerState }) => {
        dispatch(LoadDocContentRequest(editorId))

        const docId = EditingState.find(getState().thoughtLoggerApp.editing, editorId).docId
        LocalDocuments.loadDoc(docId)
            .then((document) => {
                dispatch(LoadDocContentSuccess(editorId, document))
            })
            .catch((err) => {
                dispatch(LoadDocContentFail(editorId, docId))
            })
    }
}

export function SaveDocContentAsync(editorId: string, document: DocumentWithHistory) {
    return (dispatch: Dispatch<IActionWithPayload<any,any>>, getState: () => { thoughtLoggerApp: ThoughtLogggerState }) => {
        dispatch(SaveDocContentRequest(editorId, document))

        const editorState = EditingState.find(getState().thoughtLoggerApp.editing, editorId)
        LocalDocuments.saveDoc(editorState.docId, document)
            .then(() => {
                dispatch(SaveDocContentSuccess(editorId, { id:editorState.docId, uri:editorState.document.getName(), document }))
            })
            .catch(() => {
                dispatch(SaveDocContentFail(editorId))
            })
    }
}

function SaveDocFirstTimeRequest(editorId: string, uri:string, document:DocumentWithHistory) {
    return createActionWithPayload(SAVE_DOC_FIRST_TIME_REQUEST, { editorId, uri, document })
}

export function SaveDocFirstTimeSuccess(editorId: string, docId:string, uri:string) {
    return createActionWithPayload(SAVE_DOC_FIRST_TIME_SUCCESS, { editorId, docId, uri })
}

export function SaveDocFirstTimeFail(editorId: string, error:any) {
    return createActionWithPayload(SAVE_DOC_FIRST_TIME_FAIL, { editorId, error })
}

export function SaveDocFirstTimeAsync(editorId: string, uri:string) {
    return (dispatch: ThunkDispatch<{ thoughtLoggerApp: ThoughtLogggerState }, void, IActionWithPayload<any>>, getState: () => { thoughtLoggerApp: ThoughtLogggerState }) => {
        const editorState = EditingState.find(getState().thoughtLoggerApp.editing, editorId)
        dispatch(SaveDocFirstTimeRequest(editorId, uri, editorState.document))
        LocalDocuments.createDoc(uri, editorState.document)
            .then((result) => {
                dispatch(SaveDocFirstTimeSuccess(editorId, result.id, result.uri))
                dispatch(LoadDocListAsync())
            })
            .catch((error) => {
                dispatch(SaveDocFirstTimeFail(editorId, error))
            })
    }
}

export type LoadDocContentAsyncAction = ReturnType<typeof LoadDocContentRequest>
export type LoadDocContentSuccessAction = ReturnType<typeof LoadDocContentSuccess>
export type LoadDocContentFailAction = ReturnType<typeof LoadDocContentFail>

export type SaveDocContentAsyncAction = ReturnType<typeof SaveDocContentRequest>
export type SaveDocContentSuccessAction = ReturnType<typeof SaveDocContentSuccess>
export type SaveDocContentFailAction = ReturnType<typeof SaveDocContentFail>

export type SaveDocFirstTimeAsyncAction = ReturnType<typeof SaveDocFirstTimeRequest>
export type SaveDocFirstTimeSuccessAction = ReturnType<typeof SaveDocFirstTimeSuccess>
export type SaveDocFirstTimeFailAction = ReturnType<typeof SaveDocFirstTimeFail>