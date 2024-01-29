
import React, { useEffect, useState } from 'react';

export default function YourPage() {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/monggetmflix');
        const responseData = await response.json();
        

        const green = []
        for(var i = 0; i<responseData.length; i++){
            green.push(responseData[i].genres)
        }

        const blue = green.flat(5)
        console.log(blue)

setData(blue);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []);


  useEffect(() => {
  const fetchData1 = async function(data){
    data = 'dog'
  const response1 = await fetch('./api/vectoropenai11', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  const resdata1 = await response1.json();
  setData1(resdata1)
  console.log(resdata1)
}
fetchData1()

}, []);

  return (
    <div>
      {/* Render your data here */}
      {(() => {
        if (data1 !== null) {
          return <pre>{JSON.stringify(data1, null, 2)}</pre>;
        }
      })()}
    </div>
  );
}

