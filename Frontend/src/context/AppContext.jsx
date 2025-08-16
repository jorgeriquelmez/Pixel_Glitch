import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export function AppProvider({ children }) {
    const [games, setGames] = useState([])
    const [cart, setCart] = useState([])

    const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    const total = subtotal 

    return (
        <AppContext.Provider value={{ games, setGames, cart, setCart, subtotal, total }}>
            {children}
        </AppContext.Provider>
    )
}