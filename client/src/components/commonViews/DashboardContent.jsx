import React from 'react';

const DashboardContent = ({ children, wrapperClass, iconClass, title, subtitle }) =>
  <div className={wrapperClass}>
    <div className="bot-msg">
      <h3>
        <i className={iconClass}></i>
        &nbsp;{ title }
      </h3>
      <p>{subtitle}</p>
    </div>
    <div>
      {children}
    </div>
  </div>;

export default DashboardContent;
