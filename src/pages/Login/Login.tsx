import React, {useState} from 'react'
import styles from './Login.module.scss'
import {Navigate} from 'react-router-dom'
import {AppStateType, TypedDispatch} from '../../redux/redux-store'
import {useDispatch, useSelector} from 'react-redux'
import {Input} from '../../components/Input/Input'
import {Button} from '../../components/Button/Button'
import {login} from '../../redux/auth-reducer'
import SkyLayout from '../../components/SkyLayout/SkyLayout'
import SkyBlock from '../../components/SkyBlock/SkyBlock'

const Login = () => {
    const dispatch = useDispatch<TypedDispatch>()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const isLogin = useSelector((state:AppStateType) => state.auth.isLogin)
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)

    if(isLogin || isAuth) {
        return <Navigate to='/' />
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.code === 'Enter') {
            if(email !== '' && password !== '') {
                handleSubmit()
            }
        }
    }

    const handleSubmit = () => {
        dispatch(login(email, password))
    }

    return (
        <SkyLayout>
            <SkyBlock title={'Авторизация'}>
                <div className={styles['input']}>
                    <Input onKeyUp={handleKeyUp} color={'green'} placeholder={'example@example.ru'} defaultValue={email} title={'Логин'} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles['input']}>
                    <Input onKeyUp={handleKeyUp} color={'green'} placeholder={'************'} defaultValue={password} title={'Пароль'} onChange={(e) => setPassword(e.target.value)} type='password' />
                </div>
                <div className={styles['button']}>
                    <Button color={'green'} onClick={handleSubmit}>Войти</Button>
                </div>
            </SkyBlock>
        </SkyLayout>
    )
}

export default Login
