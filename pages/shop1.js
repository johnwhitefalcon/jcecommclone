

import { useEffect, useState } from 'react';
import client from './api/shopify'; // Import your Shopify client

export default function Checkout() {
  const [checkoutId, setCheckoutId] = useState(null);

  useEffect(() => {
    // Create a new Shopify checkout
    client.checkout.create().then((checkout) => {
      setCheckoutId(checkout.id);
    });
  }, []);

  const handleCheckout = () => {
    // Redirect the user to the Shopify checkout page
    window.location.href = `https://7f614f.myshopify.com${checkoutId}`;
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}
