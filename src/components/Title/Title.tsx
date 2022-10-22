import React, {FC} from 'react'
import cl from 'classnames'
import styles from './Title.module.scss'

const Title:FC<MyProps> = ({children, className}) => {
    return (
        <div className={cl(styles['title'], className)}>
            {children}
        </div>
    )
}

export default Title

type MyProps = {
    children: string | React.ReactNode
    className?: string
}
