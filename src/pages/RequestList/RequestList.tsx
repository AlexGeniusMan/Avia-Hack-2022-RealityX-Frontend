import React from 'react'
import styles from './RequestList.module.scss'
import {NavLink} from 'react-router-dom'
import SkyLayout from '../../components/SkyLayout/SkyLayout'
import SkyBlock from '../../components/SkyBlock/SkyBlock'

const RequestList = () => {
    return (
        <SkyLayout>
            <SkyBlock>
                Request list
                <NavLink to={'/create'}>Создание заявки</NavLink>
            </SkyBlock>
        </SkyLayout>
    )
}

export default RequestList
