import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// TODO: layout-changes Hardcoded color
export const Header = styled.div`
  background: #292929;
`;

// TODO: layout-changes Hardcoded color
export const Footer = styled.div`
  background: #292929;
`;

// TODO: layout-changes Hardcoded color
export const A = styled(
    ({ isActive, isDirty, ...rest}) => <Link {...rest} />
  )`
    text-decoration: none;
    border-bottom: ${ props => props.isActive ? '2pt solid #a73646' : 'none' };
    color: ${ props => props.isDirty ? 'yellow' : 'red' };
`;

// TODO: layout-changes Refactor the Flex styles into their own components. Look to FlexComponents.js old

export const FlexRowContainer = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
`;

export const FlexFillColumnContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  flex: 1 1 auto;
`;

// TODO: layout-changes - this styled component may not be necessary, as of now the styles are being applied to the wrapping <li>
export const IconSpan = styled.span`
  
`;