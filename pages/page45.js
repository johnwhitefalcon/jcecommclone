



import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';

export default function pg45() {

    const one = {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        email: "john.doe@example.com",
        nested: {
            address: "123 Main Street",
            city: "Anytown",
            country: "USA"
        }
    };

    const two = []
    const three = []

    for (var key in one) {
        two.push(one[key]);
    }


    for (var key in one) {
        three.push({ key: key, value: one[key] });
      }

      const four = [];
      const five = Object.entries(one);
      
      for (var i = 0; i<five.length; i++){
        if(five[i] !== 'object'){
          four.push(five[i])
        }else{
          for (const [key, value] of Object.entries(five[i])){
              four.push(Object.entries(five[i][j]));

          }
                
         

          
          
        }

      }
      
console.log(four)


  return (
    <div className="text-white font-extrabold h-screen justify-center items-center bg-black flex">
     
    </div>
  );
}


