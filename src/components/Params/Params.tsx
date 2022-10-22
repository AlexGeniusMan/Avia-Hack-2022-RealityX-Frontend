import React, {useEffect} from 'react'
import styles from './Params.module.scss'
import Title from '../Title/Title'
import {Dropdown} from '../Dropdown/Dropdown'

const Params = () => {
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

    }, [])

    return (
        <>
            <div className={styles['title']}>
                <Title children={'Параметры'} />
            </div>
            <Dropdown className={styles['item']} items={itemsEngine} placeholder={'Двигатель'} />
            <Dropdown className={styles['item']} items={itemsMetrics} placeholder={'Метрика'} />
            <Dropdown className={styles['item']} items={itemsPhase} placeholder={'Фаза полета'} />
        </>
    )
}

export default Params
