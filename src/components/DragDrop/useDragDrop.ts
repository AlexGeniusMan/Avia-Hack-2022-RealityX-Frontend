import {DragDropProps} from './DragDropProps'
import {useDispatch} from 'react-redux'
import {TypedDispatch} from '../../redux/redux-store'
import React, {useState} from 'react'

export const useDragDrop = (props: DragDropProps) => {
    const dispatch = useDispatch<TypedDispatch>()

    const [drag, setDrag] = useState(false)
    const [fileError, setFileError] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isSubmit, setIsSubmit] = useState(false)

    function dragStartHandler(e: React.DragEvent) {
        e.preventDefault()
        setDrag(true)
        setFileError(false)
    }
    function dragLeaveHandler(e: React.DragEvent) {
        e.preventDefault()
        setDrag(false)
        setFileError(false)
    }
    function onDropHandler(e: any) {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        setFile(files[0])
        setDrag(false)
        // matchFileTxt(files[0].name)
    }
    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files) {
            setFile(e.target.files[0])
        }
        // matchFileTxt(files[0].name)
    }
    function matchFileTxt(name: string) {
        let test = /^.*\.txt$/gm

        if(!test.test(name)) {
            setFile(null)
            setFileError(true)
        }
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
