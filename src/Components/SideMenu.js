import React, { useEffect, useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo/LogoCerti.png";
import menuIcon from "../assets/ic_menu.svg";
import doc from "../assets/doc.svg";
import actividad from "../assets/actividad.svg";
import actividadwhite from "../assets/actividadwhite.svg";
import docwhite from "../assets/docwhite.svg";
import userwhite from "../assets/userwhite.svg";


import user from "../assets/user.svg";

import { useLocation } from 'react-router-dom';



import MenuItem from "./MenuItem";


const menuItems = [
  {
    name: "Documentación", exact: true, to: '/documentacion', iconClassName: doc, iconClassNameWhite: docwhite,
  },
  {
    name: "Actividad", exact: true, to: '/actividad', iconClassName: actividad, iconClassNameWhite: actividadwhite,
  },
  /*{
    name: "Facturación", exact: true, to: '/', iconClassName: 'bi bi-speedometer2'
  },*/
  {
    name: "Usuarios", exact: true, to: '/usuario', iconClassName: user, iconClassNameWhite: userwhite,
  }
]

const SideMenu = (props) => {
  const [inactive, setInative] = useState(false);
  

  useEffect(() => {
    props.onCollapse(inactive);
  }, [inactive]);



  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
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
          {/*
            menuItems.map((menuItem, index) => (
              <MenuItem
                key={index}
                name={menuItem.name}
                exact={menuItem.exact}
                to={menuItem.to}
                iconClassName={menuItem.iconClassName}
                onClick={() => {
                  if (inactive) {
                    setInative(false);
                  }
                }}
              />
            ))
              */}
          {/*<li>
            <a className="menu-item">
              <div className="menu-icon">
                <i className="bi bi-speedometer2"></i>
              </div>
              <span>Dashboard</span>
            </a>
          </li>*/}
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

export default SideMenu
