import React from 'react';
import { Header } from './shared/style';
import NavTop from './navigation/NavTop';
import Routes from './Routes';

import styled from 'styled-components';

const LayoutCompact = () => {

  return (
    <div>compact</div>
  )

};


// TODO: Consider the idea that the top nav could be contained in a verticle flexbox container as well. So there would be 2 containers, one for the whole document (header + body) and one for the body (left/right panes)

// TODO: Refactor the Flex styles into their own components. Look to FlexComponents.js old


const FlexRowContainer = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
`;

const SideNav = styled.div`
  max-width: 300px;
  overflow: auto;
  border-right: 1pt solid white;
  border-radius: 10px;
  margin-right: 5px;
`;

const FlexFillColumnContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  flex: 1 1 auto;
`;

const LayoutFull = () => {

  return (
    <React.Fragment>

    <Header>
      <NavTop />
    </Header>

    <FlexRowContainer>
      <SideNav>
        <ul>
          <li>Item 1</li>
          <li><ul>
            { [...Array(5)].map((e, i) =>
                <li>{ `Nested Item Number ${i}` }</li>) }
          </ul></li>
          <li>Much Longer Item 2 that just goes and goes forever it seems</li>

          { [...Array(50)].map((e, i) =>
              <li>{ `Item Number ${i}` }</li>) }
        </ul>
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