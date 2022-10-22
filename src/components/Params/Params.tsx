import React, {useEffect, useState} from 'react'
import styles from './Params.module.scss'
import Title from '../Title/Title'
import {Dropdown} from '../Dropdown/Dropdown'
import {useLocation} from 'react-router-dom'
import {getEndPath} from '../../utils/utils'
import {useParams} from './useParams'

const Params = () => {
    const {} = useParams({})

    const location = useLocation()
    const [currentPath, setCurrentPath] = useState<string>(getEndPath(location.pathname))

    const itemsEngine = [
        {label: 'Вариант 01', key: 'key 1'},
        {label: 'Вариант 02', key: 'key 2'},
        {label: 'Вариант 03', key: 'key 3', disabled: true},
        {label: 'Вариант 04', key: 'key 4'},
    ]
    const itemsMetrics = [
        {label: 'Вариант 01', key: 'key 1'},
        {label: 'Вариант 02', key: 'key 2'},
        {label: 'Вариант 03', key: 'key 3', disabled: true},
        {label: 'Вариант 04', key: 'key 4'},
    ]
    const itemsPhase = [
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
                        <Dropdown className={styles['item']} items={itemsEngine} placeholder={'Двигатель'} />
                        <Dropdown className={styles['item']} items={itemsMetrics} placeholder={'Метрика'} />
                        <Dropdown className={styles['item']} items={itemsPhase} placeholder={'Фаза полета'} />
                    </>
            }
            {
                currentPath === 'engine_type' &&
                    <>
                        <Dropdown className={styles['item']} items={itemsEngine} placeholder={'Тип двигателя'} />
                        <Dropdown className={styles['item']} items={itemsMetrics} placeholder={'Метрика'} />
                    </>
            }
            {
                currentPath === 'metrics' &&
                    <>
                        <Dropdown className={styles['item']} items={itemsEngine} placeholder={'id_engine'} />
                        <Dropdown className={styles['item']} items={itemsMetrics} placeholder={'Дата'} />
                        <Dropdown className={styles['item']} items={itemsPhase} placeholder={'Фаза полета'} />
                    </>
            }
        </>
    )
}

export default Params
