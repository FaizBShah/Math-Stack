import ShowEvent from "./ShowEvent";

//renamed as Canvas is conflicting with global Canvas class
class CustomCanvas {


  // eslint-disable-next-line no-useless-constructor
  constructor() {

  }

  showMatrix(label, matrix, rows, cols) {
    var table = `<table>`
    for (var i = 0; i < rows; i++) {
      table += `<tr>`;
      for (var j = 0; j < cols; j++) {
        table += `<td>${matrix[i][j]}</td>`
      }
      table += `</tr>`;
    }
    table += `</table>`;

    const html = `${label}<br/>` + table;
    const showEvent = new ShowEvent(html);
    window.dispatchEvent(showEvent);
  }

  showVariable(label, x) {
    var html = `${label} = ${x}`
    const showEvent = new ShowEvent(html);
    window.dispatchEvent(showEvent);
  }
}

export default CustomCanvas;
