


import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';

export default function pg4() {
  return (
    <div className="text-white font-extrabold h-screen justify-center items-center bg-black flex">
      <div className="text-6xl fixed z-10 ml-[25rem] mt-[-35rem] w-[80rem]">
        People Application
      </div>

      <div className="text-3xl fixed z-10 ml-[-80rem] mt-[-25rem] w-[20rem] scale-y-150 bg-black inline-block">
        <img src="https://images.unsplash.com/photo-1556752462-c1135dd7b570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGVyJTIwZHJvcGxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" />
   
        <div className=""></div>
      </div>



      <div className="fixed z-10 ml-[-59rem] mt-[0rem]">

  <Button type="primary" onClick={()=>(window.location.href='https://www.surveymonkey.com/r/87SH7WB')}>Go To Survey</Button>

      </div>
    </div>
  );
}


