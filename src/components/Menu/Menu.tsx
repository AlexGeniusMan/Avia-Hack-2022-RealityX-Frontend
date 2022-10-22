import React from 'react'
import Title from '../Title/Title'
import {NavLink} from 'react-router-dom'
import styles from './Menu.module.scss'
import cl from 'classnames'

const Menu = () => {
    return (
        <>
            <div className={styles['title']}>
                <Title children={'Меню'} />
            </div>
            <NavLink className={({isActive}) => cl(styles['link'], isActive && styles['active'])} to={'/request/engine'}>История по двигателю</NavLink>
            <NavLink className={({isActive}) => cl(styles['link'], isActive && styles['active'])} to={'/request/engine_type'}>История по типу двигателя</NavLink>
            <NavLink className={({isActive}) => cl(styles['link'], isActive && styles['active'])} to={'/request/metrics'}>Метрики</NavLink>
        </>
    )
}

export default Menu
