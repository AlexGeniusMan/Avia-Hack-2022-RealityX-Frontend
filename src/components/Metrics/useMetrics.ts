import {useEffect, useState} from 'react'
import {TableMetricsColumnsType, TableMetricsDataType} from '../../types/Types'

export const useMetrics = (metrics: any) => {
    const [data, setData] = useState<TableMetricsDataType[]>([
        // { metrics: 'BRAT', value: 12345, key: '1' },
        // { metrics: 'SWAT', value: 12345, key: '2' },
        // { metrics: 'KUM', value: 12345, key: '3' },
        // { metrics: 'BRAT', value: 12345, key: '4' },
        // { metrics: 'BRAT', value: 12345, key: '5' },
        // { metrics: 'BRAT', value: 12345, key: '6' },
        // { metrics: 'BRAT', value: 12345, key: '7' },
        // { metrics: 'BRAT', value: 12345, key: '8' },
        // { metrics: 'BRAT', value: 12345, key: '9' },
        // { metrics: 'BRAT', value: 12345, key: '10' },
        // { metrics: 'BRAT', value: 12345, key: '11' },
        // { metrics: 'BRAT', value: 12345, key: '12' },
        // { metrics: 'BRAT', value: 12345, key: '13' },
        // { metrics: 'BRAT', value: 12345, key: '14' },
        // { metrics: 'BRAT', value: 12345, key: '15' },
        // { metrics: 'BRAT', value: 12345, key: '16' },
        // { metrics: 'BRAT', value: 12345, key: '17' },
        // { metrics: 'BRAT', value: 12345, key: '18' },
        // { metrics: 'BRAT', value: 12345, key: '19' },
        // { metrics: 'BRAT', value: 12345, key: '20' },
        // { metrics: 'BRAT', value: 12345, key: '21' },
        // { metrics: 'BRAT', value: 12345, key: '22' },
    ])

    const columns = [
        {
            title: 'Метрика',
            dataIndex: 'metrics',
            key: 'metrics',
        },
        {
            title: 'Значение метрики',
            dataIndex: 'value',
            key: 'value',
        }
    ] as TableMetricsColumnsType[]

    useEffect(() => {
        if(metrics && Object.keys(metrics).length > 0) {
            const array = [] as TableMetricsDataType[]
            Object.keys(metrics).forEach((item, index) => {
                array.push(
                    {
                        metrics: item,
                        value: metrics[item],
                        key: index,
                    }
                )
            })
            setData(array)
        }
    }, [metrics])

    return {data, columns}
}
