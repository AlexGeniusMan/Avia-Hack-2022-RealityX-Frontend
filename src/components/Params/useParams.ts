import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getEngineGraphData, getMetricsTableData} from '../../redux/statistic-reducer'
import {TypedDispatch} from '../../redux/redux-store'
import {getCurrentData, getCurrentTime} from '../../utils/utils'

export const useParams = (props: any) => {
    const dispatch = useDispatch<TypedDispatch>()

    const [currentPhase, setCurrentPhase] = useState<string>('')
    const [currentEngineId, setCurrentEngineId] = useState<string>('')
    const [currentMetric, setCurrentMetric] = useState<string>('')
    const [currentDate, setCurrentDate] = useState<string>('')
    const [currentDateKey, setCurrentDateKey] = useState<string>('')

    const [phaseItems, setPhaseItems] = useState<any>([])
    const [engineItems, setEngineItems] = useState<any>([])
    const [metricItems, setMetricItems] = useState<any>([])
    const [dateItems, setDateItems] = useState<any>([])

    useEffect(() => {
        if(props.engineHistoryPhases.length > 0) {
            setPhaseItems(
                props.engineHistoryPhases.map((item: string) => {
                    return {
                        label: item,
                        key: item
                    }
                })
            )
        }
    }, [props.engineHistoryPhases])

    useEffect(() => {
        if(props.currentPath === 'engine') {
            if(props.engineHistory && currentPhase !== '') {
                setEngineItems(Object.keys(props.engineHistory[currentPhase]).map((item: string) => {
                    return {
                        label: item,
                        key: item,
                    }
                }))
            }
        }
        else if (props.currentPath === 'metrics') {
            if(props.metricsData && currentPhase !== '') {
                setEngineItems(Object.keys(props.metricsData[currentPhase]).map((item: string) => {
                    return {
                        label: item,
                        key: item,
                    }
                }))
            }
        }

    }, [currentPhase, props.currentPath])

    useEffect(() => {
        if(props.currentPath === 'engine') {
            if(props.engineHistory && currentPhase !== '' && currentEngineId !== '') {
                setMetricItems((props.engineHistory[currentPhase][currentEngineId]).metrics.map((item: string) => {
                    return {
                        label: item,
                        key: item,
                    }
                }))
            }
        }
        else if (props.currentPath === 'metrics') {
            if(props.metricsData && currentPhase !== '' && currentEngineId !== '') {
                setDateItems((props.metricsData[currentPhase][currentEngineId]).map((item: string) => {
                    return {
                        label: getCurrentData(new Date(item)) +' '+ getCurrentTime(new Date(item)),
                        key: item
                    }
                }))
            }
        }
    }, [currentEngineId, props.currentPath])

    useEffect(() => {
        if(props.engineHistory && currentPhase !== '' && currentMetric !== '' && currentEngineId !== '') {
            dispatch(getEngineGraphData(props.sessionId, currentPhase, currentEngineId, currentMetric))
        }
    }, [currentMetric])
    useEffect(() => {
        if(props.metricsData && currentPhase !== '' && currentEngineId !== '' && currentDate !== '') {
            dispatch(getMetricsTableData(props.sessionId, currentPhase, currentEngineId, currentDateKey))
        }
    }, [currentDate])

    const handleSelectPhase = (item: { label: string; key: string | number;
        event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> }) => {
        setCurrentPhase(item.label)
        setCurrentEngineId('')
        setCurrentMetric('')
    }
    const handleSelectEngine = (item: { label: string; key: string | number;
        event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> }) => {
        setCurrentEngineId(item.label)
        setCurrentMetric('')
        setCurrentDate('')
        setCurrentDateKey('')
    }
    const handleSelectMetric = (item: { label: string; key: string | number;
        event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> }) => {
        setCurrentMetric(item.label)
    }
    const handleSelectDate = (item: { label: string; key: string | number;
        event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> }) => {
        setCurrentDate(item.label as string)
        setCurrentDateKey(item.key as string)
    }

    return {currentPhase, currentEngineId, setCurrentPhase, setCurrentEngineId, handleSelectPhase, phaseItems, engineItems,
        handleSelectEngine, metricItems, handleSelectMetric, currentMetric, handleSelectDate, currentDate, dateItems}
}
