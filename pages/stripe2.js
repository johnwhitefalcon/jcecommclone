
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input } from 'antd';
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

// Assuming you have process.env.STRIPEPUBLISHKEY defined somewhere
const stripePromise = loadStripe(process.env.STRIPEPUBLISHKEY);

const CheckoutButton = () => {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch("../api/stripeapi1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        router.push("/error");
      }
    } catch (err) {
      console.error("Error in creating checkout session:", err);
      router.push("/error");
    }
  };

  return (
    <button onClick={handleCheckout}>Buy Now</button>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Sample Product</h1>
      <p>Price: $10.00</p>
      <CheckoutButton />
    </div>
  );
};

export default Home;

