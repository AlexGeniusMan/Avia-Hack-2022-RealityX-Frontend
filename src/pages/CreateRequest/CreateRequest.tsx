import React, {useState} from 'react'
import styles from './CreateRequest.module.scss'
import SkyLayout from '../../components/SkyLayout/SkyLayout'
import SkyBlock from '../../components/SkyBlock/SkyBlock'
import DragDrop from '../../components/DragDrop/DragDrop'
import {Button} from '../../components/Button/Button'
import {Navigate, NavLink} from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType, TypedDispatch} from '../../redux/redux-store'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {sendFile} from '../../redux/statistic-reducer'

const CreateRequest = () => {
    const dispatch = useDispatch<TypedDispatch>()
    const [file, setFile] = useState<File | null>(null)

    const isFetch = useSelector((state: AppStateType) => state.auth.isFetch)
    const sessionId = useSelector((state: AppStateType) => state.stat.sessionId)

    const handleFile = (file: File) => {
        setFile(file)
        console.log(file.name)
    }

    const handleSubmit = () => {
        if(file !== null) {
            dispatch(sendFile(file))
        }
    }

    if(sessionId !== 0) {
        return <Navigate to={`/request/engine/${sessionId}`} />
    }

    return (
        <SkyLayout preloader={false}>
            {
                isFetch ?
                <SkyBlock title={'Обработка заявки'}>
                    <Loader />
                </SkyBlock>
                :
                <SkyBlock title={'Новая заявка'}>
                    <div className={styles['drag']}>
                        <DragDrop handleFile={handleFile} />
                    </div>
                    <Button onClick={handleSubmit} className={styles['button']}>
                        Обработать заявку
                    </Button>
                    <NavLink className={styles['link']} to={'/'}>
                        Вернуться на главный экран
                    </NavLink>
                </SkyBlock>
            }
        </SkyLayout>
    )
}

export default compose(
    withAuthRedirect
)(CreateRequest)
