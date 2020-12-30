import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { getRequiredBoxes, executeScript } from '../../scripts/compilerScript';
import { SHOW_EVENT } from '../../scripts/ShowEvent';

const Loader = () => <div><div className="progress blue accent-3"><div className="indeterminate blue"></div></div></div>;

class Dashboard extends Component {
  state = {
    script: "ivar Matrix m, Matrix n;\nm.setSize(2, 2);\nm.setValue(0, 0, 1);\nm.setValue(0, 1, 7);\nm.setValue(1, 0, 14);\nconsole.log(m.getMatrix());\nn.setSize(2, 2);\nn.setValue(0, 1, 5);\nn.setValue(0, 0, 2);\nn.setValue(1, 0, -3);\nn.setValue(1, 1, 9);\nconsole.log(n.getMatrix());\nconsole.log(m.addMatrix(n).getMatrix());\nconsole.log(m.subtractMatrix(n).getMatrix());\nconsole.log(m.multiplyMatrixBySingle(10).getMatrix());",
    takingInput: false,
    inputs: null,
    tempScript: "",
    output: ""

  }

  setScript = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  executeScript = (inputs,tempScript) => {
    this.setState({output: ""});
    executeScript(inputs,tempScript);
  }
  onClick = (e) => {
    e.preventDefault();
    const boxes = getRequiredBoxes(this.state.script);
    if(boxes.len){
      const inputs =boxes.numberVariables.map(v => ({label: v, value: 0}));
      this.setState({inputs,tempScript: boxes.tempScript});
      this.setState({takingInput: true});
      this.setState({output: "Change Values to run script"});
    }
    else {
      this.executeScript([], boxes.tempScript);
    }
  }
  getInputs = (inputs) => {
    return inputs.map(inp => (`${inp.label}=${inp.value};`))
  }
  onValueChange = (i) => (e) => {
    const newInputs = JSON.parse(JSON.stringify(this.state.inputs));
    newInputs[i].value = parseFloat(e.target.value);
    this.setState({inputs: newInputs});
    //since setState is asynchronous thats why using newInputs
    console.log("Inputs",this.getInputs(newInputs))
    this.executeScript(this.getInputs(newInputs), this.state.tempScript);
  }

  reset = ()=> {
    this.setState({
      inputs: null,
      takingInput: false,
      tempScript: "",
      output: ""
    })
  }

  show = (e) =>{
    console.log(e.detail);
    setTimeout(()=>{
      this.setState({output: this.state.output+"\n"+e.detail})
    },0)
  }
  componentDidMount(){
    window.addEventListener(SHOW_EVENT, this.show);
  }
  componentWillUnmount(){
    window.removeEventListener(SHOW_EVENT,this.show)
  }
  render() {

    const loading = this.props.loading;
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to='/signin' />

    if (loading) return <Loader />

    return (
      <div className="container">
        <div className="App" style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
          {
            this.state.takingInput ?
            <div style={{display: "flex", flexDirection:"column", padding: "5px"}}>
              {this.state.inputs.map((inp,i )=> (
                <div key={i} style={{display: "flex", alignItems: "center"}}>
                  <span style={{fontSize: "18px", padding: "5px", marginRight: "2rem"}}>{inp.label}:</span>
                  <input style={{fontSize: "18px", width: "100px"}} type="number" onChange={this.onValueChange(i)} value={inp.value}/>
                </div>
              ) )}
            </div>
            :
            <textarea rows="12" id="script"
              style={{ width: "80%" }}
              value={this.state.script}
              onChange={this.setScript}
            />
          }
          {this.state.takingInput ?
            <button onClick={this.reset} className="run-btn"><i className="fa fa-backward"></i>Back</button>
            :
            <button onClick={this.onClick} className="run-btn"><i className="fa fa-play-circle"></i>Run</button>
          }
          <div style={{textAlign: "left", marginTop: "2rem"}}>
            <strong>OUTPUT:</strong>
          </div>
          <div style={{border: "2px solid black", borderRadius: "5px", boxShadow: "inset 0 0 20px 0 #bdbdbd", minHeight: "200px", width: "80%", marginTop: "0.5rem", padding: "10px", textAlign: "left",  whiteSpace: "pre-wrap", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px", fontWeight: "bold"}} dangerouslySetInnerHTML={{__html: this.state.output }}>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    auth: state.firebase.auth,
    loading: state.loading.loading
  }
}

export default compose(connect(mapStateToProps))(Dashboard)