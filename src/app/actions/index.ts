import {
    LoadDocContentAsyncAction,
    LoadDocContentFailAction,
    LoadDocContentSuccessAction,
    SaveDocContentAsyncAction,
    SaveDocContentFailAction,
    SaveDocContentSuccessAction,
    SaveDocFirstTimeAsyncAction,
    SaveDocFirstTimeFailAction,
    SaveDocFirstTimeSuccessAction
    } from "app/actions/DocumentActions"
import {
    CancelSaveDocAsAction,
    ChangeActiveEditorAction,
    ChangeEditorContentAction,
    CloseExcerptDialogAction,
    CreateNewEmptyEditorAction,
    OpenExcerptDialogAction,
    SaveDocAsAction,
    TakeExcerptAction,
    } from "app/actions/EditorActions"
import { LoadDocListAsyncAction,
    LoadDocListFailAction,
    LoadDocListSuccessAction,
    OpenDocOnCurrentTabAction
    ,OpenDocOnNewTabAction
    } from "app/actions/NavigationActions";

export type EditingAction =
    ChangeActiveEditorAction |
    CreateNewEmptyEditorAction |
    LoadDocContentAsyncAction |
    LoadDocContentSuccessAction |
    LoadDocContentFailAction |
    ChangeEditorContentAction |
    OpenDocOnNewTabAction |
    OpenDocOnCurrentTabAction |
    SaveDocContentAsyncAction |
    SaveDocAsAction |
    SaveDocFirstTimeSuccessAction |
    TakeExcerptAction


export type EditorAction =
    LoadDocContentAsyncAction |
    LoadDocContentSuccessAction |
    LoadDocContentFailAction |
    ChangeEditorContentAction |
    SaveDocContentAsyncAction |
    SaveDocContentSuccessAction |
    SaveDocContentFailAction |
    SaveDocAsAction |
    OpenDocOnNewTabAction |
    OpenDocOnCurrentTabAction |
    SaveDocFirstTimeSuccessAction


export type SaveAsModalAction =
    SaveDocAsAction |
    CancelSaveDocAsAction |
    SaveDocFirstTimeAsyncAction |
    SaveDocFirstTimeSuccessAction |
    SaveDocFirstTimeFailAction

export type NavigationAction =
    LoadDocListAsyncAction |
    LoadDocListSuccessAction |
    LoadDocListFailAction |
    OpenDocOnNewTabAction

export type ExcerptDialogAction = OpenExcerptDialogAction | CloseExcerptDialogAction