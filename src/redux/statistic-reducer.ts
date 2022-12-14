import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authActions, AuthActionsType} from './auth-reducer'
import {getMetricsDataResponseType, statisticAPI} from '../api/statistic-api'
import {EngineHistoryData, EngineHistoryGraphData, MetricsData} from '../types/Types'
import {errorNotify} from '../utils/utils'

export type InitialStateType = typeof initialState
const initialState = {
    sessionId: 0 as number,
    engineHistory: {} as EngineHistoryData,
    engineHistoryPhases: [] as string[],
    engineGraphData: [] as EngineHistoryGraphData[],
    metricsData: {} as MetricsData,
    metricsTableData: {} as any,
    sessions: [] as number[],
}

const statisticReducer = (state = initialState, action: StatisticActionsType):InitialStateType  => {
    switch (action.type) {
        case 'AH/STATISTIC/SESSION_ID_RECEIVED':
            return {
                ...state,
                sessionId: action.payload.sessionId,
            }
        case 'AH/STATISTIC/SESSIONS_RECEIVED':
            return {
                ...state,
                sessions: action.payload.sessions,
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
        case 'AH/STATISTIC/METRICS_DATA_RECEIVED':
            return {
                ...state,
                metricsData: action.payload.data,
                engineHistoryPhases: Object.keys(action.payload.data)
            }
        case 'AH/STATISTIC/METRICS_TABLE_DATA_RECEIVED':
            return {
                ...state,
                metricsTableData: action.payload.data,
            }
        case 'AH/STATISTIC/CLEAR_DATA':
            return {
                ...state,
                sessionId: 0 as number,
                engineHistory: {} as EngineHistoryData,
                engineHistoryPhases: [] as string[],
                engineGraphData: [] as EngineHistoryGraphData[],
                metricsData: {} as MetricsData,
                metricsTableData: {} as any,
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
    setSessions: (sessions: number[]) =>
        ({type: 'AH/STATISTIC/SESSIONS_RECEIVED', payload: {sessions}} as const),
    setEngineHistory: (data: EngineHistoryData) =>
        ({type: 'AH/STATISTIC/ENGINE_HISTORY_RECEIVED', payload: {data}} as const),
    setEngineGraphData: (data: EngineHistoryGraphData[]) =>
        ({type: 'AH/STATISTIC/ENGINE_GRAPH_DATA_RECEIVED', payload: {data}} as const),
    setMetricsData: (data: MetricsData) =>
        ({type: 'AH/STATISTIC/METRICS_DATA_RECEIVED', payload: {data}} as const),
    setMetricsTableData: (data: any) =>
        ({type: 'AH/STATISTIC/METRICS_TABLE_DATA_RECEIVED', payload: {data}} as const),
    clearData: () =>
        ({type: 'AH/STATISTIC/CLEAR_DATA', payload: {}} as const),
}

export const sendFile = (file: File): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await statisticAPI.sendFile(file)
            console.log('getEngineHistory', data)
            dispatch(statisticActions.setSessionId(data.session_id))
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('getEngineHistory', e.response)
            dispatch(authActions.toggleIsFetching(false))
            errorNotify()
        }
    }
}
export const getSessions = (): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await statisticAPI.getSessions()
            console.log('getSessions', data)
            dispatch(statisticActions.setSessions(data))
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('getSessions', e.response)
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
export const getMetrics = (sessionId: string): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await statisticAPI.getMetrics(sessionId)
            console.log('getMetrics', data)
            dispatch(statisticActions.setMetricsData(data.data))
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('getMetrics', e.response)
            dispatch(authActions.toggleIsFetching(false))
            errorNotify()
        }
    }
}
export const getMetricsTableData = (sessionId: string, phase: string, engineId: string, flightDateTime: string): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        try {
            let data = await statisticAPI.getMetricsData(sessionId, phase, engineId, flightDateTime)
            console.log('getMetricsTableData', data)
            dispatch(statisticActions.setMetricsTableData(data.data))
            dispatch(authActions.toggleIsFetching(false))
        }
        catch (e: any) {
            console.error('getMetricsTableData', e.response)
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
