import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Input } from 'antd';
import Link from 'next/link';
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'; // Import useRouter

export default function FormComponent() {
  const { register, handleSubmit } = useForm();
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const onSubmit = async (data) => {
    try {
      setIsFetching(true);

      // Push data.forminput1 to './util/vector'
      const resultData = { formInput1: data.forminput1 };
      localStorage.setItem('resultData', JSON.stringify(resultData));

      // Navigate to the './util/vector' file
      router.push('./util/vector');

      setIsFetching(false);
    } catch (error) {
      console.error('Error submitting form:', error.message);
      // Handle the error
    }
  };

  return (
    <div className="text-white font-extrabold h-screen justify-center items-center bg-black flex">
      <div className="text-6xl fixed z-10 ml-[25rem] mt-[-40rem] w-[80rem]">
        Test Vector
      </div>

      <div className="text-3xl fixed z-10 ml-[-80rem] mt-[-25rem] w-[20rem] scale-y-150 bg-black inline-block">
        <Image src="https://images.unsplash.com/photo-1556752462-c1135dd7b570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGVyJTIwZHJvcGxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" width={600} height={400} />
      </div>

      <div className="text-2xl fixed z-10 ml-[45rem] mt-[-25rem] w-[100rem]">
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