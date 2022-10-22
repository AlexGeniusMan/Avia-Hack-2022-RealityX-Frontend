import React from 'react'
import styles from './EngineType.module.scss'
import Title from '../Title/Title'
import Graph from '../Graph/Graph'

const EngineType = () => {
    return (
        <div className={styles['engine']}>
            <div className={styles['title']}>
                <Title>История по типу двигателя</Title>
            </div>
            <div className={styles['content']}>
                <Graph xAxes={'name'} yAxes={'uv'} yLabel={'Вэлью'} xLabel={'Время'} color={'blue'} type={'Bar'} />
            </div>
        </div>
    )
}

export default EngineType
