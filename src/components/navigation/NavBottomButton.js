import React from 'react';
import { IconSpan } from '../shared/style';


const NavBottomButton = props => {
  const { icon:Icon, menu, handler, className,  ...remainingProps } = props;

  return(
    <li onClick={() => handler(menu)}
        className={className}>
      <IconSpan as={Icon}
                size="25px"
                {...remainingProps} />
    </li>
  )
};

export default NavBottomButton;