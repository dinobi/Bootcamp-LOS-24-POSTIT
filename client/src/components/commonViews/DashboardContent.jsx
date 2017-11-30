import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

/**
 * DashboardContent Component
 *
 * @method DashboardContent
 * @returns {Object} JSX
 * @param {Object} props
 */
const DashboardContent =
  ({ children, wrapperClass, iconClass, title, subtitle }) =>
    <div className={wrapperClass}>
      <div className="bot-msg">
        <h3>
          <i className={iconClass}></i>
          &nbsp;{title}
        </h3>
        <p>{subtitle}</p>
      </div>
      <div>
        {children}
      </div>
    </div>;
DashboardContent.defaultProps = {
  wrapper: '',
  iconClass: '',
  title: '',
  subtitle: ''
};
DashboardContent.propTypes = {
  wrapperClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default DashboardContent;
