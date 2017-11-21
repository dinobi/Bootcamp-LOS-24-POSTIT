/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import mockData from '../../mocks/mockData';
import Button from '../../../components/commonViews/Button';

jest.mock('react-router-dom');

describe('Component: When button component is mounted', () => {
  it('should render without crashing', () => {
    const props = {
      onClick: mockData.func,
    };
    const wrapper = shallow(<Button {...props}/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });
});