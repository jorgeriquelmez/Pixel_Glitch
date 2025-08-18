import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // Calcula subtotal y total cada vez que el carrito cambia
  useEffect(() => {
    const newSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(newSubtotal);
    // Asume que el envío es siempre gratis
    setTotal(newSubtotal);
  }, [cart]);

  // Función para añadir un producto al carrito
  const addToCart = (game, platform) => {
    const existingItemIndex = cart.findIndex(item => item.id === game.id && item.platform === platform);
    
    if (existingItemIndex > -1) {
      // Si el juego y la plataforma ya existen, incrementa la cantidad
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Si el juego es nuevo, agrégalo al carrito con cantidad 1
      setCart([...cart, { ...game, platform, quantity: 1 }]);
    }
  };

  // Función para incrementar la cantidad
  const increaseQuantity = (id, platform) => {
    setCart(cart.map(item =>
      item.id === id && item.platform === platform
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  // Función para decrementar la cantidad
  const decreaseQuantity = (id, platform) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.platform === platform
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0); // Elimina el item si la cantidad llega a 0
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        subtotal,
        total,
        clearCart,
        setCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};