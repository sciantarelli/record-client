import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/notes">Notes</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;
