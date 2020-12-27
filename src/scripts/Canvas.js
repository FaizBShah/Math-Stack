//renamed as Canvas is conflicting with global Canvas class
class CustomCanvas {


  // eslint-disable-next-line no-useless-constructor
  constructor() {

  }

  showMatrix(matrix, rows, cols) {
    var table = `<table>`
    for (var i = 0; i < rows; i++) {
      table += `<tr>`;
      for (var j = 0; j < cols; j++) {
        table += `<td>${matrix[i][j]}</td>`
      }
      table += `</tr>`;
    }
    table += `</table>`;

    document.body.innerHTML = document.body.innerHTML + table;
  }

  showVariable(x) {
    document.body.innerHTML = document.body.innerHTML + x;
  }
}

export default CustomCanvas;
