/* globals expect */

import React from 'react';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import ls from '../../localStorage.js';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockedStore from '../../mockedStore';
import mockData from '../../mocks/mockData';
import ConnectedSideMenu, { SideMenu } from '../../../components/commonViews/SideMenu';

jest.mock('react-router-dom');

const middleware = [thunk];
let groups = ['lfc', 'kfc'];
const configure = configureStore(middleware);
const store = configure(mockedStore);
let tree;
/**
 * component function
 * creates a setup for SignupForm component
 *
 * @return {function} shallow -
 * renders a component one level deep
 * @param {bool} loading 
 */
const component = (active) => {
  const state = {
    user: {
      username: 'john_doe',
      email: 'john_doe@postit.com'
    },
  }
  const props = {
    active: active,
    groups: groups,
    onLoadGroups: mockData.promiseFuncResolve,
    onLogoutUser: mockData.func
  }
  return shallow(<SideMenu {...props} />);
}

describe('<SideMenu/> Component: Given SideMenu component is mounted', () => {
  // beforeAll(() => {
  //   ls.setLocalStorage();
  // });
  it('should render self as expected', (done) => {
    ls.setLocalStorage();
    const wrapper = component('dashboard');
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done()
  });
  it('should render children as expected', (done) => {
    ls.setLocalStorage();
    const wrapper = component('dashboard')
    expect(wrapper.find('ListItem').length).toBe(3);
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
  it('should contain an active tab for the current page', (done) => {
    let tab = 'dashboard';
    let wrapper = component(tab)
    expect(wrapper.instance().props.active).toEqual('dashboard');
    tab = 'groups';
    wrapper = component(tab)
    expect(wrapper.instance().props.active).toEqual('groups');
    tab = 'search-wiki';
    wrapper = component(tab)
    expect(wrapper.instance().props.active).toEqual('search-wiki');
    done()
  });
  it('should contain an array of authenticated users groups', (done) => {
    const wrapper = component('dashboard');
    expect(wrapper.instance().props.groups.length).toBe(2);
    done()
  });
  it('should contain an array of authenticated user groups', (done) => {
    groups = [];
    const wrapper = component('groups');
    expect(wrapper.instance().props.groups.length).toBe(0);
    done()
  });
  it('should not call onLogoutUser when user is authenticated', (done) => {
    const wrapper = component('dashboard');
    expect(wrapper.instance().props.onLogoutUser.calledOnce).toBe(false);
    done()
  });
  it('should call onLogoutUser when user is not authenticated', (done) => {
    ls.clearLocalStorage();
    const wrapper = component('dashboard');
    expect(wrapper.instance().props.onLogoutUser.calledOnce).toBe(true);
    done()
  });
  it('should have an existing connected component', (done) => {
    tree = shallow(<ConnectedSideMenu store={store} />);
    expect(tree.length).toBe(1);
    done()
  });
});