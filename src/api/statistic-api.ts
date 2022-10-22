import {baseURL} from "./api";
import axios from "axios";

export type LoginResponseType = {

}

export const statisticAPI = {
    getEngineHistory(sessionId: string) {
        const accessToken = 'Bearer ' + localStorage.getItem('access')
        return axios.get<any>(baseURL + `api/get_history_by_engine?session_id=${sessionId}`, {
            headers: {
                'Authorization': `${accessToken}`
            }
        })
            .then((response) => response.data)
    },
    register(email: string, password: string) {
        const data = new FormData()
        data.append('email', email)
        data.append('password', password)
        return axios.post<{id: number}>(baseURL + `api/auth/users/`, data)
            .then((response) => response.data)
    },

}
