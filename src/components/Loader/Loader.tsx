import React from 'react'
import styles from './Loader.module.scss'
import {ReactComponent as PlaneLoader} from '../../assets/loader.svg'

const Loader = () => {
    return (
        <div className={styles['loader']}>
            <div className={styles['spin-anim']}>
                <PlaneLoader />
            </div>
        </div>
    )
}

export default Loader
