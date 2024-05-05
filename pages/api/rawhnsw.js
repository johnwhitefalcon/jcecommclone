

// pages/api/nearestNeighbors.js

// Function to calculate Euclidean distance between a query vector (vec1) and a dataset vector (vec2)
function euclideanDistance(queryVec, datasetVec) {
    let sum = 0;
    for (let i = 0; i < queryVec.length; i++) {
        sum += Math.pow(queryVec[i] - datasetVec[i], 2);
    }
    return Math.sqrt(sum);
}

// Function to build the HNSW index
function buildHNSWIndex(datasetVector, M, efConstruction) {
    const index = [];
    const maxLayer = Math.floor(Math.log2(datasetVector.length)) - 1;

    // Initialize the zero level
    const zeroLevel = [];
    for (let i = 0; i < datasetVector.length; i++) {
        zeroLevel.push({ vector: datasetVector[i], friends: new Array(maxLayer + 1).fill(null) });
    }
    index.push(zeroLevel);

    // Build the index
    for (let layer = 1; layer <= maxLayer; layer++) {
        const level = [];
        for (let i = 0; i < datasetVector.length; i++) {
            const node = { vector: datasetVector[i], friends: new Array(maxLayer + 1).fill(null) };
            for (let j = layer - 1; j >= 0; j--) {
                let entry = Math.floor(Math.random() * index[j].length);
                while (node.friends[j] === null || euclideanDistance(node.vector, index[j][entry].vector) >= efConstruction) {
                    entry = Math.floor(Math.random() * index[j].length);
                }
                node.friends[j] = index[j][entry];
            }
            level.push(node);
        }
        index.push(level);
    }

    return index;
}

// Function to find k nearest neighbors
function findNearestNeighbors(queryVec, index, k, efSearch) {
    const maxLayer = index.length - 1;
    let result = [];
    let visited = new Set();

    // Start from the highest layer
    let node = index[maxLayer][0];

    while (result.length < k && node !== null) {
        let layer = maxLayer;
        while (layer >= 0 && node.friends[layer] !== null) {
            if (!visited.has(node.friends[layer])) {
                visited.add(node.friends[layer]);
                if (result.length < k) {
                    result.push(node.friends[layer].vector);
                } else {
                    const maxDistance = result.reduce((max, neighbor) => Math.max(max, euclideanDistance(queryVec, neighbor)), -Infinity);
                    if (euclideanDistance(queryVec, node.friends[layer].vector) < maxDistance) {
                        result = result.filter(neighbor => euclideanDistance(queryVec, neighbor) < maxDistance);
                        result.push(node.friends[layer].vector);
                    }
                }
            }
            if (layer === 0) break;
            layer--;
            if (euclideanDistance(queryVec, node.friends[layer].vector) <= efSearch) {
                node = node.friends[layer];
            }
        }
        node = node.friends[0];
    }

    return result.slice(0, k);
}

// Next.js API route
export default function handler(req, res) {
    const { datasetVector, queryVec, k, efConstruction, efSearch, M } = req.body;

    // Build the HNSW index
    const index = buildHNSWIndex(datasetVector, M, efConstruction);

    // Find k nearest neighbors
    const neighbors = findNearestNeighbors(queryVec, index, k, efSearch);

    res.status(200).json({ neighbors });
}
