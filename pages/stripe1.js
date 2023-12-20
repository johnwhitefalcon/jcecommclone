
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input } from 'antd';
import { useForm } from "react-hook-form";


import CheckoutButton from "./components/stripecomponent1";

export default function Home() {
  return (
    <div>
      <h1>Sample Product</h1>
      <p>Price: $10.00</p>
      <CheckoutButton />
    </div>
  );
}


