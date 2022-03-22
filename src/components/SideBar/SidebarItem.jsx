import React from 'react';
import './SideBar.scss';
import PropTypes from 'prop-types';

SidebarItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  active: PropTypes.bool,
};

function SidebarItem({ title, icon, active }) {
  const hasActive = active ? 'active' : '';

  return (
    <div className="sidebar-item">
      <div className={`sidebar-item__inner ${hasActive}`}>
        <i className={icon}></i>
        <span>{title}</span>
      </div>
    </div>
  );
}

export default SidebarItem;
