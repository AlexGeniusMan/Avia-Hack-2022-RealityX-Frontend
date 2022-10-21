import {baseURL} from "./api";
import axios from "axios";

export type LoginResponseType = {
    access: string,
    refresh: string,
}

export const authAPI = {
    login(username: string, password:string) {
        const data = new FormData()
        data.append('username', username)
        data.append('password', password)

        return axios.post<LoginResponseType>
        (baseURL + `api/auth/jwt/create`, data)
            .then((response) => response.data)
    },
    register(email: string, password: string) {
        const data = new FormData()
        data.append('username', email)
        data.append('password', password)
        return axios.post<{id: number}>(baseURL + `api/auth/users/`, data)
            .then((response) => response.data)
    },
    activate(uid: string, token: string) {
        const data = new FormData()
        data.append('uid', uid)
        data.append('token', token)
        return axios.post<{id: number}>(baseURL + `api/auth/users/activation/`, data)
            .then((response) => response.data)
    },
}
