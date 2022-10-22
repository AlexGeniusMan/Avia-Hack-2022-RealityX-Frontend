import React, {useState} from 'react'
import styles from './Login.module.scss'
import {Navigate} from 'react-router-dom'
import {AppStateType, TypedDispatch} from '../../redux/redux-store'
import {useDispatch, useSelector} from 'react-redux'
import cl from 'classnames'
import Preloader from '../../components/Preloader/Preloader'
import {Input} from '../../components/Input/Input'
import {Button} from '../../components/Button/Button'
import {login} from '../../redux/auth-reducer'
import smallRight from '../../assets/Login/SmallRightCloud.svg'
import smallLeft from '../../assets/Login/SmallLeftCloud.svg'
import mediumLeft from '../../assets/Login/MediumLeftCloud.svg'
import mediumRight from '../../assets/Login/MediumRightCLoud.svg'
import bigCloud from '../../assets/Login/BigCloud.svg'
import plane from '../../assets/Login/LoginPlane.svg'
import logo from '../../assets/Login/WhiteLogo.svg'
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

    const handleSubmit = () => {
        dispatch(login(email, password))
    }

    return (
        <SkyLayout>
            <SkyBlock title={'Авторизация'}>
                <div className={styles['input']}>
                    <Input color={'green'} placeholder={'example@example.ru'} defaultValue={email} title={'Логин'} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles['input']}>
                    <Input color={'green'} placeholder={'************'} defaultValue={password} title={'Пароль'} onChange={(e) => setPassword(e.target.value)} type='password' />
                </div>
                <div className={styles['button']}>
                    <Button color={'green'} onClick={handleSubmit}>Войти</Button>
                </div>
            </SkyBlock>
        </SkyLayout>
    )
}

export default Login
