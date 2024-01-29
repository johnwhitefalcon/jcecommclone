
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function Web() {
  const [fetchedData, setFetchedData] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (result !== null) {
          const response = await fetch('./api/monggetmflix');
          const data = await response.json();

          const two = [];
          const three = [];

          const one = data.map(function (item) {
            two.push(item.genres);
          });

          var leng = two.length - 1;

          var cut = two.splice(leng, 1);
          for (var i = 0; i < two.length; i++) {
            // Do something with the data
          }

          three.push(cut);

          setFetchedData(three);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [result]);

  const { register, handleSubmit } = useForm();
  const onSubmit = async function (data) {
    // Your submit logic here
  };

  const onj = async function (fetchedData) {
    try {
      const response = await fetch('./api/vectoropenai11', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fetchedData }),
      });
      const resdata = await response.json();
      setResult(resdata);
      console.log(resdata);
    } catch (error) {
      console.error(error);
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

  return (
    <div className="bg-center bg-cover h-screen bg-fixed justify-center items-center bg-black flex">
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 z-0" />

      <div className="text-3xl fixed z-10 ml-[-50rem] mt-[-30rem] w-[20rem]">
        <img src="https://unsplash.com/photos/teal-and-brown-electric-guitar-phS37wg8cQg" />
      </div>

      <div className="text-3xl fixed z-10 ml-[-40rem] mt-[-30rem] w-[20rem]">
        <img src="https://unsplash.com/photos/red-white-and-black-pedal-guitar-distortion-pedal-dxGObwcMJ0A" />
      </div>

      <div className="text-3xl fixed z-10 ml-[30rem] mt-[-30rem] w-[20rem]">
        <img src="https://unsplash.com/photos/a-close-up-of-a-speaker-with-the-word-vox-on-it-lg2JYrbLK54" />
      </div>

      <div className="p-5 text-white z-10 text-5xl font-bold font-sans ml-[-10rem] mt-[-30rem] fixed">
        <Link href="/page2">
          <div>Test API Input</div>
        </Link>
      </div>

      <button onClick={handleSubmit(onSubmit)} className="p-5 text-black font-bold bg-gray-300 z-10 font-sans ml-[-2rem] mt-[-7rem] w-[200px]">
        Submit
      </button>

      <div className="w-[400px] ml-[30rem] mt-[-20rem] z-20">
        <div className="mt-[25rem]">
          <form className="space-y-2">
            <div>
              <label className="p-2 text-white ml-[-0.5rem]">Product</label>
              <input className="w-[400px]" {...register('forminput1')} placeholder="product" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
