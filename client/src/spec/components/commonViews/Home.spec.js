/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import mockData from '../../mocks/mockData';
import { Home } from '../../../components/commonViews/Home';

jest.mock('react-router-dom');

describe('<Home />: When home component is mounted', () => {
  it('should render self without crashing', () => {
    const props = {
      isAuthenticated: mockData.boolFalse,
    };
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper.exists()).toBe(true);
    // expect(wrapper.find('button').exists()).toBe(true);
    // expect(wrapper.find('img').exists()).toBe(true);
    // expect(wrapper.find('.alert').exists()).toBe(true);
  });
});