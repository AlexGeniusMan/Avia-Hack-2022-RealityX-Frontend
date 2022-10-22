import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authActions, AuthActionsType} from './auth-reducer'
import {statisticAPI} from '../api/statistic-api'
import {EngineHistoryData, EngineHistoryGraphData} from '../types/Types'
import {errorNotify} from '../utils/utils'

export type InitialStateType = typeof initialState
const initialState = {
    sessionId: 0 as number,
    engineHistory: {} as EngineHistoryData,
    engineHistoryPhases: [] as string[],
    engineGraphData: [] as EngineHistoryGraphData[]
}

const statisticReducer = (state = initialState, action: StatisticActionsType):InitialStateType  => {
    switch (action.type) {
        case 'AH/STATISTIC/SESSION_ID_RECEIVED':
            return {
                ...state,
                sessionId: action.payload.sessionId,
            }
        case 'AH/STATISTIC/ENGINE_HISTORY_RECEIVED':
            return {
                ...state,
                engineHistory: action.payload.data,
                engineHistoryPhases: Object.keys(action.payload.data)
            }
        case 'AH/STATISTIC/ENGINE_GRAPH_DATA_RECEIVED':
            return {
                ...state,
                engineGraphData: action.payload.data,
            }
        default:
            return state;
    }
}

export type StatisticActionsType = InferActionsTypes<typeof statisticActions>
type ThunkType = BaseThunkType<StatisticActionsType | AuthActionsType>

export const statisticActions = {
    setSessionId: (sessionId: number) =>
        ({type: 'AH/STATISTIC/SESSION_ID_RECEIVED', payload: {sessionId}} as const),
    setEngineHistory: (data: EngineHistoryData) =>
        ({type: 'AH/STATISTIC/ENGINE_HISTORY_RECEIVED', payload: {data}} as const),
    setEngineGraphData: (data: EngineHistoryGraphData[]) =>
        ({type: 'AH/STATISTIC/ENGINE_GRAPH_DATA_RECEIVED', payload: {data}} as const),
}

export const sendFile = (file: File): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await statisticAPI.sendFile(file)
            console.log('getEngineHistory', data)
            dispatch(statisticActions.setSessionId(data.sessionId))
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('getEngineHistory', e.response)
            dispatch(authActions.toggleIsFetching(false))
            errorNotify()
        }
    }
}

export const getEngineHistory = (sessionId: string): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await statisticAPI.getEngineHistory(sessionId)
            console.log('getEngineHistory', data)
            dispatch(statisticActions.setEngineHistory(data.data))
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('getEngineHistory', e.response)
            dispatch(authActions.toggleIsFetching(false))
            errorNotify()
        }
    }
}
export const getEngineGraphData = (sessionId: string, phase: string, engineId: string, metric: string): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await statisticAPI.getEngineGraph(sessionId, phase, engineId, metric)
            console.log('getEngineGraphData', data)
            dispatch(statisticActions.setEngineGraphData(data.data))
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('getEngineGraphData', e.response)
            dispatch(authActions.toggleIsFetching(false))
            errorNotify()
        }
    }
}

export default statisticReducer
