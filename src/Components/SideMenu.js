import React, { useEffect, useState } from 'react';
import logo from "../assets/logo/LogoCerti.png";
import user from "../assets/user.jpg";

import MenuItem from "./MenuItem";

const menuItems = [
  {
    name: "Documentación", to: '/document', iconClassName: 'bi bi-speedometer2'
  },
  {
    name: "Actividad", to: '/document', iconClassName: 'bi bi-speedometer2'
  },
  {
    name: "Facturación", to: '/document', iconClassName: 'bi bi-speedometer2'
  },
  {
    name: "Usuarios", to: '/document', iconClassName: 'bi bi-speedometer2'
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
            <i className="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i className="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      <div className={`main-menu ${inactive ? "inactive" : ""}`}>
        <ul>
          {
            menuItems.map((menuItem, index) => (
              <MenuItem
                key={index}
                name={menuItem.name}
                to={menuItem.to}
                iconClassName={menuItem.iconClassName}
                onClick={() => {
                  if (inactive) {
                    setInative(false);
                  }
                }}
              />
            ))
          }
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
