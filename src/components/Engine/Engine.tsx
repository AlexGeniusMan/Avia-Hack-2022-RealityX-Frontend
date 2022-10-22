import React, {useEffect} from 'react'
import styles from './Engine.module.scss'
import Title from '../Title/Title'
import Graph from '../Graph/Graph'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType, TypedDispatch} from '../../redux/redux-store'
import {getEngineHistory} from '../../redux/statistic-reducer'

const Engine = () => {
    const dispatch = useDispatch<TypedDispatch>()
    const sessionId = useSelector((state: AppStateType) => state.stat.sessionId)
    const engineGraphData = useSelector((state: AppStateType) => state.stat.engineGraphData)

    useEffect(() => {
        if(!isNaN(sessionId)) {
            dispatch(getEngineHistory(String(sessionId)))
        }
    }, [sessionId])

    return (
        <div className={styles['engine']}>
            <div className={styles['title']}>
                <Title>История по двигателю</Title>
            </div>
            <div className={styles['content']}>
                <Graph xAxes={'datetime'} yAxes={'value'} values={engineGraphData} name={'Значение'} yLabel={'Значение'} xLabel={'Время'} />
            </div>
        </div>
    )
}

export default Engine
