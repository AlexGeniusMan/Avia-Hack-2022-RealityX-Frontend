import React from 'react'
import styles from './Engine.module.scss'
import Title from '../Title/Title'
import Graph from '../Graph/Graph'

const Engine = () => {
    return (
        <div className={styles['engine']}>
            <div className={styles['title']}>
                <Title>История по двигателю</Title>
            </div>
            <div className={styles['content']}>
                <Graph xAxes={'name'} yAxes={'pv'} yLabel={'Значение'} xLabel={'Время'} />
            </div>
        </div>
    )
}

export default Engine
