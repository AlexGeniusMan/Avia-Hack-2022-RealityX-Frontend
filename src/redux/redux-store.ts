import {Action, AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import authReducer from './auth-reducer'
import cameraReducer from './camera-reducer'
import logsReducer from './logs-reducer'
import settingsReducer from './settings-reducer'


let rootReducer  = combineReducers({
    auth: authReducer,
    camera: cameraReducer,
    logs: logsReducer,
    settings: settingsReducer,
});

type RootReducerType = typeof rootReducer //(globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

let store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

//key - это название action creator, a U - это выводимый тип функции
// type PropertiesTypes= T extends {[key: string]:
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type TypedDispatch = ThunkDispatch<AppStateType, any, AnyAction>;

if(process.env.NODE_ENV === 'development') {
    // @ts-ignore
    window.store = store;
}

export default store;
