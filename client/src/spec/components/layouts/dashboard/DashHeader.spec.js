/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';
import ls from '../../../localStorage.js';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import mockedStore from '../../../mockedStore';
import ConnectedDashHeader, { DashHeader }
  from '../../../../components/layout/dashboard/DashHeader';

const middleware = [thunk];
const configure = configureStore(middleware);
const store = configure(mockedStore);
let wrapper;
let tree;
const props = {
  handleSend: mockData.func,
  handleScroll: mockData.func
};
/**
 * component function
 * creates a setup for DashHeader component
 *
 * @return {function} mount -
 * renders a fully DOM
 */
const component = () => {
  return mount(
  <Provider store={store}>
    <ConnectedDashHeader {...props} />
  </Provider>
);
}
describe('<DashHeader />: When DashHeader component is mounted',
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
      expect(wrapper.find('Header').length).toBe(1);
      expect(wrapper.find('ListItem').length).toBe(6);
      expect(wrapper.find('Button').length).toBe(2);
      done()
    });
  });