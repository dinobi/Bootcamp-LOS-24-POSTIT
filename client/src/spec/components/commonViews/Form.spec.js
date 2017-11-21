/* globals expect */
/* eslint-disable no-unused-vars */
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
    };
    const wrapper = mount(<Form {...props}>children</Form>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('form').exists()).toBe(true);
  });
});