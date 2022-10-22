import React, {useEffect} from 'react'
import styles from './Metrics.module.scss'
import {useMetrics} from './useMetrics'
import TableComponent from '../TableComponent/TableComponent'
import Title from '../Title/Title'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType, TypedDispatch} from '../../redux/redux-store'
import {getMetrics} from '../../redux/statistic-reducer'
import NoData from '../NoData/NoData'

const Metrics = () => {
    const dispatch = useDispatch<TypedDispatch>()
    const sessionId = useSelector((state: AppStateType) => state.stat.sessionId)
    const metricsTableData = useSelector((state: AppStateType) => state.stat.metricsTableData)

    const {data, columns} = useMetrics(metricsTableData)

    useEffect(() => {
        if(!isNaN(sessionId) && sessionId !== 0) {
            dispatch(getMetrics(String(sessionId)))
        }
    }, [sessionId])

    return (
        <div className={styles['metrics']}>
            <div className={styles['title']}>
                <Title>Метрики</Title>
            </div>
            <div className={styles['tableContainer']}>
                {
                    Object.values(metricsTableData).length > 0 ?
                        <TableComponent tableLayout={'fixed'} className={styles['table']} columns={columns} data={data} />
                        : <NoData />
                }
            </div>
        </div>
    )
}

export default Metrics
