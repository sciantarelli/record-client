import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ComponentNavLink from './ComponentNavLink';
import RecordNavLink from './RecordNavLink';

// TODO: layout-changes Hardcoded color
export const Header = styled.div`
  background: #292929;
`;

// TODO: layout-changes Hardcoded color
export const A = styled(Link)`
  color: ${ props => props.isDirty ? 'yellow' : 'red' };
  border-bottom: ${ props => props.isActive ? '2pt solid #a73646' : 'none' };
`;

export const ComponentNavLI = styled(ComponentNavLink)`
  display: ${ props => props.inline ? 'inline-block' : 'block' };
`;

export const RecordNavLI = styled(RecordNavLink)`
  display: inline-block;
`;

// TODO: layout-changes Hardcoded color
// TODO: layout-changes <a> font size should be bootstrap $font-size-sm
// TODO: layout-changes bullets between <li> tags should be bootstrap $gray-600;
export const RecordNavUL = styled.ul`
  
  > ${ComponentNavLI}
    :after {
      content: " \\25ba";
      color: grey;
      padding-right: 5px;
    }
  }
  
  > ${RecordNavLI} {
    :not(:last-child) {
      padding-right: 5px;
      
      :after {
        content: " \\2022";
      }
    }
  }
`;

export const MainNavUL = styled.ul`
    
`;