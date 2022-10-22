import React, {useEffect, useState} from 'react'
import styles from './Request.module.scss'
import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import Block from '../../components/Block/Block'
import Menu from '../../components/Menu/Menu'
import Params from '../../components/Params/Params'
import {Navigate, Route, Routes, useParams} from 'react-router-dom'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import Metrics from '../../components/Metrics/Metrics'
import Engine from '../../components/Engine/Engine'
import EngineType from '../../components/EngineType/EngineType'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType, TypedDispatch} from '../../redux/redux-store'
import {getEndPath} from '../../utils/utils'
import {statisticActions} from '../../redux/statistic-reducer'

const Request = () => {
    const dispatch = useDispatch<TypedDispatch>()
    const [redirect, setRedirect] = useState(false)
    const params = useParams()
    const sessionId = useSelector((state: AppStateType) => state.stat.sessionId)

    useEffect(() => {
        const sessionId = Number(getEndPath(params['*'] as string, 1))
        if(params['*'] && !isNaN(sessionId)) {
            dispatch(statisticActions.setSessionId(sessionId))
        }
        else {
            setRedirect(true)
        }
    }, [])

    if (sessionId === 0 && redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <Layout>
            <Header />
            <div className={styles['block']}>
                <Block>
                    <div className={styles['inner']}>
                        <div className={styles['sidebar']}>
                            <div className={styles['menu']}>
                                <Menu />
                            </div>
                            <div className={styles['params']}>
                                <Params />
                            </div>
                        </div>
                        <div className={styles['content']}>
                            <Routes>
                                <Route path='engine/:session_id' element={<Engine />} />
                                <Route path='engine_type/:session_id' element={<EngineType />} />
                                <Route path='metrics/:session_id' element={<Metrics />} />
                            </Routes>
                        </div>
                    </div>
                </Block>
            </div>
        </Layout>
    )
}

export default compose(
    withAuthRedirect
)(Request)
