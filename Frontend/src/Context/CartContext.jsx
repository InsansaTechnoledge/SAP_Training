import { values } from 'o';
import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);


    const addToCart = (course) => {
        // setCart([...cart, item]);

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.title === course.title);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.title === course.title ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...course, quantity: 1 }];
        });
    }

    const removeFromCart = (title) => {
        setCart((prevCart) => {
            return prevCart
                .map(item =>
                    item.title === title ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0);
        });
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => {
    return useContext(CartContext);
};