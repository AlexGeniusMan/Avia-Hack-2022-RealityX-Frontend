import {toast} from 'react-toastify'
import {Dispatch} from 'redux'
import {StatusCodesEnum} from '../api/api'
import {authActions} from '../redux/auth-reducer'

export const errorNotify = (errorText?: string) => toast.error(errorText || 'Something went wrong');
export const infoNotify = (text?: string) => toast.info(text || 'Something happened');

export const getCurrentTime = (date?: Date) => {
    const localDate = date || new Date()
    return ('0'+localDate.getHours()).slice(-2)+':'+('0'+localDate.getMinutes()).slice(-2)+':'+('0'+localDate.getSeconds()).slice(-2)
}

export const getCurrentData = (date?: Date) => {
    const localDate = date || new Date()
    return ('0'+localDate.getDate()).slice(-2)+'.'+('0'+String(Number(localDate.getMonth()) + 1)).slice(-2)+'.'+('0'+localDate.getFullYear()).slice(-2)
}

// секундомер
export const stopwatch = (date?: Date) => {
    const localDate = date || new Date()
    localDate.setSeconds(localDate.getSeconds() + 1)
    return getCurrentTime(localDate)
}

export const errorsHandler = (e: any, dispatch: Dispatch) => {
    if(e.response) {
        if (e.response?.status === StatusCodesEnum.Unauthorized) {
            errorNotify('No access')
            localStorage.removeItem('access')
            dispatch(authActions.setIsAuth(false))
        }
        else if (e.response?.status === StatusCodesEnum.Forbidden) {
            errorNotify('No access')
            localStorage.removeItem('access')
            dispatch(authActions.setIsAuth(false))
        }
    }
    else {
        errorNotify()
    }
}

export const getEndPath = (path: string) => {
    const cutPath = path.split('/')
    return cutPath[cutPath.length - 2]
}
