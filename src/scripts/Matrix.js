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
    if (rowId < this.matrix.length && rowId > -1 && colId < this.matrix[0].length && colId > -1) {
      this.matrix[rowId][colId] = value;
    }
  }

  // Returns the value from the particular cell
  getValue(rowId, colId) {
    if (rowId < this.matrix.length && rowId > -1 && colId < this.matrix[0].length && colId > -1) {
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

  // Multiply this matrix with another matrix
  multiplyMatrix(m) {
    const row1 = this.getRows();
    const col1 = this.getColumns();

    const row2 = m.getRows();
    const col2 = m.getColumns();

    if (col1 !== row2) {
      return null;
    }

    const res = new Matrix();

    res.setSize(row1, col2);

    let i, j;

    for (i = 0;i < row1;i++) {
      for(j=0;j<col2;j++) {
        let sum = 0;
        let k;
        for (k=0;k<row1;k++) {
          sum += this.getValue(i, k) * m.getValue(k, j);
        }
        res.setValue(i, j, sum);
      }
    }

    return res;
  }
}

window.Matrix = Matrix;
export default Matrix;