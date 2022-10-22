import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authActions, AuthActionsType} from './auth-reducer'
import {authAPI} from '../api/auth-api'

export type InitialStateType = typeof initialState
const initialState = {
    isAuth: false as boolean,
}

const statisticReducer = (state = initialState, action: StatisticActionsType):InitialStateType  => {
    switch (action.type) {
        case 'AH/STATISTIC/ENGINE_HISTORY_RECEIVED':
            return {
                ...state,
                isAuth: action.payload.isAuth,
            }
        default:
            return state;
    }
}

export type StatisticActionsType = InferActionsTypes<typeof statisticActions>
type ThunkType = BaseThunkType<StatisticActionsType | AuthActionsType>

export const statisticActions = {
    setEngineHistory: (isAuth: boolean) =>
        ({type: 'AH/STATISTIC/ENGINE_HISTORY_RECEIVED', payload: {isAuth}} as const),
}

export const getEngineHistory = (username: string, password: string): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await authAPI.login(username, password)
            console.log('getEngineHistory', data)
            dispatch(statisticActions.setEngineHistory(true))
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('getEngineHistory', e.response)
        }
    }
}
