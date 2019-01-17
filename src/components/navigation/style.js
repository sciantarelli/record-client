import styled from 'styled-components';
import ComponentNavLink from './ComponentNavLink';
import RecordNavLink from './RecordNavLink';
import NavBottomButton from './NavBottomButton';


export const SideNav = styled.div`
  max-width: 300px;
  overflow: auto;
  border-right: 1pt solid white;
  border-radius: 10px;
  margin-right: 5px;
`;

export const MainNavUL = styled.ul`
  
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


// TODO: layout-changes - handle padding elsewhere, like a reset for UL's
export const NavBottomUL = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 0px;
`;

// TODO: layout-changes - hardcoded colors
export const NavBottomLI = styled(NavBottomButton)`
  color: ${ props => props.isDirty ? 'yellow' : 'red' };
  border-bottom: ${ props => props.isActive ? '2pt solid #a73646' : 'none' };
  background: ${ props => props.isActive ? 'blue' : 'inherit' };
  text-align: center;
  display: inline-block;
  list-style: none;
  padding: 2px;
`;