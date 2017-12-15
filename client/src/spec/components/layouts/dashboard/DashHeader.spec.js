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
/**
 * component function
 * creates a setup for DashHeader component
 *
 * @return {function} mount -
 * renders a fully DOM
 */
const component = (active) => {
  const props = {
    active: active,
    onLogoutUser: mockData.func
  };
  return shallow(<DashHeader {...props} />);
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
      wrapper = component()
      expect(wrapper.find('Header').length).toBe(1);
      expect(wrapper.find('ListItem').length).toBe(3);
      expect(wrapper.find('Button').length).toBe(1);
      done()
    });
    it('should call onLogoutUser when user is not authenticated', (done) => {
      ls.clearLocalStorage();
      wrapper = component();
      expect(wrapper.instance().props.onLogoutUser.calledOnce).toBe(true);
      done()
    });
    it("should call onLogoutUser if token has expired", (done) => {
      ls.setExpiredToken();
      wrapper = component();
      expect(wrapper.instance().props.onLogoutUser.calledOnce).toBe(true);
      done()
    });
    it('should have an existing connected component', (done) => {
      tree = shallow(<ConnectedDashHeader store={store} />);
      expect(tree.length).toBe(1);
      done()
    });
    it('should contain an active tab for the current page', (done) => {
      let tab = 'dashboard';
      wrapper = component(tab)
      expect(wrapper.instance().props.active).toEqual('dashboard');
      tab = 'groups';
      wrapper = component(tab)
      expect(wrapper.instance().props.active).toEqual('groups');
      tab = 'search-wiki';
      wrapper = component(tab)
      expect(wrapper.instance().props.active).toEqual('search-wiki');
      done()
    });
  });