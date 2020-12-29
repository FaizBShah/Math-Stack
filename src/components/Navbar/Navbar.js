import React from 'react'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import SideNavLinks from './SideNavLinks'
import { connect } from 'react-redux'


const Navbar = (props) => {

  const { auth } = props;
  const links = auth.uid ? <NavLinks auth={auth} /> : null;
  const mlinks = auth.uid ? <SideNavLinks auth={auth} /> : null;
  return (
    <div>
      <nav className="nav-wrapper amber accent-3">
        <div className="container">
          
          <Link to='/' className="brand-logo">Math Stack</Link>
          {links}
        </div>
      </nav>
      {mlinks}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navbar)