// context/AppContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [games, setGames] = useState([]);   // 👈 agregado
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // 🔹 Cargar juegos desde la API al iniciar
 useEffect(() => {
  const fetchGames = async () => {
    try {
      const res = await fetch("https://pixel-glitch.onrender.com/api/games");
      const data = await res.json();

      // Normalizar nombres y precios según lo que devuelve tu backend
      const normalized = data.map(g => ({
          id: g.id,
          nombre: g.title,
          plataforma: g.platforms,
          precio: g.price,
          imagen: g.image || ""
        }));

      setGames(normalized);
    } catch (err) {
      console.error("Error cargando juegos:", err);
    }
  };
  fetchGames();
}, []);

  // Calcular subtotal y total
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
        games, setGames,
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
