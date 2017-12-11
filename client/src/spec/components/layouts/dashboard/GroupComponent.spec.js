/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';
import ls from '../../../localStorage.js';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import mockedStore from '../../../mockedStore';
import ConnectedGroup, { Group }
  from '../../../../components/layout/dashboard/groups/Group';

const middleware = [thunk];
const configure = configureStore(middleware);
const store = configure(mockedStore);
let wrapper;
let tree;
const props = {
  loading: false,
  loadGroupMessages: mockData.func,
  loadGroupMembers: mockData.func,
  onLogoutUser: mockData.func,
  onAddMember: mockData.func,
  onRemoveMember: mockData.func
};
/**
 * component function
 * creates a setup for Group component
 *
 * @return {function} mount -
 * renders a full DOM
 * @param {bool} loading 
 */
const component = (loading) => {
  return mount(<Provider store={store}><ConnectedGroup {...props} /></Provider>);
}
describe('<Group />: When Group component is mounted',
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
      expect(wrapper.find('DashHeader').length).toBe(1);
      expect(wrapper.find('SideMenu').length).toBe(1);
      expect(wrapper.find('DashboardContent').length).toBe(1);
      expect(wrapper.find('MessageBoard').length).toBe(1);
      expect(wrapper.find('AddMemberModal').length).toBe(1);
      expect(wrapper.find('Members').length).toBe(1);
      done()
    });
  });