/* globals expect */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import mockData from '../../mocks/mockData';
import Header from '../../../components/commonViews/Header';

describe('Given Header component is mounted', () => {
  it('should render self without crashing', () => {
    const props = {
      handleClick: mockData.func
    }
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('header').exists()).toBe(true);
  });
});