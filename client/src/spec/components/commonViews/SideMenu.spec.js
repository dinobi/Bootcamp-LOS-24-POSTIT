/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import mockData from '../../mocks/mockData';
import SideMenu from '../../../components/commonViews/SideMenu';

jest.mock('react-router-dom');

describe('Component: Given SideMenu component is mounted', () => {
});