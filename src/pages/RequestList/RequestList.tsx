import React, {useEffect} from 'react'
import styles from './RequestList.module.scss'
import {NavLink} from 'react-router-dom'
import SkyLayout from '../../components/SkyLayout/SkyLayout'
import SkyBlock from '../../components/SkyBlock/SkyBlock'
import RequestItem from '../../components/RequestItem/RequestItem'
import {Button} from '../../components/Button/Button'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType, TypedDispatch} from '../../redux/redux-store'
import {getSessions, statisticActions} from '../../redux/statistic-reducer'
import {getCurrentData} from '../../utils/utils'
import NoData from '../../components/NoData/NoData'

const RequestList = () => {
    const dispatch = useDispatch<TypedDispatch>()
    const sessions = useSelector((state: AppStateType) => state.stat.sessions)

    useEffect(() => {
        dispatch(getSessions())

        return () => {
            dispatch(statisticActions.setSessions([] as number[]))
        }
    }, [])

    return (
        <SkyLayout>
            <SkyBlock title={'Список заявок'}>
                <div className={styles['list']}>
                    {
                        sessions && sessions.length > 0 ?
                        sessions.map((item: number, index) => {
                            if(index < 4) {
                                return (
                                    <div key={index} className={styles['requestItem']}>
                                        <RequestItem status={'processed'} number={item} date={getCurrentData(new Date())} />
                                    </div>
                                )
                            }
                        })
                            : <NoData />
                    }
                    {/*<div className={styles['requestItem']}>*/}
                    {/*    <RequestItem status={'processed'} number={1} date={'22.10.2022'} />*/}
                    {/*</div>*/}
                    {/*<div className={styles['requestItem']}>*/}
                    {/*    <RequestItem status={'in_process'} number={2} date={'22.10.2022'} />*/}
                    {/*</div>*/}
                    {/*<div className={styles['requestItem']}>*/}
                    {/*    <RequestItem status={'cancelled'} number={3} date={'22.10.2022'} />*/}
                    {/*</div>*/}
                </div>
                <NavLink to={'/create'} className={styles['link']}>
                    <Button color={'green'}>Создать новую заявку</Button>
                </NavLink>
            </SkyBlock>
        </SkyLayout>
    )
}

export default compose(
    withAuthRedirect
)(RequestList)
