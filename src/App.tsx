import React, {useEffect} from 'react'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard/Dashboard'
import {ToastContainer} from 'react-toastify'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login/Login'
import {authActions} from './redux/auth-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType, TypedDispatch} from './redux/redux-store'
import Preloader from './components/Preloader/Preloader'

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

    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<Dashboard />} />
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
