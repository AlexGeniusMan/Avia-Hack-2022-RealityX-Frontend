import React, {FC} from 'react'
import styles from './RequestItem.module.scss'
import {RequestProps} from './RequestProps'
import {useRequest} from './useRequest'
import {NavLink} from 'react-router-dom'

const RequestItem:FC<RequestProps> = (props) => {
    const {classes, status} = useRequest(props)

    return (
        <NavLink to={`/request/engine/${props.number}`} className={classes}>
            <div className={styles['info']}>
                <div className={styles['number']}>Заявка №{props.number}</div>
                <div className={styles['date']}>{props.date}</div>
            </div>
            <div className={styles['status']}>{status}</div>
        </NavLink>
    )
}

export default RequestItem
