import React from 'react'
import styles from './EngineType.module.scss'
import Title from '../Title/Title'

const EngineType = () => {
    return (
        <div className={styles['engine']}>
            <div className={styles['title']}>
                <Title>История по типу двигателя</Title>
            </div>
        </div>
    )
}

export default EngineType
