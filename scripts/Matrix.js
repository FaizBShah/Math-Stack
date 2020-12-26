class Matrix {

  constructor() {
    this.matrix = [];
  }

  setSize(rows, cols) {
    if (rows < 1 || cols < 1) {
      return null;
    }

    this.matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  }

  setValue(rowId, colId, value) {
    if (rowId < this.matrix.length && colId < this.matrix[0].length) {
      this.matrix[rowId][colId] = value;
    }
  }

  getValue(rowId, colId) {
    if (rowId < this.matrix.length && colId < this.matrix[0].length) {
      return this.matrix[rowId][colId];
    }
  }

  getMatrix() {
    return this.matrix;
  }

  getRows() {
    return this.matrix.length;
  }

  getColumns() {
    return this.matrix[0].length;
  }

  showMatrix(canvasObj) {
    canvasObj.showMatrix(this.getMatrix(), this.getRows(), this.getColumns());
  }

  addMatrix(m) {
    if (m.getRows() !== this.getRows() || m.getColumns() !== this.getColumns()) {
      return null;
    }

    const res = new Matrix;

    res.setSize(m.getRows(), m.getColumns());

    let i, j;

    for (i=0;i<m.getRows();i++) {
      for (j=0;j<m.getColumns();j++) {
        res.setValue(i, j, this.getValue(i, j) + m.getValue(i, j));
      }
    }

    return res;
  }

  subtractMatrix(m) {
    if (m.getRows() !== this.getRows() || m.getColumns() !== this.getColumns()) {
      return null;
    }

    const res = new Matrix;

    res.setSize(m.getRows(), m.getColumns());

    let i, j;

    for (i=0;i<m.getRows();i++) {
      for (j=0;j<m.getColumns();j++) {
        res.setValue(i, j, this.getValue(i, j) - m.getValue(i, j));
      }
    }

    return res;
  }

  multiplyMatrixBySingle(m) {
    const res = new Matrix;

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