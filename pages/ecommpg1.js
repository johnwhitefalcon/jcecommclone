





import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { Button, Input } from 'antd';
import { useForm } from "react-hook-form";
import Link from 'next/link';


export default function Web(){

       const { register, handleSubmit } = useForm();
       const onSubmit = async function(data){
       const response = await fetch("./api/productapi", {
           method: "POST",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify({data})
         })
         const resdata = await response.json();

       }

 
return (


<div className="bg-center bg-cover h-screen bg-fixed justify-center items-center bg-black flex" >

<div className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 z-0"/>


<div className="text-3xl fixed z-10 ml-[-50rem] mt-[-30rem] w-[20rem]">
    <img src="https://unsplash.com/photos/teal-and-brown-electric-guitar-phS37wg8cQg"/>

</div>

<div className="text-3xl fixed z-10 ml-[-40rem] mt-[-30rem] w-[20rem]">
    <img src="https://unsplash.com/photos/red-white-and-black-pedal-guitar-distortion-pedal-dxGObwcMJ0A"/>

</div>


<div className="text-3xl fixed z-10 ml-[30rem] mt-[-30rem] w-[20rem]" >
    <img src="https://unsplash.com/photos/a-close-up-of-a-speaker-with-the-word-vox-on-it-lg2JYrbLK54"/>

</div>

<div className="p-5 text-white z-10 text-5xl font-bold font-sans ml-[-10rem] mt-[-30rem] fixed">
       <Link href="/page2"><div>Ecomm Product Data Input</div></Link>


</div>

<button onClick={handleSubmit(onSubmit)} className="p-5 text-black font-bold bg-gray-300 z-10 font-sans ml-[-2rem] mt-[-7rem] w-[200px]">Submit</button>


<div className="w-[400px] ml-[30rem] mt-[-20rem] z-20">

<div className="mt-[25rem]">
<form className="space-y-2">
       <div>
<label className="p-2 text-white ml-[-0.5rem]">Product</label>
<input className="w-[400px]" {...register('product')} placeholder="product" />
       </div>

       <div>
<label className="p-2 text-white ml-[-0.5rem]">Price</label>
<input className="w-[400px]" {...register('price')} placeholder="price" />
       </div>

     


</form>  

</div>



</div>



<div className="fixed z-10 ml-[-61rem] mt-[2rem]">
        {/* Use Link component for navigation */}
        <Link href="/">
          {/* Use Ant Design Button */}
          <Button type="primary">Go to Home Page</Button>
        </Link>
      </div>


</div>



)


}





