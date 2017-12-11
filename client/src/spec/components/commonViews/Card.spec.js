/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import mockData from '../../mocks/mockData';
import { Card, Button } from '../../../components/commonViews';

describe('Component: When card component is mounted', () => {
  it('should render without crashing', () => {
    const props = {
      cardControl: 'card card-control'
    };
    const wrapper = shallow(<Card {...props}>children</Card>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.card').exists()).toBe(true);
  });
});