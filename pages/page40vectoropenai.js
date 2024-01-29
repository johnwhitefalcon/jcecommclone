

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const array1 = ['dog', 'cat', 'bird'];

export default function Web() {
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const onSubmit = async function () {
      const response = await fetch("./api/vectoropenai11", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forminput1: array1[0] }) // Using the first element from array1
      });
      const resdata = await response.json();
      setApiResponse(resdata);
      console.log(resdata);
    };

    // Trigger form submission when the page loads
    onSubmit();
  }, []); // Empty dependency array ensures that useEffect runs only once on mount


  return (
    <div>
      {/* Render your data here */}
      {(() => {
        if (apiResponse !== null) {
          return <pre>{JSON.stringify(apiResponse, null, 2)}</pre>;
        }
      })()}
    </div>
  );
}


