import React from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/headerLogo.svg'
import {Button} from '../Button/Button'
import {useDispatch} from 'react-redux'
import {TypedDispatch} from '../../redux/redux-store'
import {authActions} from '../../redux/auth-reducer'

const Header = () => {
    const dispatch = useDispatch<TypedDispatch>()

    const handleClick = () => {
        localStorage.removeItem('access')
        dispatch(authActions.logout())
    }

    return (
        <div className={styles['header']}>
            <div className={styles['inner']}>
                <img src={logo} alt='RealityX' />
                <Button onClick={handleClick} color={'green'}>Выйти</Button>
            </div>
        </div>
    )
}

export default Header
