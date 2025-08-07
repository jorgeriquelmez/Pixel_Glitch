import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [games, setGames] = useState([])
  const [cart, setCart]   = useState([])

  return (
    <AppContext.Provider value={{ games, setGames, cart, setCart }}>
      {children}
    </AppContext.Provider>
  )
}
