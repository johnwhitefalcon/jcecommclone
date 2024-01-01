

import Image from 'next/image';
import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

export default function pg4() {
  const [imageSize, setImageSize] = useState({ width: 150, height: 100 });
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isPageRefreshed, setIsPageRefreshed] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [aa, seta] = useState();
  const [five, setFive] = useState({ text1: '' });
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [select, setSelect] = useState('');
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [product3, setProduct3] = useState(null);

  const { errors, handleSubmit: handleSubmitStripe } = useForm();
  const [price, setPrice] = useState(10.0);
  const [isButtonActive, setIsButtonActive] = useState(true);

  const [stripePromise] = useState(loadStripe('pk_test_51OKHtgLHdQFi89dKw37mAHYa9QsIpt8uk2CREFW6nHtHICRH8UPxouj03xJY8PZBVPAkQZr9fGVXueHmFR10WPD800D8UHTK9k')); // Replace with your actual publishable key

  const handleDivClick = async (product) => {
    setSelect(product);

    try {
      setIsButtonActive(false);
      const stripe = await stripePromise;
      const response = await fetch('./api/stripeapi1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product,
          price,
        }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error during checkout:', error);
      }
    } catch (err) {
      console.error('Error in creating checkout session:', err);
    } finally {
      setIsButtonActive(true);
    }
  };

  useEffect(() => {
    async function fetchData1() {
      try {
        const response = await fetch('./api/productget');
        const data = await response.json();
        setFetchedData(data);

        // ... (rest of your existing fetchData1 logic)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData1();
  }, [result]);

  return (
    <div className="bg-black text-white text-3xl font-extrabold h-screen flex items-center justify-center">
      {/* Render product 1 */}
      <div
        className="space-y-5 fixed z-10 ml-[-40rem] mt-[0rem]"
        {...register('amp')}
        onClick={() => handleDivClick(product1)}
      >
        {product1}
      </div>
      <div className="space-y-5 fixed z-10 ml-[-40rem] mt-[8rem]">$5000</div>
      <div className="bg-black p-8 ml-[-10rem] mt-[-20rem]">
        <img
          src="https://images.unsplash.com/photo-1588599376442-3cbf9c67449e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Description"
          width={imageSize.width}
          height={imageSize.height}
          className="rounded-md"
        />
      </div>

      {/* Render product 2 */}
      <div
        className="space-y-5 fixed z-10 ml-[-12rem] mt-[0rem]"
        {...register('guitar')}
        onClick={() => handleDivClick(product2)}
      >
        {product2}
      </div>
      <div className="space-y-5 fixed z-10 ml-[-12rem] mt-[8rem]">$2000</div>
      <div className="bg-black p-8 ml-[0rem] mt-[-20rem]">
        <img
          src="https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Description"
          width={imageSize.width}
          height={imageSize.height}
          className="rounded-md"
        />
      </div>

      {/* Render product 3 */}
      <div
        className="space-y-5 fixed z-10 ml-[-15rem] mt-[0rem]"
        {...register('pedal')}
        onClick={() => handleDivClick(product3)}
      >
        {product3}
      </div>
      <div className="space-y-5 fixed z-10 ml-[-15rem] mt-[8rem]">$600</div>
      <div className="bg-black p-8 ml-[0rem] mt-[-20rem]">
        <img
          src="https://images.unsplash.com/photo-1527865118650-b28bc059d09a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Description"
          width={imageSize.width}
          height={imageSize.height}
          className="rounded-md"
        />
      </div>
    </div>
  );
}

