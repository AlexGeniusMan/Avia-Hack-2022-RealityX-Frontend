import React, {FC} from 'react'
import cl from 'classnames'
import styles from './Layout.module.scss'
import Preloader from '../Preloader/Preloader'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'

const Layout:FC<MyProps> = ({children, className}) => {
    const isFetch = useSelector((state:AppStateType) => state.auth.isFetch)

    return (
        <div className={cl(styles['container'], className)}>
            {isFetch && <Preloader />}
            {children}
        </div>
    )
}

export default Layout

type MyProps = {
    children: string | React.ReactNode
    className?: string
}
