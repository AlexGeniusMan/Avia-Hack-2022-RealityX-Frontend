import React, {useState} from 'react'
import styles from './CreateRequest.module.scss'
import SkyLayout from '../../components/SkyLayout/SkyLayout'
import SkyBlock from '../../components/SkyBlock/SkyBlock'
import DragDrop from '../../components/DragDrop/DragDrop'
import {Button} from '../../components/Button/Button'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'

const CreateRequest = () => {
    const [file, setFile] = useState<File | null>(null)

    const isFetch = useSelector((state: AppStateType) => state.auth.isFetch)

    const handleFile = (file: File) => {
        setFile(file)
        console.log(file.name)
    }

    return (
        <SkyLayout>
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
                    <Button className={styles['button']}>
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
