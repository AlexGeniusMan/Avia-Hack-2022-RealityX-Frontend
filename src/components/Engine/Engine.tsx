import React from 'react'
import styles from './Engine.module.scss'
import Title from '../Title/Title'

const Engine = () => {
    return (
        <div className={styles['engine']}>
            <div className={styles['title']}>
                <Title>История по двигателю</Title>
            </div>
        </div>
    )
}

export default Engine
