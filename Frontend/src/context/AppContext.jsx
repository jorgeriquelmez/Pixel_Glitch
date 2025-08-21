// context/AppContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [games, setGames] = useState([]);   // 👈 agregado
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal);
  }, [cart]);

  const addToCart = (game, platform) => {
    const existingItemIndex = cart.findIndex(item => item.id === game.id && item.platform === platform);
    
    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...game, platform, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id, platform) => {
    setCart(cart.map(item =>
      item.id === id && item.platform === platform
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQuantity = (id, platform) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.platform === platform
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0);
    setCart(updatedCart);
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{
        games, setGames,   // 👈 ahora disponibles
        cart, setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        subtotal,
        total,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
