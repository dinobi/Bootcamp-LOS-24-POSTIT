/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';
import ls from '../../../localStorage.js';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import mockedStore from '../../../mockedStore';
import { MainHeader }
  from '../../../../components/layout/home/MainHeader';

const middleware = [thunk];
const configure = configureStore(middleware);
const store = configure(mockedStore);
let wrapper;
let tree;
const props = {
  onLogoutUser: mockData.func
};
/**
 * component function
 * creates a setup for MainHeader component
 *
 * @return {function} shallow -
 * renders a component one level deep
 */
const component = () => {
  return shallow(<MainHeader {...props} />);
}
describe('<MainHeader />: When MainHeader component is mounted',
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
      const wrapper = component(false)
      expect(wrapper.find('Header').length).toBe(1);
      expect(wrapper.find('li').length).toBe(3);
      done()
    });
  });