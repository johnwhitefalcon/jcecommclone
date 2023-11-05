
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

  const onSubmit = async ({ forminput1 }) => {
    try {
      setIsFetching(true);

      const response = await fetch('./api/dalle-image', {
        method: 'POST',
        body: JSON.stringify({ 
          prompt1: forminput1       
         }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data1 = await response.json();
      setResult(data1.result);
      setIsFetching(false);
      setShowDownloadLink(true);
    } catch (error) {
      setIsFetching(false);
    }
  };

  const submitToMongoDB = async () => {
    try {
      if (result !== null) {
        const response1 = await fetch('./api/mongapi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ result }),
        });
        const resdata = await response1.json();
        // Handle the response if needed
      }
    } catch (error) {
      // Handle the error
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (result !== null) {
          await submitToMongoDB();
        }

        const response = await fetch('./api/mongget');
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [result]);

  return (
    <div className="text-white font-extrabold h-screen justify-center items-center bg-black flex">
      <div className="text-6xl fixed z-10 ml-[25rem] mt-[-40rem] w-[80rem]">
        Dalle2
      </div>

      <div className="text-3xl fixed z-10 ml-[-80rem] mt-[-25rem] w-[20rem] scale-y-150 bg-black inline-block">
        <Image
          src="https://images.unsplash.com/photo-1556752462-c1135dd7b570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGVyJTIwZHJvcGxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt="Image"
          width={600}
          height={400}
        />
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

      <div className="text-4xl fixed z-10 ml-[2.5rem] mt-[5rem] w-[20rem] bg-gray-500 py-4 px-4">
        {/* Render fetched data here */}
        {fetchedData && typeof fetchedData === 'string' ? (
    <Image src={fetchedData} alt="Fetched Data" width={600} height={400} />
  ) : null}
      </div>
    </div>
  );
}

