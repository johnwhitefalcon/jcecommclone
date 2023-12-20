
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutButton = () => {
  const { register, handleSubmit, errors } = useForm();
  const [price, setPrice] = useState(10.0);
  const [isButtonActive, setIsButtonActive] = useState(true);
const pubkey = process.env.STRIPEPUBLISH_KEY;
  const onSubmit = async (data) => {
    try {
      setIsButtonActive(false); // Disable the button during submission
      const stripe = await loadStripe('pk_test_51OKHtgLHdQFi89dKw37mAHYa9QsIpt8uk2CREFW6nHtHICRH8UPxouj03xJY8PZBVPAkQZr9fGVXueHmFR10WPD800D8UHTK9k');
      const response = await fetch('../api/stripeapi1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          price,
        }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error during checkout:', error);
        // Handle error as needed
      }
    } catch (err) {
      console.error('Error in creating checkout session:', err);
      // Handle error as needed
    } finally {
      setIsButtonActive(true); // Re-enable the button after submission
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
     
        <input {...register('data')}
        />
      
      <button type="submit" disabled={!isButtonActive}>
        {isButtonActive ? 'Buy Now' : 'Processing...'}
      </button>
    </form>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Sample Product</h1>
      <CheckoutButton />
    </div>
  );
};

export default Home;
