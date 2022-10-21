import React, {forwardRef} from 'react'
import styles from './Input.module.scss'
import {InputProps} from './InputProps'
import {useInput} from './useInput'

export const Input = forwardRef((props: InputProps, ref: any) => {
    const {classes, handleClick, value, handleChange} = useInput(props)

    return (
        <>
            {
                props.title &&
                <div className={styles['title']}>
                    {props.title}
                </div>
            }
            <div className={classes} style={props.style}>
                <label className={styles['input-outer']} htmlFor={props.id}>
                    <input className={styles['input']}
                           ref={ref}
                           autoFocus={props.autoFocus}
                           disabled={!!props.disabled}
                           value={value}
                           placeholder={props.placeholder}
                           name={props.name}
                           id={props.id}
                           type={props.type || 'text'}
                           maxLength={props.maxLength}
                           pattern={props.pattern}
                           tabIndex={props.tabIndex}
                           onClick={handleClick}
                           onKeyUp={props.onKeyUp}
                           onChange={handleChange}
                           onFocus={props.onFocus}
                           onBlur={props.onBlur}
                    />
                </label>
                {props.children}
            </div>
        </>
    )
})

