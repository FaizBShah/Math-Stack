class Graph {

  // Constructor for the class
  constructor() {
    this.graph = [];
    this.v = 0;
    this.e = 0;
  }

  // Sets the no. of nodes in the graph
  setNodes(v) {
    if (v < 1) {
      return null;
    }

    this.graph = new Array(v).fill(0).map(() => new Array(v).fill(0));
    this.v = v;
  }

  // Adds unweighted edge between 2 vertices
  addEdge(v1, v2) {
    if (v1 > 0 && v1 <= this.v && v2 > 0 && v2 <= this.v) {
      this.graph[v1 - 1][v2 - 1] = 1;
      this.e++;
    }
  }

  // Adds weighted edge between 2 vertices
  addWeightedEdge(v1, v2, weight) {
    if (v1 > 0 && v1 <= this.v && v2 > 0 && v2 <= this.v) {
      this.graph[v1 - 1][v2 - 1] = weight;
      this.e++;
    }
  }

  // Removes edge from between 2 vertices
  removeEdge(v1, v2) {
    if (v1 > 0 && v1 <= this.v && v2 > 0 && v2 <= this.v && this.graph[v1 - 1][v2 - 1] !== 0) {
      this.graph[v1 - 1][v2 - 1] = 0;
      this.e--;
    }
  }

  getVertices() {
    return this.v;
  }

  getEdges() {
    return this.e;
  }

  getGraph() {
    return this.graph;
  }
}

window.Graph = Graph;
export default Graph;