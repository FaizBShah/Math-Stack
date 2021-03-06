import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../store/Actions/authActions'

const NavLinks = (props) => {

  return (
    <div>
      <a href="#" data-target="slide-out" className="sidenav-trigger right" id="nav-menu"><i className="material-icons grey-text text-lighten-3">menu</i></a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="#" className="nav-link"><i className="material-icons">account_circle</i> {props.auth.email}</a></li>
        <li><a href="#" className="nav-link" onClick={props.signOut}>LOG OUT <i className="material-icons">exit_to_app</i></a></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(NavLinks)