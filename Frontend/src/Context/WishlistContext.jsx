import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState([]);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    const addToWishlist = (course) => {
        if (!wishlist.some((item) => item.title === course.title)) {
            setWishlist([...wishlist, course]);
        }
    }

    const removeFromWishlist = (courseTitle) => {
        setWishlist((prevWishlist) => prevWishlist.filter(item => item.title !== courseTitle));
    }

    return (
        <WishlistContext.Provider value={{wishlist, addToWishlist, removeFromWishlist, isWishlistOpen, setIsWishlistOpen}}>
            {children}
        </WishlistContext.Provider>
    )
};

export const useWishlist = () => {
    return useContext(WishlistContext);
}