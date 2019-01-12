import styled from 'styled-components';
import ComponentNavLink from './ComponentNavLink';
import RecordNavLink from './RecordNavLink';


export const SideNav = styled.div`
  max-width: 300px;
  overflow: auto;
  border-right: 1pt solid white;
  border-radius: 10px;
  margin-right: 5px;
`;

export const MainNavUL = styled.ul`
    
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

export const ComponentNavLI = styled(ComponentNavLink)`
  display: ${ props => props.inline ? 'inline-block' : 'block' };
`;

export const RecordNavLI = styled(RecordNavLink)`
  display: inline-block;
`;