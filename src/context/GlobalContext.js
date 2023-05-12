import React, { createContext, useReducer } from 'react'

import reducer from './Reducer'

export const Store = createContext()

const initialState = {
    isLogged: false,
    username: localStorage.getItem("User") ? localStorage.getItem("User").split("@")[0] : ""
}

const GlobalContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const dipatchIsLogged = () => {
        return dispatch({ type: "LOGIN" })
    }

    const dipatchLogout = () => {
        return dispatch({ type: "LOGOUT" })
    }

    return (
        <Store.Provider value={{
            state,
            dipatchIsLogged,
            dipatchLogout
        }}>
            {children}
        </Store.Provider>
    )
}

export default GlobalContext