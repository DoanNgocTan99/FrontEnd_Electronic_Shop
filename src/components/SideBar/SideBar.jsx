import React from 'react';
import './SideBar.scss';
import sidebar_items from 'assets/data/sidebar-data.json';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';

function SideBar() {
  const location = useLocation();
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === location.pathname
  );

  return (
    <div className="sidebar">
      {sidebar_items.map((item, index) => (
        <NavLink to={item.route} key={index}>
          <SidebarItem
            title={item.name}
            icon={item.icon}
            active={index === activeItem}
          />
        </NavLink>
      ))}
    </div>
  );
}

export default SideBar;
