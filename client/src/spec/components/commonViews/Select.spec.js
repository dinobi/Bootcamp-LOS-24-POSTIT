/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Select from '../../../components/commonViews/Select';
import mockData from '../../mocks/mockData';

jest.mock('react-router-dom');

describe('Component: When select component is mounted', () => {
  it('should render as expected', () => {
    const props = {
      selectRef: mockData.func,
    };
    const wrapper = mount(<Select {...props}>children</Select>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('select').exists()).toBe(true);
  });
});