import React, {useEffect, useState} from 'react'
import styles from './Params.module.scss'
import Title from '../Title/Title'
import {Dropdown} from '../Dropdown/Dropdown'
import {useLocation} from 'react-router-dom'
import {getEndPath} from '../../utils/utils'
import {useParams} from './useParams'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'

const Params = () => {
    const location = useLocation()
    const isFetch = useSelector((state:AppStateType) => state.auth.isFetch)
    const sessionId = useSelector((state:AppStateType) => state.stat.sessionId)
    const engineHistory = useSelector((state:AppStateType) => state.stat.engineHistory)
    const metricsData = useSelector((state:AppStateType) => state.stat.metricsData)
    const engineHistoryPhases = useSelector((state:AppStateType) => state.stat.engineHistoryPhases)
    const [currentPath, setCurrentPath] = useState<string>(getEndPath(location.pathname))

    const {currentPhase, currentEngineId, handleSelectPhase, phaseItems, engineItems, handleSelectEngine,
        metricItems, handleSelectMetric, currentMetric, currentDate, handleSelectDate, dateItems}
        = useParams({currentPath, engineHistoryPhases, engineHistory, sessionId, metricsData})

    useEffect(() => {
        setCurrentPath(getEndPath(location.pathname))
    }, [location])

    return (
        <>
            <div className={styles['title']}>
                <Title children={'Параметры'} />
            </div>
            {
                currentPath === 'engine' &&
                    <>
                        <Dropdown defaultSelectedKey={currentPhase} onSelect={handleSelectPhase} className={styles['item']} disabled={isFetch || engineHistoryPhases.length === 0} items={phaseItems} placeholder={'Фаза полета'} />
                        <Dropdown defaultSelectedKey={currentEngineId} onSelect={handleSelectEngine} className={styles['item']} items={engineItems} disabled={isFetch || currentPhase === ''} placeholder={'Двигатель'} />
                        <Dropdown defaultSelectedKey={currentMetric} onSelect={handleSelectMetric} className={styles['item']} items={metricItems} disabled={isFetch || currentEngineId === ''} placeholder={'Метрика'} />
                    </>
            }
            {
                // currentPath === 'engine_type' &&
                //     <>
                //         <Dropdown className={styles['item']} items={itemsMetrics} placeholder={'Тип двигателя'} />
                //         <Dropdown className={styles['item']} items={itemsMetrics} placeholder={'Метрика'} />
                //     </>
            }
            {
                currentPath === 'metrics' &&
                    <>
                        <Dropdown defaultSelectedKey={currentPhase} onSelect={handleSelectPhase} className={styles['item']} disabled={isFetch || engineHistoryPhases.length === 0} items={phaseItems} placeholder={'Фаза полета'} />
                        <Dropdown defaultSelectedKey={currentEngineId} onSelect={handleSelectEngine} className={styles['item']} items={engineItems} disabled={isFetch || currentPhase === ''} placeholder={'Двигатель'} />
                        <Dropdown defaultSelectedKey={currentDate} onSelect={handleSelectDate} className={styles['item']} items={dateItems} disabled={isFetch || currentEngineId === ''} placeholder={'Дата'} />
                        {/*<SelectComponent />*/}
                    </>
            }
        </>
    )
}

export default Params
