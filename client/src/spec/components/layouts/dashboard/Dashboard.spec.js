/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';
import ls from '../../../localStorage.js';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import mockedStore from '../../../mockedStore';
import Dashboard
  from '../../../../components/layout/dashboard/home/Dashboard';

const middleware = [thunk];
const configure = configureStore(middleware);
const store = configure(mockedStore);
let wrapper;
let tree;
/**
 * component function
 * creates a setup for Dashboard component
 *
 * @return {function} mount -
 * renders a full DOM
 */
const component = () => {
  return mount(<Provider store={store}><Dashboard /></Provider>);
}
describe('<Dashboard />: When Dashboard component is mounted',
  () => {
    beforeAll(() => {
      ls.setLocalStorage();
    });
    it('should render self as expected', (done) => {
      wrapper = component();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.length).toBe(1);
      done()
    });
    it('should render children as expected', (done) => {
      const wrapper = component()
      expect(wrapper.find('DashHeader').length).toBe(1);
      expect(wrapper.find('SideMenu').length).toBe(1);
      expect(wrapper.find('Features').length).toBe(1);
      done()
    });
  });