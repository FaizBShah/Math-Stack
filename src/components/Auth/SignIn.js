import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../../store/Actions/authActions'
import { Redirect } from 'react-router-dom'

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
  render() {

    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' /> 

    return (
      <div className="container">

        <div className="row form-area card margin-top-80">
          <div className="col m6" id="bg-login"><img src="./assets/img/kit/login_bg.png" alt="login-bg" className="hide-on-small-only"/></div>

          <div className="col m6" id="bg-content">

            <form onSubmit={this.handleSubmit}>

              <div className="center">
                <img src="./assets/img/logos/dsc_header_light.png" alt="dsc_logo"/>
                <h4 className="tag_details flow-text grey-text text-lighten-3"><b>Math Stack Login</b></h4>
              </div>

              <div className="input-field">
                <label htmlFor="email"><i className="fa fa-user"></i>   Email</label>
                <input type="email" id='email' onChange={this.handleChange} required />
              </div>

              <div className="input-field">
                <label htmlFor="password"><i className="fa fa-lock"></i>   Password</label>
                <input type="password" id='password' onChange={this.handleChange} required />
              </div>

              <div className="row">
                <div className="col" id="forgot-btn">
                  <NavLink to="#" className="blue-text text-accent-3">Forgot Password?</NavLink>
                </div>
                <div className="col right">
                  <div className="input-field">
                    <button className="btn blue accent-3 z-depth-0 right-align" id="login-btn">Login</button>
                  </div>
                </div>
              </div>

              
            </form>
            <div className="center red-text">
              { authError ? <p>{authError}</p> : null }
            </div>

          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)