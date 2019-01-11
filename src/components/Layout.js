import React from 'react';
import { Header } from './shared/style';
import NavTop from './navigation/NavTop';

const LayoutCompact = () => {

  return (
    <div>compact</div>
  )

};


// Header
// Body container
  // Left panel
  // Main panel

const LayoutFull = () => {

  return (
    <Header>
      <NavTop />
    </Header>
  )

};


export {
  LayoutCompact,
  LayoutFull
}