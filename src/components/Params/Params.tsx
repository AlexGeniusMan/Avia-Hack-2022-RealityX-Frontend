import React, {useEffect, useState} from 'react'
import styles from './Params.module.scss'
import Title from '../Title/Title'
import {Dropdown} from '../Dropdown/Dropdown'
import {useLocation} from 'react-router-dom'
import {getEndPath} from '../../utils/utils'
import {useParams} from './useParams'
import SelectComponent from '../SelectComponent/SelectComponent'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'

const Params = () => {
    const location = useLocation()
    const sessionId = useSelector((state:AppStateType) => state.stat.sessionId)
    const engineHistory = useSelector((state:AppStateType) => state.stat.engineHistory)
    const engineHistoryPhases = useSelector((state:AppStateType) => state.stat.engineHistoryPhases)
    const [currentPath, setCurrentPath] = useState<string>(getEndPath(location.pathname))

    const {currentPhase, currentEngineId, handleSelectPhase, phaseItems, engineItems, handleSelectEngine,
        metricItems, handleSelectMetric, currentMetric}
        = useParams({currentPath, engineHistoryPhases, engineHistory, sessionId})

    const itemsMetrics = [
        {label: 'Вариант 01', key: 'key 1'},
        {label: 'Вариант 02', key: 'key 2'},
        {label: 'Вариант 03', key: 'key 3', disabled: true},
        {label: 'Вариант 04', key: 'key 4'},
    ]

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
                        <Dropdown defaultSelectedKey={currentPhase} onSelect={handleSelectPhase} className={styles['item']} disabled={engineHistoryPhases.length === 0} items={phaseItems} placeholder={'Фаза полета'} />
                        <Dropdown defaultSelectedKey={currentEngineId} onSelect={handleSelectEngine} className={styles['item']} items={engineItems} disabled={currentPhase === ''} placeholder={'Двигатель'} />
                        <Dropdown defaultSelectedKey={currentMetric} onSelect={handleSelectMetric} className={styles['item']} items={metricItems} disabled={currentEngineId === ''} placeholder={'Метрика'} />
                    </>
            }
            {
                currentPath === 'engine_type' &&
                    <>
                        <Dropdown className={styles['item']} items={itemsMetrics} placeholder={'Тип двигателя'} />
                        <Dropdown className={styles['item']} items={itemsMetrics} placeholder={'Метрика'} />
                    </>
            }
            {
                currentPath === 'metrics' &&
                    <>
                        <SelectComponent />
                        <Dropdown className={styles['item']} items={phaseItems} placeholder={'Фаза полета'} />
                        <Dropdown className={styles['item']} items={itemsMetrics} placeholder={'Дата'} />
                    </>
            }
        </>
    )
}

export default Params
