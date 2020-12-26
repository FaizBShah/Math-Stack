let tempScript = "";

const canvas = new Canvas;

document.getElementById("executeBtn").addEventListener("mousedown", (e) => {
  const s = "ivar Matrix m, Matrix n;\nm.setSize(2, 2);\nm.setValue(0, 0, 1);\nm.setValue(0, 1, 7);\nm.setValue(1, 0, 14);\nconsole.log(m.getMatrix());\nn.setSize(2, 2);\nn.setValue(0, 1, 5);\nn.setValue(0, 0, 2);\nn.setValue(1, 0, -3);\nn.setValue(1, 1, 9);\nconsole.log(n.getMatrix());\nconsole.log(m.addMatrix(n).getMatrix());\nconsole.log(m.subtractMatrix(n).getMatrix());\nconsole.log(m.multiplyMatrixBySingle(10).getMatrix());"
  const res = getRequiredBoxes(s);
  console.log(res);

  for (i = 0; i < res.len; i++) {
    res.numberVariables[i] += "=1;";
  }

  executeScript(res.numberVariables, res.tempScript);
})

function getRequiredBoxes(inputString) {
  inputString.replace(/\n/g, " ");
  const numberVariables = [];
  let otherVariables = "";
  let otherVariables1 = "";
  let firstLinePos = inputString.indexOf(";");
  let firstLine = inputString.substring(0, firstLinePos);
  let secondLinePos = inputString.substring(firstLinePos + 1).indexOf(";");
  let secondLine = inputString.substring(firstLinePos + 1).substring(0, secondLinePos);

  const firstLineLength = firstLine.length;
  firstLine = firstLine.trim();


  if (firstLine.indexOf("ivar") == 0) {
    let allVariables = firstLine.substring(5).split(",");

    for(i = 0; i < allVariables.length; i++) {
      variable = allVariables[i];

      variable = variable.trim();

      if (variable.indexOf("Matrix") === -1 && variable.indexOf("Graph") === -1) {
        numberVariables.push(variable);
      }
      else if (variable.indexOf("Matrix") !== -1) {
        otherVariables += "const " + variable.split(" ")[1] + " = new Matrix;\n";
      }
      else {
        otherVariables += "const " + variable.split(" ")[1] + " = new Graph;\n";
      }
    }

    secondLine = secondLine.trim();

    var secLineExists = false;

    if (secondLine.indexOf("var") == 0) {
      secLineExists = true;

      let secondVariables = secondLine.substring(4).split(",");

      for(i = 0; i < secondVariables.length; i++) {
        variable = secondVariables[i];

        variable = variable.trim();
  
        if (variable.indexOf("Matrix") === -1 && variable.indexOf("Graph") === -1) {
          otherVariables1 += "let " + variable + ";\n";
        }
        else if (variable.indexOf("Matrix") !== -1) {
          otherVariables1 += "const " + variable.split(" ")[1] + " = new Matrix;\n";
        }
        else {
          otherVariables1 += "const " + variable.split(" ")[1] + " = new Graph;\n";
        }
      }
    }

    if (!secLineExists) {
      secondLinePos = -1;
    }

    tempScript = otherVariables + otherVariables1 + inputString.substring(firstLineLength + secondLinePos + 2);
    const len = numberVariables.length;

    return {
      len,
      numberVariables,
      tempScript
    };
  }
  else {
    return null;
  }
}

function executeScript(inpVariables, script) {
  let temp = "";

  for (i = 0; i < inpVariables.length; i++) {
    str = inpVariables[i];
    str = "const " + inpVariables[i] + "\n";
    temp += str;
  }

  var validScript = "2 + 2";

  validScript = temp + script;
  console.log(validScript);

  eval(validScript);
}

function show(x) {
  if (x instanceof Matrix) {
    x.showMatrix(canvas);
  }
  else {
    canvas.showVariable(x);
  }
}