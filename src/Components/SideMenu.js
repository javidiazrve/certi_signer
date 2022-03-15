import React, { useEffect, useState } from 'react';
import logo from "../assets/logo/LogoCerti.png";

import MenuItem from "./MenuItem";

const menuItems = [
  {
    name: "Documentación", exact: true, to: '/documentacion', iconClassName: 'bi bi-speedometer2'
  },
  {
    name: "Actividad", exact: true, to: '/', iconClassName: 'bi bi-speedometer2'
  },
  {
    name: "Facturación", exact: true, to: '/', iconClassName: 'bi bi-speedometer2'
  },
  {
    name: "Usuarios", exact: true, to: '/', iconClassName: 'bi bi-speedometer2'
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
            <i className="bi bi-filter-left"></i>
          ) : (
            <i className="bi bi-filter-left"></i>
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
