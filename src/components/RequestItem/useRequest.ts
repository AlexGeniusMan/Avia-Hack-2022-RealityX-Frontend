import {RequestProps, RequestStatusType} from './RequestProps'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {getClasses} from '../../utils/getClasses'
import styles from './RequestItem.module.scss'

export const useRequest = (props: RequestProps) => {
    const [status, setStatus] = useState<string>('')

    useEffect(() => {
        handleNewStatus(props.status)
    }, [props.status])

  const handleNewStatus = useCallback((status: RequestStatusType) => {
      if(status === 'processed') setStatus('Обработано')
      else if(status === 'in_process') setStatus('В процессе')
      else if(status === 'cancelled') setStatus('Отклонено')
      else setStatus('В процессе')
  }, [])

    const classes = useMemo(() => {
        const conditions:{[index: string]:boolean} = {
            "request": true,
            "request-red": props.status === 'cancelled',
            "request-green": props.status === 'processed',
            "request-blue": props.status === 'in_process' || !props.status,
        };
        return getClasses(conditions, styles)
    }, [props]);

    return {classes, status}
}
