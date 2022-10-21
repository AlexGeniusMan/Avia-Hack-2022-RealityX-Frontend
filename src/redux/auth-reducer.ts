import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {StatusCodesEnum} from "../api/api";
import {errorNotify} from "../utils/utils";

export type InitialStateType = typeof initialState
const initialState = {
    isAuth: false as boolean,
    isLogin: false as boolean,
    isRegister: false as boolean,
    isAdminInitialize: false as boolean,
    isLoginError: false as boolean,
    isRegisterEmailError: false as boolean,
    isRegisterPasswordError: false as boolean,
    isInitialize: false as boolean,
    isActivateError: false as boolean,
    isFetch: false as boolean,
}

const authReducer = (state = initialState, action: AuthActionsType):InitialStateType  => {
    switch (action.type) {
        case 'PH/AUTH/LOGIN':
            return {
                ...state,
                isAuth: action.payload.isAuth,
            }
        case 'PH/AUTH/LOGOUT':
            return {
                ...state,
                isAuth: false,
                isLogin: false,
                isRegister: false,
            }
        case 'PH/AUTH/IS_USER_LOGIN': //User is login
            return {
                ...state,
                isLogin: action.payload.isLogin,
            }
        case 'PH/AUTH/IS_ADMIN_INITIALIZE': //Initializing admin
            return {
                ...state,
                isAdminInitialize: action.payload.isAdminInitialize,
            }
        case 'PH/AUTH/SET_LOGIN_ERROR': //Incorrect login or password
            return {
                ...state,
                isLoginError: action.payload.isLoginError,
            }
        case 'PH/AUTH/SET_REGISTER_EMAIL_ERROR': //Email is already exists
            return {
                ...state,
                isRegisterEmailError: action.payload.isRegisterEmailError,
            }
        case 'PH/AUTH/SET_REGISTER_PASSWORD_ERROR': //Password is too common, password is entirely numeric
            return {
                ...state,
                isRegisterPasswordError: action.payload.isRegisterPasswordError,
            }
        case 'PH/AUTH/SET_INITIALIZE': //initialize project
            return {
                ...state,
                isInitialize: action.payload.isInitialize,
            }
        case 'PH/AUTH/SET_IS_USER_REGISTER': //User is register
            return {
                ...state,
                isRegister: action.payload.isRegister,
            }
        case 'PH/AUTH/SET_ACTIVATE_ERROR': //invalid token or uid
            return {
                ...state,
                isActivateError: action.payload.isActivateError,
            }
        case 'PH/AUTH/TOGGLE_IS_FETCHING': //invalid token or uid
            return {
                ...state,
                isFetch: action.payload.isFetch,
            }
        default:
            return state;
    }
}

export type AuthActionsType = InferActionsTypes<typeof authActions>

export const authActions = {
    setIsAuth: (isAuth: boolean) =>
        ({type: 'PH/AUTH/LOGIN', payload: {isAuth}} as const),
    logout: () =>
        ({type: 'PH/AUTH/LOGOUT', payload: {}} as const),
    setIsUserLogin: (isLogin: boolean) =>
        ({type: 'PH/AUTH/IS_USER_LOGIN', payload: {isLogin}} as const),
    setIsAdminInitialize: (isAdminInitialize: boolean) =>
        ({type: 'PH/AUTH/IS_ADMIN_INITIALIZE', payload: {isAdminInitialize}} as const),
    setLoginError: (isLoginError: boolean) =>
        ({type: 'PH/AUTH/SET_LOGIN_ERROR', payload: {isLoginError}} as const),
    setIsInitialize: (isInitialize: boolean) =>
        ({type: 'PH/AUTH/SET_INITIALIZE', payload: {isInitialize}} as const),
    setIsRegister: (isRegister: boolean) =>
        ({type: 'PH/AUTH/SET_IS_USER_REGISTER', payload: {isRegister}} as const),
    setRegisterEmailError: (isRegisterEmailError: boolean) =>
        ({type: 'PH/AUTH/SET_REGISTER_EMAIL_ERROR', payload: {isRegisterEmailError}} as const),
    setRegisterPasswordError: (isRegisterPasswordError: boolean) =>
        ({type: 'PH/AUTH/SET_REGISTER_PASSWORD_ERROR', payload: {isRegisterPasswordError}} as const),
    setIsActivateError: (isActivateError: boolean) =>
        ({type: 'PH/AUTH/SET_ACTIVATE_ERROR', payload: {isActivateError}} as const),
    toggleIsFetching: (isFetch: boolean) =>
        ({type: 'PH/AUTH/TOGGLE_IS_FETCHING', payload: {isFetch}} as const),
}

type ThunkType = BaseThunkType<AuthActionsType>

export const login = (username: string, password: string): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await authAPI.login(username, password)
            console.log('login', data)
            if(data.access) {
                dispatch(authActions.setIsAuth(true))
                localStorage.setItem('access', data.access)
                dispatch(authActions.setIsInitialize(true))
            }
            else {
                throw new Error()
            }
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('login', e.response)
            if (e.response.status === StatusCodesEnum.Unauthorized) {
                dispatch(authActions.setLoginError(true))
            } else {
                errorNotify()
            }
            dispatch(authActions.toggleIsFetching(false))
            dispatch(authActions.setIsInitialize(true))
        }
    }
}
export const registration = (email: string, password: string): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await authAPI.register(email, password)
            console.log('register', data)
            if(data.id) {
                dispatch(authActions.setIsRegister(true))
            }
            else {
                throw new Error()
            }
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('register', e.response)
            if(e.response.status === StatusCodesEnum.BadRequest) {
                if(e.response.data.password) {
                    dispatch(authActions.setRegisterPasswordError(true))
                }
                else if(e.response.data.email) {
                    dispatch(authActions.setRegisterEmailError(true))
                }
            }
            else if (e.response.status === StatusCodesEnum.ServerError) {
                errorNotify()
            }
            else errorNotify()
            dispatch(authActions.toggleIsFetching(false))
        }
    }
}

export const activate = (uid: string, token: string): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await authAPI.activate(uid, token)
            console.log('activate', data)
            dispatch(authActions.setIsRegister(true))
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('activate', e.response)
            dispatch(authActions.setIsActivateError(true))
            dispatch(authActions.toggleIsFetching(false))
        }
    }
}

export default authReducer;
