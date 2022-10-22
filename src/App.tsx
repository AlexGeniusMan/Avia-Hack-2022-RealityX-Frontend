import React, {useEffect} from 'react'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login/Login'
import {authActions} from './redux/auth-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType, TypedDispatch} from './redux/redux-store'
import Preloader from './components/Preloader/Preloader'
import {Dropdown} from './components/Dropdown/Dropdown'
import DragDrop from './components/DragDrop/DragDrop'

const App = () => {
    const dispatch = useDispatch<TypedDispatch>()
    const isInitialize = useSelector((state: AppStateType) => state.auth.isInitialize)

    useEffect(() => {
        const token = localStorage.getItem('access')
        if (token) {
            dispatch(authActions.setIsAuth(true))
        }
        dispatch(authActions.setIsInitialize(true))

    }, [dispatch])

    if(!isInitialize) return <Preloader />

    const items = [
        {label: 'Вариант 01', key: 'key 1'},
        {label: 'Вариант 02', key: 'key 2'},
        {label: 'Вариант 03', key: 'key 3', disabled: true},
        {label: 'Вариант 04', key: 'key 4'},
    ]

    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<DragDrop />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default App
