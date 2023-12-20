

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function pg4() {
  const [imageSize, setImageSize] = useState({ width: 150, height: 100 }); // Set your desired width and height

  return (
    <div className="bg-black text-white text-3xl font-extrabold h-screen flex items-center justify-center">
     
   
     
      <div className="space-y-5 fixed z-10 ml-[-40rem] mt-[0rem]">Amp</div>
      <div className="space-y-5 fixed z-10 ml-[-40rem] mt-[8rem]">$5000</div>
      <div className="bg-black p-8 ml-[-10rem] mt-[-20rem]">
      <Link href="/ecommpg3">
             
        <img
          src="https://images.unsplash.com/photo-1588599376442-3cbf9c67449e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Description"
          width={imageSize.width}
          height={imageSize.height}
          className="rounded-md"
        />
        
        </Link>
      </div>



      <div className="space-y-5 fixed z-10 ml-[-12rem] mt-[0rem]">Guitar</div>
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




      <div className="space-y-5 fixed z-10 ml-[15rem] mt-[0rem]">Pedal</div>
      <div className="space-y-5 fixed z-10 ml-[15rem] mt-[8rem]">$600</div>
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

