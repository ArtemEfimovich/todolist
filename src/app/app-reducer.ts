import {setIsLoggedInAC} from "../features/auth-reducer";
import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


type ActionsType = SetAppStatusType | SetAppErrorType|SetIsInitializedType
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'SET-IS-INITIALIZED':
            return {...state,isInitialized: action.isInitialized}
        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}

export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}

export const setIsInitializedAC=(isInitialized: boolean)=>{
    return { type: 'SET-IS-INITIALIZED',isInitialized} as const
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setIsInitializedAC(true))
        } else {
        }
    })
        .catch((error:AxiosError)=>{
            handleServerNetworkError(error,dispatch)
        })
        .finally(()=>{
            dispatch(setIsInitializedAC(true))
        })
}
