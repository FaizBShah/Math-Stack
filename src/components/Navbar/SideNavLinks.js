import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/Actions/authActions'

const SideNavLinks = (props) => {

  return (
      <ul id="slide-out" className="sidenav blue-grey darken-4">
        <li><NavLink to='/' className="subheader grey-text text-lighten-3"><b>user : </b> {props.auth.email}</NavLink></li>
        <li><div className="divider grey"></div></li>
        <li><NavLink to='/' className="nav-link grey-text text-lighten-3" onClick={props.signOut}><b>Log Out</b></NavLink></li>
      </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SideNavLinks)