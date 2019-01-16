import React from 'react';
import { MenuWrapper, NavTop, NavLeft } from './navigation';
import { SideNav } from './navigation/style';
import { Header, FlexRowContainer, FlexFillColumnContainer } from './shared/style';
import Routes from './Routes';


const LayoutCompact = () => {

  return (
    <MenuWrapper>
      <Routes />
    </MenuWrapper>
  )

};


// TODO: layout-changes Consider the idea that the top nav could be contained in a vertical flexbox container as well. So there would be 2 containers, one for the whole document (header + body) and one for the body (left/right panes)

const LayoutFull = () => {

  return (
    <React.Fragment>

    <Header>
      <NavTop />
    </Header>

    <FlexRowContainer>
      <SideNav>
        <NavLeft />
      </SideNav>

      <FlexFillColumnContainer>
        <Routes />
      </FlexFillColumnContainer>
    </FlexRowContainer>

    </React.Fragment>
  )

};


export {
  LayoutCompact,
  LayoutFull
}