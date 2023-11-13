

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input } from 'antd';
import Link from 'next/link';
import Head from "next/head";
import { useForm } from "react-hook-form";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Document, Text, View } from '@react-pdf/renderer';

// import PDFDocument from './components/PDFDocuments';

export default function FormComponent() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isPageRefreshed, setIsPageRefreshed] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [aa, seta] = useState();
  const [five, setFive] = useState({ text1: '' });
  const [showDownloadLink, setShowDownloadLink] = useState(false); 


  const onSubmit = async ({ forminput1, forminput2, forminput3, forminput4, forminput5, forminput6 }) => {
    try {
      setIsFetching(true);

      const response = await fetch('./api/gpt23', {
        method: 'POST',
        body: JSON.stringify({ 
          prompt1: forminput1,
          prompt2: forminput2,
          prompt3: forminput3,
          prompt4: forminput4,
          prompt5: forminput5,
          prompt6: forminput6,          
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

        const two = [];
        const three = [];

        const one = data.map(function(item) {
          two.push(item.result)
        })

        var leng = two.length - 1;

        var cut = two.splice(leng, 1);
        for(var i = 0; i < two.length; i++) {
          // Do something with the data
        }

        three.push(cut);

        var four = three[0].toString()

        five.text1 = four

        submitgenerateWord()
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [result]);

  const finfin = function insertDoubleLineBreakBeforeLastLine(text1) {
    if (text1) {
      const lines = text1.split('.');
      const lastLine = lines.pop();
      const fin = lines.join('.') + '.<br /><br />' + lastLine;
      return fin
    } else {
      return '';
    }
  }

  const submitgenerateWord = async () => {
    const response11 = await fetch('./api/generatewordtemplate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(five),
    });

    const blob = await response11.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_document.docx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="text-white font-extrabold h-screen justify-center items-center bg-black flex">
      {/* ... */}

      <div className="text-2xl fixed z-10 ml-[45rem] mt-[-25rem] w-[100rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-2xl fixed z-10 ml-[0rem] mt-[0rem] w-[100rem]">
            <input {...register('forminput1')} placeholder="Employee Name" className="text-black"/>
          </div>

          <div className="text-2xl fixed z-10 ml-[0rem] mt-[5rem] w-[100rem]">
            <input {...register('forminput2')} placeholder="Disciplinary Issue" className="text-black"/>
          </div>

          <div className="text-2xl fixed z-10 ml-[0rem] mt-[10rem] w-[100rem]">
            <input {...register('forminput3')} placeholder="Meeting Time" className="text-black"/>
          </div>

          <div className="text-2xl fixed z-10 ml-[0rem] mt-[15rem] w-[100rem]">
            <input {...register('forminput4')} placeholder="Meeting Date" className="text-black"/>
          </div>

          <div className="text-2xl fixed z-10 ml-[0rem] mt-[20rem] w-[100rem]">
            <input {...register('forminput5')} placeholder="Meeting Location" className="text-black"/>
          </div>

          <div className="text-2xl fixed z-10 ml-[0rem] mt-[25rem] w-[100rem]">
            <input {...register('forminput6')} placeholder="Manager Name" className="text-black"/>
          </div>

          <div className="text-4xl fixed z-10 ml-[30rem] mt-[7rem] w-[20rem] bg-gray-500 py-4 px-4">
            <button type="submit" disabled={isFetching}>
              {isFetching ? 'Submitting...' : 'Create Word'}
            </button>
          </div>
        </form>
      </div>

      {showDownloadLink && result && (
        <div className="">
          {/* Display a link to download the Word document if available */}
          <a
            href={result} // The URL to download the Word document
            download="my_document.docx"
            className="text-4xl fixed z-10 ml-[2.5rem] mt-[5rem] w-[20rem] bg-gray-500 py-4 px-4"
          >
            Download Word
          </a>
        </div>
      )}
    </div>
  );
}