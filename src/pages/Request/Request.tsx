import React from 'react'
import styles from './Request.module.scss'
import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import Block from '../../components/Block/Block'
import Menu from '../../components/Menu/Menu'
import Params from '../../components/Params/Params'
import {Navigate, Route, Routes} from 'react-router-dom'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import Metrics from '../../components/Metrics/Metrics'
import Engine from '../../components/Engine/Engine'
import EngineType from '../../components/EngineType/EngineType'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'

const Request = () => {
    const sessionId = useSelector((state: AppStateType) => state.stat.sessionId)

    if (sessionId === 0) {
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
