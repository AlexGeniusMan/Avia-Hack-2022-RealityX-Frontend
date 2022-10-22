import {DragDropProps} from './DragDropProps'
import {useDispatch} from 'react-redux'
import {TypedDispatch} from '../../redux/redux-store'
import React, {useState} from 'react'
import {errorNotify} from '../../utils/utils'

export const useDragDrop = (props: DragDropProps) => {
    const dispatch = useDispatch<TypedDispatch>()

    const [drag, setDrag] = useState(false)
    const [fileError, setFileError] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isSubmit, setIsSubmit] = useState(false)

    function dragStartHandler(e: React.DragEvent) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHandler(e: React.DragEvent) {
        e.preventDefault()
        setDrag(false)
    }
    function onDropHandler(e: any) {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        if(files && files.length > 0) {
            if(matchFileCsv(files[0].name)) {
                setFile(files[0])
                if(props.handleFile) {
                    props.handleFile(files[0])
                }
            }
            else {
                errorNotify('Недопустимый формат файла!')
            }
        }
        setDrag(false)
        // matchFileTxt(files[0].name)
    }
    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if(files && files.length > 0) {
            if(matchFileCsv(files[0].name)) {
                setFile(files[0])
                if(props.handleFile) {
                    props.handleFile(files[0])
                }
            }
        }
    }
    function matchFileCsv(name: string) {
        let test = /^.*\.csv$/gm

        if(!test.test(name)) {
            setFile(null)
            return false
        }
        else return true
    }
    function handleSubmit() {
        if(file && file.name) {
            // dispatch(createMessage(description, file))
            // setIsSubmit(true)
        }
        else {
            setFileError(true)
        }
    }

    return {dragStartHandler, dragLeaveHandler, onDropHandler, drag, fileError, file, handleSubmit, handleFile}
}
