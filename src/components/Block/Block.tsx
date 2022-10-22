import React, {FC} from 'react'
import styles from './Block.module.scss'
import cl from 'classnames'

const Block:FC<MyProps> = ({children, className}) => {
    return (
        <div className={cl(styles['block'], className)}>
            {children}
        </div>
    )
}

export default Block

type MyProps = {
    children: string | React.ReactNode
    className?: string
}
