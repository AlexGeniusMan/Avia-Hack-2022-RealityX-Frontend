import React, {FC} from 'react'
import styles from './SkyBlock.module.scss'
import cl from 'classnames'

const SkyBlock:FC<MyProps> = ({title, children, className}) => {
    return (
        <div className={cl(styles['inner'], className)}>
            {title && <h2 className={styles['title']}>{title}</h2>}
            {children}
        </div>
    )
}

export default SkyBlock

type MyProps = {
    title?: string
    children: string | React.ReactNode
    className?: string
}

