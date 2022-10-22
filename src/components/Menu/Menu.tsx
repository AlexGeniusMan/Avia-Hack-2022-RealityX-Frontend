import React from 'react'
import Title from '../Title/Title'
import {NavLink} from 'react-router-dom'
import styles from './Menu.module.scss'
import cl from 'classnames'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'

const Menu = () => {
    const sessionId = useSelector((state:AppStateType) => state.stat.sessionId)

    return (
        <>
            <div className={styles['title']}>
                <Title children={'Меню'} />
            </div>
            <NavLink className={({isActive}) => cl(styles['link'], isActive && styles['active'])} to={`/request/engine/${sessionId}`}>История по двигателю</NavLink>
            {/*<NavLink className={({isActive}) => cl(styles['link'], isActive && styles['active'])} to={`/request/engine_type/${sessionId}`}>История по типу двигателя</NavLink>*/}
            <NavLink className={({isActive}) => cl(styles['link'], isActive && styles['active'])} to={`/request/metrics/${sessionId}`}>Метрики</NavLink>
        </>
    )
}

export default Menu
