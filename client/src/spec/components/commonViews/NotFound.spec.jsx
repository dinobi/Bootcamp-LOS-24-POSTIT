/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../mocks/mockData';
import NotFound from '../../../components/commonViews/NotFound';

jest.mock('react-router-dom');
/**
 * component function
 * creates a setup for SignupForm component
 *
 * @return {function} shallow -
 * renders a component one level deep
 * @param {bool} loading 
 */
const component = () => {
  return shallow(<NotFound />)
}

describe('<NotFound /> Component: Given NotFound component is mounted', () => {
  it('should render self as expected', (done) => {
    const wrapper = component();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done()
  });
  it('should render children as expected', (done) => {
    const wrapper = component('dashboard')
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('Footer').length).toBe(1);
    done()
  });
});