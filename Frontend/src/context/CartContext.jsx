import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (game, platform) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === game.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...game, quantity: 1, platform }];
            }
        });
    };

    const updateQuantity = (gameId, quantity) => {
        setCartItems(prevItems => {
            if (quantity <= 0) {
                return prevItems.filter(item => item.id !== gameId);
            }
            return prevItems.map(item =>
                item.id === gameId ? { ...item, quantity } : item
            );
        });
    };

    const removeFromCart = (gameId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== gameId));
    };

    const value = {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};