/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../mocks/mockData';
import { SideMenu } from '../../../components/commonViews/SideMenu';

jest.mock('react-router-dom');
/**
 * component function
 * creates a setup for SignupForm component
 *
 * @return {function} shallow -
 * renders a component one level deep
 * @param {bool} loading 
 */
const component = (active) => {
  const props = {
    active: active,
    groups: ['lfc', 'kfc'],
    user: {
      username: 'john_doe',
      email: 'john_doe@postit.com'
    },
    onLoadGroups: mockData.func,
    onLogoutUser: mockData.func
  }
  return shallow(<SideMenu {...props} />)
}

describe('<SideMenu/> Component: Given SideMenu component is mounted', () => {
  it('should render self as expected', (done) => {
    const wrapper = component('dashboard');
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done()
  });
  it('should render children as expected', (done) => {
    const wrapper = component('dashboard')
    expect(wrapper.find('ListItem').length).toBe(3);
    // expect(wrapper.find('Button').length).toBe(1);
    done()
  });
  it('should contain h5 element that holds a logged in username', (done) => {
    const wrapper = component('dashboard')
    expect(wrapper.find('h5').length).toBe(1);
    expect(wrapper.find('h5').text()).toEqual('\xa0\xa0john_doe');
    done()
  });
  it('should contain h5 element that holds a logged in username', (done) => {
    const wrapper = component('dashboard')
    expect(wrapper.find('h6').length).toBe(1);
    expect(wrapper.find('h6').text()).toEqual('john_doe@postit.com');
    done()
  });
  it('should contain an array of authenticated users groups', (done) => {
    const wrapper = component('dashboard')
    expect(wrapper.instance().props.groups.length).toBe(2);
    done()
  });
});