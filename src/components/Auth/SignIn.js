import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn, signInGoogle } from '../../store/Actions/authActions'
import { Redirect } from 'react-router-dom'
import { findAllByPlaceholderText } from '@testing-library/react'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }

  handleGoogleSubmit = (e) => {
    e.preventDefault();
    this.props.signInGoogle();
  }
  render() {

    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' />

    return (
      <div className="container">

        <div className="row card login">
          <div className="col m6" id="bg-login"><img src="./assets/img/login-bg.png" alt="login-bg" className="hide-on-small-only" /></div>

          <div className="col m6" id="bg-content">

            <form onSubmit={this.handleSubmit}>

              <div className="center">
                <h5 className="flow-text">Login</h5>
              </div>

              <div className="input-field">
                <label htmlFor="email"><i className="fa fa-user"></i>   Email</label>
                <input type="email" id='email' onChange={this.handleChange} required />
              </div>

              <div className="input-field">
                <label htmlFor="password"><i className="fa fa-lock"></i>   Password</label>
                <input type="password" id='password' onChange={this.handleChange} required />
              </div>
              <button className="btn-thm" id="login-btn">Login</button>
              
            </form>

            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
            <ul>
              <li><a href="#" className="btn-thm" id="google-btn" onClick={this.handleGoogleSubmit}>Login with Google</a></li>
            </ul>
            <Link to="/signup" className="signup">Don't have a account? <b>Sign Up</b></Link> 
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    signInGoogle: () => dispatch(signInGoogle())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)