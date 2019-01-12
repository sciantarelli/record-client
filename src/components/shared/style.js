import styled from 'styled-components';
import { Link } from 'react-router-dom';

// TODO: layout-changes Hardcoded color
export const Header = styled.div`
  background: #292929;
`;

// TODO: layout-changes Hardcoded color
export const A = styled(Link)`
  color: ${ props => props.isDirty ? 'yellow' : 'red' };
  border-bottom: ${ props => props.isActive ? '2pt solid #a73646' : 'none' };
`;

// TODO: Refactor the Flex styles into their own components. Look to FlexComponents.js old

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