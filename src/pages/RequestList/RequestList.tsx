import React from 'react'
import styles from './RequestList.module.scss'
import {NavLink} from 'react-router-dom'
import SkyLayout from '../../components/SkyLayout/SkyLayout'
import SkyBlock from '../../components/SkyBlock/SkyBlock'
import RequestItem from '../../components/RequestItem/RequestItem'
import {Button} from '../../components/Button/Button'

const RequestList = () => {
    return (
        <SkyLayout>
            <SkyBlock title={'Список заявок'}>
                <div className={styles['list']}>
                    <div className={styles['requestItem']}>
                        <RequestItem status={'processed'} number={1} date={'22.10.2022'} />
                    </div>
                    <div className={styles['requestItem']}>
                        <RequestItem status={'in_process'} number={2} date={'22.10.2022'} />
                    </div>
                    <div className={styles['requestItem']}>
                        <RequestItem status={'cancelled'} number={3} date={'22.10.2022'} />
                    </div>
                </div>
                <NavLink to={'/create'} className={styles['link']}>
                    <Button color={'green'}>Создать новую заявку</Button>
                </NavLink>
            </SkyBlock>
        </SkyLayout>
    )
}

export default RequestList
