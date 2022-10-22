import React from 'react'
import styles from './Request.module.scss'
import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import Block from '../../components/Block/Block'
import Menu from '../../components/Menu/Menu'
import Params from '../../components/Params/Params'
import {Route, Routes} from 'react-router-dom'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import Metrics from '../../components/Metrics/Metrics'

const Request = () => {
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
                                <Route path='engine' element={<div>engine</div>} />
                                <Route path='engine_type' element={<div>engine_type</div>} />
                                <Route path='metrics' element={<Metrics />} />
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
