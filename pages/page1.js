




import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { Button, Input } from 'antd';
import { useForm } from "react-hook-form";
import Link from 'next/link';


export default function Web(){

       const { register, handleSubmit } = useForm();
       const onSubmit = async function(data){
       const response = await fetch("./api/mongapi", {
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
    <img src="https://b2504970.smushcdn.com/2504970/wp-content/uploads/sunnyfield-disability-services-logo.png?lossy=0&strip=1&webp=1"/>

</div>


<div className="text-3xl fixed z-10 ml-[51rem] mt-[-30rem] w-[20rem]" >
    <img src="https://alliance20.org.au/wp-content/uploads/2018/06/alliance_20_logo.png"/>

</div>

<div className="p-5 text-white z-10 text-5xl font-bold font-sans ml-[-10rem] mt-[-30rem] fixed">
       <Link href="/page2"><div>Workforce Profile</div></Link>


</div>

<button onClick={handleSubmit(onSubmit)} className="p-5 text-black font-bold bg-gray-300 z-10 font-sans ml-[-2rem] mt-[-7rem] w-[200px]">Submit Profile</button>


<div className="w-[400px] ml-[30rem] mt-[-20rem] z-20">

<div className="mt-[25rem]">
<form className="space-y-2">
       <div>
<label className="p-2 text-white ml-[-0.5rem]">Q1: Full Time Support Worker Turnover %</label>
<select className="w-[400px]" {...register("Q1")}>
       <option value="25">25%</option>
        <option value="20">20%</option>
        <option value="15">15%</option>
        <option value="10">10%</option>
      </select>
       </div>

       <div>
<label className="p-2 text-white ml-[-0.5rem]">Q2: Part Time Support Worker Turnover %</label>
<select className="w-[400px]" {...register("Q2")}>
       <option value="25">25%</option>
        <option value="20">20%</option>
        <option value="15">15%</option>
        <option value="10">10%</option>
      </select>
       </div>

       <div>
<label className="p-2 text-white ml-[-0.5rem]">Q3: Casual Support Worker Turnover %</label>
<select className="w-[400px]" {...register("Q3")}>
       <option value="25">25%</option>
        <option value="20">20%</option>
        <option value="15">15%</option>
        <option value="10">10%</option>
      </select>
       </div>

       <div>
<label className="p-2 text-white ml-[-0.5rem]">Q4: Average Hours Part Time Support Worker</label>
<select className="w-[400px]" {...register("Q4")}>
       <option value="25">25 per week</option>
        <option value="20">20 per week</option>
        <option value="15">15 per week</option>
        <option value="10">10 per week</option>
      </select>
       </div>

       <div>
<label className="p-2 text-white ml-[-0.5rem]">Q5: Average Hours Casual Support Worker</label>
<select className="w-[400px]" {...register("Q5")}>
       <option value="25">25 per week</option>
        <option value="20">20 per week</option>
        <option value="15">15 per week</option>
        <option value="10">10 per week</option>
      </select>
       </div>

       <div>
<label className="p-2 text-white ml-[-0.5rem]">Q5: Manager/ Staff Ratio</label>
<select className="w-[400px]" {...register("Q5")}>
       <option value="15">1:15 SIL & CS</option>
        <option value="10">1:10 SIL & CS</option>
        <option value="5">1:5 SIL & CS</option>

      </select>
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


