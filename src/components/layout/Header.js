import React, { Component } from 'react';
import Navigation from '../navigation/Navigation';

class Header extends Component {

  render() {
    return (
      <div id="header">
        <Navigation/>
      </div>
    );
  }
}


export default Header;