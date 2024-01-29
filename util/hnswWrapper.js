
import Hnsw from 'hnsw';

class HnswWrapper {
  constructor(dimensions, metric) {
    this.hnsw = new Hnsw(dimensions, metric);
  }

  addItem(index, vector) {
    this.hnsw.addItem(index, vector);
  }

  build() {
    this.hnsw.build();
  }

  getNnsByVector(vector, n, includeDistances) {
    return this.hnsw.getNeighbors(vector, n, includeDistances);
  }
}

export default HnswWrapper;