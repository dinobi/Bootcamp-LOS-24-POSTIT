/* globals expect */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Form from '../../../components/commonViews/Form';
import mockData from '../../mocks/mockData';

jest.mock('react-router-dom');

describe('Component: When form component is mounted', () => {
  it('should render self and child components as expected', () => {
    const props = {
      onSubmit: mockData.func,
      id: mockData.string[3]
    };
    const wrapper = mount(<Form {...props}>children</Form>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('form').exists()).toBe(true);
    wrapper.find('form').simulate('submit');
  });
});