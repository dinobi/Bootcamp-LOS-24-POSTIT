import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Features from './Features.jsx';
import {
  DashHeader, Copyright, SideMenu
} from '../../../commonViews';

const Dashboard = () =>
  <div>
    <DashHeader />
    <main className="dashboard-ui">
      <div className="row">
        <aside className="col s12 m3 l2 hide-on-small-and-down">
        <SideMenu active="dashboard" />
        </aside>
        <Features/>
      </div>
    </main>
  </div>;

export default Dashboard;
