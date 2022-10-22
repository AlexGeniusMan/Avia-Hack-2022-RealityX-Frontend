import React, {forwardRef} from 'react'
import styles from './DragDrop.module.scss'
import {DragDropProps} from './DragDropProps'
import {useDragDrop} from './useDragDrop'
import cl from 'classnames'
import fileAdd from '../../assets/fileAdd.svg'
import fileDone from '../../assets/fileDone.svg'
import {Button} from '../Button/Button'

const DragDrop = forwardRef((props: DragDropProps, ref: any) => {
    const {file, fileError, dragStartHandler, dragLeaveHandler, onDropHandler, drag, handleSubmit, handleFile} = useDragDrop(props)

    return (
        <div ref={ref} className={cl(styles['container'], drag && styles['drag-container'], (file && file.name) && styles['drag-border'])}
             onDragStart={e => dragStartHandler(e)}
             onDragLeave={e => dragLeaveHandler(e)}
             onDragOver={e => dragStartHandler(e)}
             onDrop={e => onDropHandler(e)}
        >
            <h2 className={styles['title']}>Загрузка файла</h2>
            <div>
                <div className={cl(styles['area'], styles['drop-area'])}>
                    <img src={(file && file.name) ? fileDone : fileAdd} className={styles['file-icon']} alt='file-icon' />
                    {
                        file && file.name
                            ?
                            <div className={styles['loadFile']}>
                                Загружен файл {file.name}
                            </div>
                            :
                            <>
                                <div className={styles['format']}>
                                    Перетащите файл в область или выберите файл на компьютере
                                </div>
                                <div className={styles['button']}>
                                    <input onChange={handleFile} className={styles['input']} id={'file'} type='file' />
                                    <Button className={styles['button-inner']} color={'green'}>
                                        <label htmlFor='file'>
                                            Выбрать файл
                                        </label>
                                    </Button>
                                </div>
                            </>
                    }

                    {
                        fileError &&
                        <div className={styles['fileError']}>
                            Ошибка в формате файла
                        </div>
                    }
                </div>
            </div>
        </div>
    )
})

export default DragDrop
