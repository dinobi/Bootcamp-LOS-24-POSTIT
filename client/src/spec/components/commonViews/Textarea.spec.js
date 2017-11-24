/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Textarea from '../../../components/commonViews/Textarea';
import mockData from '../../mocks/mockData';

jest.mock('react-router-dom');

describe('Component: When textarea component is mounted', () => {
  it('should render components as expected', () => {
    const props = {
      onFocus: mockData.func,
      textRef: mockData.func
    };
    const wrapper = mount(<Textarea {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('textarea').exists()).toBe(true);
  });
});