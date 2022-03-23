import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/LogoCerti.png";
import menuIcon from "../../assets/ic_menu.svg";
import docwhite from "../../assets/docwhite.svg";
import actividadwhite from "../../assets/actividadwhite.svg";
import docacti from "../../assets/docacti.svg";
import userwhite from "../../assets/userwhite.svg";
import './Sidemenu.css'

const menuItems = [
  {
    name: "Clientes", exact: true, to: '/clientes', iconClassNameWhite: docwhite,
  },
  {
    name: "Consumo", exact: true, to: '/consumo', iconClassNameWhite: actividadwhite,
  },
  {
    name: "Actividad", exact: true, to: '/actividadadm', iconClassNameWhite: docacti,
  },
  {
    name: "Facturación", exact: true, to: '/facturacion', iconClassNameWhite: userwhite,
  },
]

const SideMenuAdmin = (props) => {
  const [inactive, setInative] = useState(false);
  

  useEffect(() => {
    props.onCollapse(inactive);
  }, [inactive]);



  return (
    <div className={`side-menuAdmin ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img className="logo-css" src={logo} alt="certiblock" />
        </div>
        <div onClick={() => {
          setInative(!inactive);
        }}
          className="toggle-menu-btn">
          {inactive ? (
            <img className="menu-icon-css" src={menuIcon} alt="menuIcon" />
          ) : (
            <img className="menu-icon-css" src={menuIcon} alt="menuIcon" />
          )}
        </div>
      </div>

      <div className={`main-menu ${inactive ? "inactive" : ""}`}>
        <ul>
          {
            menuItems.map(item => (
              <li className="padding-li" onClick={props.onClick}>
                <NavLink
                  exact
                  to={item.to}
                  className={`menu-item`}
                >

                    <div className="menu-icon">
                      <img className="share-icon2" src={item.iconClassNameWhite} alt="share" />
                    </div>

                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="side-menu-footer">
        <div className="user-info">
          <h5>Certiblock Portal Admin Dashboard</h5>
          <p>2022 All Rights Reserved</p>
        </div>
      </div>

    </div>
  );
};

export default SideMenuAdmin
