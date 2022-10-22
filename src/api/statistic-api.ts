import {baseURL} from "./api";
import axios from "axios";
import {EngineHistoryData, EngineHistoryGraphData} from '../types/Types'

export type sendFileResponseType = {
    session_id: number
}
export type getEngineHistoryResponseType = {
    data: EngineHistoryData
}

export type getEngineGraphResponseType = {
    data: EngineHistoryGraphData[]
}

export const statisticAPI = {
    sendFile(file: File) {
        const accessToken = 'Bearer ' + localStorage.getItem('access')
        const data = new FormData()
        data.append('file', file)

        return axios.post<sendFileResponseType>(baseURL + `api/app/predict`, data,{
            headers: {
                'Authorization': `${accessToken}`
            }
        })
            .then((response) => response.data)
    },
    getEngineHistory(sessionId: string) {
        const accessToken = 'Bearer ' + localStorage.getItem('access')
        return axios.get<getEngineHistoryResponseType>(baseURL + `api/app/get_history_by_engine?session_id=${sessionId}`, {
            headers: {
                'Authorization': `${accessToken}`
            }
        })
            .then((response) => response.data)
    },
    getEngineGraph(sessionId: string, phase: string, engineId: string, metric: string) {
        const data = new FormData()
        data.append('session_id', sessionId)
        data.append('phase', phase)
        data.append('engine_id', engineId)
        data.append('metric', metric)

        const accessToken = 'Bearer ' + localStorage.getItem('access')
        return axios.post<getEngineGraphResponseType>(baseURL + `api/app/get_history_by_engine`, data, {
            headers: {
                'Authorization': `${accessToken}`
            }
        })
            .then((response) => response.data)
    },
}
