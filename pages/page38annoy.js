

import { useEffect, useState } from 'react';
import HnswWrapper from '../util/hnswWrapper';

const IndexPage = () => {
  const [result, setResult] = useState(null);
  const [result1, setResult1] = useState(null);

  useEffect(() => {
    const metric = 'euclidean'; // Define your metric here, or fetch it from somewhere

    const hnsw = new HnswWrapper(1536, metric);

    for (let i = 0; i < 1000; i += 1) {
      const vector = new Float64Array(1536);
      for (let v = 0; v < 1536; v += 1) {
        vector[v] = Math.random();
      }
      hnsw.addItem(i, vector);
    }

    hnsw.build();
  }, []);

  useEffect(() => {
    async function fetchData1() {
      try {
        const response = await fetch('./api/mongget');
        const data = await response.json();
        setResult(data);

        const white = [];

        data.forEach((it) => {
          white.push(it.result.data.object.embedding);
        });

        setResult1(white[0]);

        const queryVector = new Float64Array(1536);
        for (let v = 0; v < 1536; v += 1) {
          queryVector[v] = Math.random();
        }

        const numNeighbors = 5;
        const includeDistances = true;

        const result = hnsw.getNnsByVector(queryVector, numNeighbors, includeDistances);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData1();
  }, [result1]);

  return (
    <div>
      {/* Your Next.js page content */}
    </div>
  );
};

export default IndexPage;