import React, {FC} from 'react'
import Table from 'rc-table'
import styles from './TableComponent.module.scss'
import cl from 'classnames'

const TableComponent:FC<MyProps> = ({columns, data, className, tableLayout = 'auto'}) => {
    return (
        <Table tableLayout={tableLayout} className={cl(styles['table'], className)} columns={columns} data={data} />
    )
}

export default TableComponent

type MyProps = {
    columns: any
    data: any
    className?: string
    tableLayout?: 'auto' | 'fixed'
}
