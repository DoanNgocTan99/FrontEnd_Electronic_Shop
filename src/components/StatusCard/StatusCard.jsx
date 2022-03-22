import React from 'react';
import PropTypes from 'prop-types';
import './StatusCard.scss';

StatusCard.propTypes = {
  icon: PropTypes.string,
  count: PropTypes.string,
  title: PropTypes.string,
};

function StatusCard({ icon, count, title }) {
  return (
    <div className="status-card">
      <div className="status-card__icon">
        <i className={icon}></i>
      </div>
      <div className="status-card__info">
        <h4>{count}</h4>
        <span>{title}</span>
      </div>
    </div>
  );
}

export default StatusCard;
