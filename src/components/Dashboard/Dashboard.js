import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { getRequiredBoxes, executeScript } from '../../scripts/compilerScript';

const Loader = () => <div><div className="progress blue accent-3"><div className="indeterminate blue"></div></div></div>;

class Dashboard extends Component {
  state = {
    script: "ivar Matrix m, Matrix n;\nm.setSize(2, 2);\nm.setValue(0, 0, 1);\nm.setValue(0, 1, 7);\nm.setValue(1, 0, 14);\nconsole.log(m.getMatrix());\nn.setSize(2, 2);\nn.setValue(0, 1, 5);\nn.setValue(0, 0, 2);\nn.setValue(1, 0, -3);\nn.setValue(1, 1, 9);\nconsole.log(n.getMatrix());\nconsole.log(m.addMatrix(n).getMatrix());\nconsole.log(m.subtractMatrix(n).getMatrix());\nconsole.log(m.multiplyMatrixBySingle(10).getMatrix());",

  }

  setScript = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onClick = (e) => {
    e.preventDefault();
    const boxes = getRequiredBoxes(this.state.script);
    console.log(boxes);
    executeScript([], boxes.tempScript);
  }

  render() {

    const loading = this.props.loading;
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to='/signin' />

    if (loading) return <Loader />

    return (
      <div className="container">
        <div className="App" style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
          <textarea rows="12" id="script"
            style={{ width: "80%" }}
            //value={this.state.script}
            onChange={this.setScript}
          />
          <button onClick={this.onClick} className="run-btn"><i class="fa fa-play-circle"></i>Run</button>
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