import React, {useState} from 'react'
import styles from './Login.module.scss'
import {Navigate} from 'react-router-dom'
import {AppStateType, TypedDispatch} from '../../redux/redux-store'
import {useDispatch, useSelector} from 'react-redux'
import Preloader from '../../components/Preloader/Preloader'
import {ReactComponent as Logo} from '../../assets/logoDark.svg'
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
                <div className={styles['header']}>
                    <Logo />
                </div>
                <h2 className={styles['title']}>Авторизация</h2>
                <div className={styles['input']}>
                    <Input placeholder={'Логин'} defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles['input']}>
                    <Input placeholder={'Пароль'} defaultValue={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                </div>
                <div className={styles['button']}>
                    <Button onClick={handleSubmit}>Вход</Button>
                </div>
            </div>
        </div>
    )
}

export default Login
