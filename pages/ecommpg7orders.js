
import Image from 'next/image';
import { Button, Input } from 'antd';

import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function pg4() {
  const [imageSize, setImageSize] = useState({ width: 150, height: 100 }); // Set your desired width and height
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
  const [product4, setProduct4] = useState(null);

 
  const onSubmit = async function(data){



  const response = await fetch("./api/ordersapi", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({data})
    })
    const resdata = await response.json();

  }





  useEffect(() => {
    async function fetchData1() {
      try {
      
        const response = await fetch('./api/productget');
        const data = await response.json();
        setFetchedData(data);

        const white = []
        const green =[]

        data.map(function(it){
          white.push(it.data.product)
        })

const counter = 1
const label = "setProduct"

        for(var i=0; i<white.length; i++){
            const count = counter+i
          green.push(label+count)
        }
       
setProduct1(white[0])
setProduct2(white[1])
setProduct3(white[2])
 
        
      } catch (error) {
        console.error(error);
      }
    }

    fetchData1();
  }, [result]);

  
  const handleDivClick = (divName) => {
    setSelect(divName);
  };

  console.log(select)
  return (
    <div className="bg-black text-white text-3xl font-extrabold h-screen flex items-center justify-center">
          
      <div className="space-y-5 fixed z-10 ml-[-40rem] mt-[0rem]"
  {...register('amp')}
  onClick={() => {
    handleDivClick(product1);
    handleSubmit(onSubmit({product1}));
  }}
      

      >{product1}</div>
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

      <div className="space-y-5 fixed z-10 ml-[-12rem] mt-[0rem]"

     {...register('guitar')}
     onClick={() => {
       handleDivClick(product2);
       handleSubmit(onSubmit({product2}));
     }}

      >{product2}</div>
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


      <div className="space-y-5 fixed z-10 ml-[15rem] mt-[0rem]"
 
      {...register('pedal')}
      onClick={() => {
        handleDivClick(product3);
        handleSubmit(onSubmit({product3}));
      }}

      >{product3}</div>
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





