class Matrix {

  // Constructor for the class
  constructor() {
    this.matrix = [];
  }

  // Sets the size of the matrix
  setSize(rows, cols) {
    if (rows < 1 || cols < 1) {
      return null;
    }

    this.matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  }

  // Sets the value at the particular cell
  setValue(rowId, colId, value) {
    if (rowId < this.matrix.length && colId < this.matrix[0].length) {
      this.matrix[rowId][colId] = value;
    }
  }

  // Returns the value from the particular cell
  getValue(rowId, colId) {
    if (rowId < this.matrix.length && colId < this.matrix[0].length) {
      return this.matrix[rowId][colId];
    }
  }

  // Returns the matrix associated with the Matrix object
  getMatrix() {
    return this.matrix;
  }

  // Returns the no. of rows
  getRows() {
    return this.matrix.length;
  }

  // Returns the no. of columns
  getColumns() {
    return this.matrix[0].length;
  }

  // Shows the matrix to the UI with given Canvas object
  showMatrix(canvasObj) {
    canvasObj.showMatrix(this.getMatrix(), this.getRows(), this.getColumns());
  }

  // Add a matrix m to the current matrix
  addMatrix(m) {
    if (m.getRows() !== this.getRows() || m.getColumns() !== this.getColumns()) {
      return null;
    }

    const res = new Matrix();

    res.setSize(m.getRows(), m.getColumns());

    let i, j;

    for (i=0;i<m.getRows();i++) {
      for (j=0;j<m.getColumns();j++) {
        res.setValue(i, j, this.getValue(i, j) + m.getValue(i, j));
      }
    }

    return res;
  }

  // Subtracts a matrix m to the current matrix
  subtractMatrix(m) {
    if (m.getRows() !== this.getRows() || m.getColumns() !== this.getColumns()) {
      return null;
    }

    const res = new Matrix();

    res.setSize(m.getRows(), m.getColumns());

    let i, j;

    for (i=0;i<m.getRows();i++) {
      for (j=0;j<m.getColumns();j++) {
        res.setValue(i, j, this.getValue(i, j) - m.getValue(i, j));
      }
    }

    return res;
  }

  // Multiplies a single real value to the entire matrix
  multiplyMatrixBySingle(m) {
    const res = new Matrix();

    res.setSize(this.getRows(), this.getColumns());

    let i, j;

    for (i=0;i<this.getRows();i++) {
      for (j=0;j<this.getColumns();j++) {
        res.setValue(i, j, this.getValue(i, j) * m);
      }
    }

    return res;
  }
}

window.Matrix = Matrix;
export default Matrix;