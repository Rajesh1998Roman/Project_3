import React, { Suspense, lazy, useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Store } from './context/GlobalContext'
import Navbar from './components/Navbar'

const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

const App = () => {

    const { state, dipatchIsLogged } = useContext(Store)

    useEffect(() => {
        const login = localStorage.getItem("User")
        if (login) {
            return dipatchIsLogged()
        }
    }, [state.isLogged])

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading....</div>}>
                <Navbar />
                <Routes>
                    <Route path='/' element={state.isLogged ? <Home /> : <Login />} />
                    <Route path='/login' element={state.isLogged ? <Home /> : <Login />} />
                    <Route path='/register' element={state.isLogged ? <Home /> : <Register />} />
                    <Route path='/products' element={state.isLogged ? <Products /> : <Login />} />
                    <Route path='/product/:id' element={state.isLogged ? <ProductDetails /> : <Login />} />

                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App