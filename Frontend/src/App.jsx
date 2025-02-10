import React from 'react';
import PageLinks from './PageLinks';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';

const App = () => {
  return (
    <div>
      <CartProvider>
        <WishlistProvider>
          <PageLinks />
        </WishlistProvider>
      </CartProvider>
    </div>
  );
}

export default App;
