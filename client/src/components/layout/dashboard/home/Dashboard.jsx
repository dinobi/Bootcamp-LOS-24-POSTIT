import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Features from './Features.jsx';
import DashHeader from '../DashHeader.jsx';
import {
  Copyright, SideMenu
} from '../../../commonViews';

/**
 * Dashboard Component
 * Displays a set of convenience cards for quick access to
 * the features of the app
 *
 * @method Dashboard
 * @returns {Object} JSX
 * @param {Object} props
 */
const Dashboard = () =>
  <div>
    <DashHeader active="dashboard" />
    <main className="dashboard-ui">
      <div className="row">
        <aside className="col s12 m3 l2 hide-on-small-and-down">
          <SideMenu active="dashboard" toggle="fa fa-toggle-off side-icon" />
        </aside>
        <Features />
      </div>
    </main>
  </div>;

export default Dashboard;
