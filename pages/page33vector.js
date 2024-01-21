


import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input } from 'antd';
import Link from 'next/link';
import Head from "next/head";
import { useForm } from "react-hook-form";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Document, Text, View } from '@react-pdf/renderer';


export default function FormComponent() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isPageRefreshed, setIsPageRefreshed] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [aa, seta] = useState();
  const [five, setFive] = useState({ text1: '' });
  const [showDownloadLink, setShowDownloadLink] = useState(false); 


  const onSubmit = async (forminput1) => {
    try {
      if (result !== null) {
        const response1 = await fetch('./api/mongapi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({forminput1 }),
        });
        const resdata = await response1.json();
        console.log(resdata)
        // Handle the response if needed
      }
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <div className="text-white font-extrabold h-screen justify-center items-center bg-black flex">
      <div className="text-6xl fixed z-10 ml-[25rem] mt-[-40rem] w-[80rem]">
        Test Vector
      </div>

      <div className="text-3xl fixed z-10 ml-[-80rem] mt-[-25rem] w-[20rem] scale-y-150 bg-black inline-block">
        <img src="https://images.unsplash.com/photo-1556752462-c1135dd7b570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGVyJTIwZHJvcGxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" />
      </div>

      <div className="text-2xl fixed z-10 ml-[45rem] mt-[-25rem] w-[100rem]" >
        <form>
          <div className="text-2xl fixed z-10 ml-[0rem] mt-[0rem] w-[100rem]">
            <input {...register('forminput1')} placeholder="Employee Name" className="text-black"/>
          </div>

        </form>

        <div className="text-4xl fixed z-10 ml-[30rem] mt-[7rem] w-[20rem] bg-gray-500 py-4 px-4">
          <button onClick={handleSubmit(onSubmit)} type="submit" disabled={isFetching}>
            {isFetching ? 'Submitting...' : 'Create Word'}
          </button>
        </div>
      </div>



    </div>
  );
}


