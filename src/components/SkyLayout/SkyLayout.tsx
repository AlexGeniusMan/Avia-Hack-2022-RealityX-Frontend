import React, {FC} from 'react'
import styles from './SkyLayout.module.scss'
import Preloader from '../Preloader/Preloader'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import cl from 'classnames'
import bigCloud from '../../assets/Login/BigCloud.svg'
import plane from '../../assets/Login/LoginPlane.svg'
import mediumRight from '../../assets/Login/MediumRightCLoud.svg'
import mediumLeft from '../../assets/Login/MediumLeftCloud.svg'
import smallLeft from '../../assets/Login/SmallLeftCloud.svg'
import smallRight from '../../assets/Login/SmallRightCloud.svg'
import logo from '../../assets/Login/WhiteLogo.svg'

const SkyLayout:FC<MyProps> = ({children, className, preloader = true}) => {
    const isFetch = useSelector((state:AppStateType) => state.auth.isFetch)

    return (
        <div className={cl(styles['container'], className)}>
            {(preloader && isFetch) && <Preloader />}
            <img className={cl(styles['background'], styles['big-cloud'])} src={bigCloud} alt='' />
            <img className={cl(styles['background'], styles['plane'])} src={plane} alt='' />
            <img className={cl(styles['background'], styles['medium-right'])} src={mediumRight} alt='' />
            <img className={cl(styles['background'], styles['medium-left'])} src={mediumLeft} alt='' />
            <img className={cl(styles['background'], styles['small-left'])} src={smallLeft} alt='' />
            <img className={cl(styles['background'], styles['small-right'])} src={smallRight} alt='' />
            <img className={cl(styles['background'], styles['logo'])} src={logo} alt='' />

            {children}
        </div>
    )
}

export default SkyLayout

type MyProps = {
    children: string | React.ReactNode
    className?: string
    preloader?: boolean
}
