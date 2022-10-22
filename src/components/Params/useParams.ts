import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getEngineGraphData} from '../../redux/statistic-reducer'
import {TypedDispatch} from '../../redux/redux-store'

export const useParams = (props: any) => {
    const dispatch = useDispatch<TypedDispatch>()

    const [currentPhase, setCurrentPhase] = useState<string>('')
    const [currentEngineId, setCurrentEngineId] = useState<string>('')
    const [currentMetric, setCurrentMetric] = useState<string>('')

    const [phaseItems, setPhaseItems] = useState<any>([])
    const [engineItems, setEngineItems] = useState<any>([])
    const [metricItems, setMetricItems] = useState<any>([])

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
        if(props.engineHistory && currentPhase !== '') {
            setEngineItems(Object.keys(props.engineHistory[currentPhase]).map((item: string) => {
                return {
                    label: item,
                    key: item
                }
            }))
        }
    }, [currentPhase])

    useEffect(() => {
        if(props.engineHistory && currentPhase !== '' && currentEngineId !== '') {
            setMetricItems((props.engineHistory[currentPhase][currentEngineId]).metrics.map((item: string) => {
                return {
                    label: item,
                    key: item
                }
            }))
        }
    }, [currentEngineId])
    useEffect(() => {
        if(props.engineHistory && currentPhase !== '' && currentMetric !== '' && currentEngineId !== '') {
            dispatch(getEngineGraphData(props.sessionId, currentPhase, currentEngineId, currentMetric))
        }
    }, [currentMetric])

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
    }
    const handleSelectMetric = (item: { label: string; key: string | number;
        event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> }) => {
        setCurrentMetric(item.label)
    }

    return {currentPhase, currentEngineId, setCurrentPhase, setCurrentEngineId, handleSelectPhase, phaseItems, engineItems,
        handleSelectEngine, metricItems, handleSelectMetric, currentMetric}
}
