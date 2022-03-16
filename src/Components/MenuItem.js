import React, { useEffect, useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import doc from "../assets/doc.svg";


const MenuItem = (props) => {

  const { name, iconClassName, to, exact } = props;
  const [expand, setExpand, imgDummy] = useState(false);

useEffect(() => {
  // Actualiza el título del documento usando la API del navegador
  setImg()
});

const setImg = () => {
  console.log("testMount")
  if(iconClassName === 'doc') {
    let imgDummy = doc
    console.log("testMount", imgDummy )
  }
}



return (
  <li className="padding-li" onClick={props.onClick}>
    <NavLink
      exact
      to={to}
      className={`menu-item`}
      activeclassname="active"
    >
      <div className="menu-icon">
        <img className="share-icon" src={imgDummy} alt="share" />
      </div>
      <span>{name}</span>
    </NavLink>
  </li>
);
}

export default MenuItem