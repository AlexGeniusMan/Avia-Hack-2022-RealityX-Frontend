import React, {useState} from 'react'
import styles from './Login.module.scss'
import {Navigate} from 'react-router-dom'
import {AppStateType, TypedDispatch} from '../../redux/redux-store'
import {useDispatch, useSelector} from 'react-redux'
import Preloader from '../../components/Preloader/Preloader'
import {Input} from '../../components/Input/Input'
import {Button} from '../../components/Button/Button'
import {login} from '../../redux/auth-reducer'

const Login = () => {
    const dispatch = useDispatch<TypedDispatch>()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const isFetch = useSelector((state:AppStateType) => state.auth.isFetch)
    const isLogin = useSelector((state:AppStateType) => state.auth.isLogin)
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)

    if(isLogin || isAuth) {
        return <Navigate to='/' />
    }

    const handleSubmit = () => {
        dispatch(login(email, password))
    }

    return (
        <div className={styles['container']}>
            {isFetch && <Preloader />}
            <div className={styles['inner']}>
                <h2 className={styles['title']}>Авторизация</h2>
                <div className={styles['input']}>
                    <Input color={'green'} placeholder={'realityxTeam@pochta.dom'} defaultValue={email} title={'Логин'} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles['input']}>
                    <Input color={'green'} placeholder={'************'} defaultValue={password} title={'Пароль'} onChange={(e) => setPassword(e.target.value)} type='password' />
                </div>
                <div className={styles['button']}>
                    <Button color={'green'} onClick={handleSubmit}>Войти</Button>
                </div>
            </div>
        </div>
    )
}

export default Login
