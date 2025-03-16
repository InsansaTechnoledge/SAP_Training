import React from 'react';
import PageLinks from './PageLinks';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import { UserProvider } from './Context/UserContext';

const App = () => {
  return (
    <div>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <PageLinks />
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
