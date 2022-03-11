import React, { useState } from 'react';

const MenuItem = (props) => {

  const { name, iconClassName, onClick } = props;
  const [expand, setExpand] = useState(false);
 
  return (
    <li className="padding-li" onClick={props.onClick}>
      <a className="menu-item">
        <div className="menu-icon">
          <i className={iconClassName}></i>
        </div>
        <span>{name}</span>
      </a>
    </li>
  );
}

export default MenuItem