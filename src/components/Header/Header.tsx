import React from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/headerLogo.svg'
import {Button} from '../Button/Button'

const Header = () => {
    return (
        <div className={styles['header']}>
            <img src={logo} alt='RealityX' />
            <Button color={'green'}>Выйти</Button>
        </div>
    )
}

export default Header
