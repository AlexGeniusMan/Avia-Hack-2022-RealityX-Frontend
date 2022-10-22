import React from 'react'
import styles from './Metrics.module.scss'
import {useMetrics} from './useMetrics'
import TableComponent from '../TableComponent/TableComponent'

const Metrics = () => {
    const {data, columns} = useMetrics({})

    return (
        <div className={styles['metrics']}>
            <div className={styles['tableContainer']}>
                <TableComponent tableLayout={'fixed'} className={styles['table']} columns={columns} data={data} />
            </div>
        </div>
    )
}

export default Metrics


{/*{*/}
{/*        : <NoData />*/}
{/*}*/}
