
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OKHtgLHdQFi89dKw37mAHYa9QsIpt8uk2CREFW6nHtHICRH8UPxouj03xJY8PZBVPAkQZr9fGVXueHmFR10WPD800D8UHTK9k');

const CheckoutButton = () => {
  const { register, handleSubmit } = useForm();
  const [price] = useState(10.0);
  const [isButtonActive, setIsButtonActive] = useState(true);

  const onSubmit = async (data) => {
    try {
      setIsButtonActive(false); // Disable the button during submission
      const stripe = await stripePromise;
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
        window.location.href = '/error';
      }
    } catch (err) {
      console.error('Error in creating checkout session:', err);
      window.location.href = '/error';
    } finally {
      setIsButtonActive(true); // Re-enable the button after submission
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('data')} />
      
      <button type="submit" disabled={!isButtonActive}>
        {isButtonActive ? 'Buy Now' : 'Processing...'}
      </button>
    </form>
  );
};

const Home = () => (
  <div>
    <h1>Sample Product</h1>
    <CheckoutButton />
  </div>
);

export default Home;
