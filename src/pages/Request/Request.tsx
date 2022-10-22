import React from 'react'
import styles from './Request.module.scss'
import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import Block from '../../components/Block/Block'
import Menu from '../../components/Menu/Menu'
import Params from '../../components/Params/Params'

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

                        </div>
                    </div>
                </Block>
            </div>
        </Layout>
    )
}

export default Request
