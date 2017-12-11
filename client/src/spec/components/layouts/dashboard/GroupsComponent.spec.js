/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import ls from '../../../localStorage.js';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import mockedStore from '../../../mockedStore';
import ConnectedGroups, { Groups }
  from '../../../../components/layout/dashboard/groups/Groups';

const middleware = [thunk];
const configure = configureStore(middleware);
const store = configure(mockedStore);
let wrapper;
let tree;
const props = {
  groups: [],
  createLoading: false,
  groupsLoading: false,
  deleteLoading: false,
  onCreateGroup: mockData.promiseFunc,
  onLoadGroups: mockData.promiseFunc,
  onArchiveGroup: mockData.promiseFunc,
  onLogoutUser: sinon.spy()
}
/**
 * component function
 * creates a setup for Login component
 *
 * @return {function} mount -
 * renders a full DOM
 */
const component = () => {
  const initialState = {
    groupname: '',
    description: '',

  };
  return mount(<Provider store={store}><ConnectedGroups {...props} /></Provider>);
}
describe('<Groups />: When Groups component is mounted',
  () => {
    beforeAll(() => {
      ls.setLocalStorage();
    });
    it('should render self as expected', (done) => {
      wrapper = component(false, false, false);
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.length).toBe(1);
      done()
    });
    it('should render children as expected', (done) => {
      const wrapper = component(false, false, false);
      expect(wrapper.find('DashHeader').length).toBe(1);
      expect(wrapper.find('SideMenu').length).toBe(1);
      expect(wrapper.find('DashboardContent').length).toBe(1);
      expect(wrapper.find('Card').length).toBe(1);
      expect(wrapper.find('Form').length).toBe(1);
      expect(wrapper.find('InputField').length).toBe(2);
      expect(wrapper.find('IconButton').length).toBe(2);
      expect(wrapper.find('GroupCard').length).toBe(1);
      done()
    });
    // it('should create a new group when all input are supplied',
    // (done) => {
    //   const tree = shallow(<Groups {...props}/>)
    //   const handleCreate = mockData.func;
    //   const button = tree.find('#createGroup');
    //   const groupname = tree.find('#groupname').simulate('change', {
    //     target:
    //     { value: mockData.staticGroups[0].groupname, id: 'groupname' }
    //   });
    //   const description = tree.find('#description').simulate('change', {
    //     target:
    //     { value: mockData.staticGroups[0].description, id: 'description' }
    //   });
    //   button.simulate('click', handleCreate());
    //   tree.instance().handleCreate({ preventDefault: () => { } });
    //   expect(tree.find('GroupCard').length).toBe(2);
    //   done()
    // });
  });