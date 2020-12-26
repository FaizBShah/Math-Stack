import { useState } from 'react';
import './App.css';
import {getRequiredBoxes} from './scripts/compilerScript';

function App() {
  const [script,setScript] = useState("ivar Matrix m, Matrix n;\nm.setSize(2, 2);\nm.setValue(0, 0, 1);\nm.setValue(0, 1, 7);\nm.setValue(1, 0, 14);\nconsole.log(m.getMatrix());\nn.setSize(2, 2);\nn.setValue(0, 1, 5);\nn.setValue(0, 0, 2);\nn.setValue(1, 0, -3);\nn.setValue(1, 1, 9);\nconsole.log(n.getMatrix());\nconsole.log(m.addMatrix(n).getMatrix());\nconsole.log(m.subtractMatrix(n).getMatrix());\nconsole.log(m.multiplyMatrixBySingle(10).getMatrix());")
  const onClick= (e) => {
      const boxes = getRequiredBoxes(script);
      console.log(boxes);
  }
  return (
    <div className="App" style={{display: "flex", flexDirection: "column", margin: "5px"}}>
      <textarea rows="12" 
        style={{width: "80%"}}
        value={script}
        onChange={e=> setScript(e.target.value)}
        />
      <button onClick={onClick} style={{padding: "5px", margin: "5px", width: "150px"}}>Run</button>
    </div>
  );
}

export default App;
