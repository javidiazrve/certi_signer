import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";


const MenuItem = (props) => {

  const { name, iconClassName, to, exact } = props;
  const [expand, setExpand] = useState(false);

  /*const isActive = {
    backgroundColor: "#F2F2F2",
    borderRadius: "0px 0px 0px 38px"
};*/

return (
  <li className="padding-li" onClick={props.onClick}>
    <NavLink
      exact
      to={to}
      className={`menu-item`}
      activeClassName="active"
    >
      <div className="menu-icon">
        <i className={iconClassName}></i>
      </div>
      <span>{name}</span>
    </NavLink>
  </li>
);
}

export default MenuItem