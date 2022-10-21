import React, { useCallback, useEffect, useMemo, useState} from 'react'
import {InputProps} from './InputProps'
import styles from './Input.module.scss'
import {getClasses} from '../../utils/getClasses'

export function useInput(props: InputProps) {
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        setValue(props.defaultValue || '')
    }, [])

    const handleClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        if (props.onClick) props.onClick(e)
    }, [])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(e)
        setValue(e.target.value)
    }, [])

    const classes = useMemo(() => {
        const conditions: {[index: string]: boolean} = {
            'input-wrapper': true,
            'input-wrapper-disabled': Boolean(props.disabled),
            'input-green': props.color === 'green',
        }
        return getClasses(conditions, styles, props.className)
    }, [props])

    return {
        classes,
        handleClick,
        value,
        handleChange,
    }
}

