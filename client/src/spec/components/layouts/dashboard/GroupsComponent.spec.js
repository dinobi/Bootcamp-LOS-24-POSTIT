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
let groups = []
const configure = configureStore(middleware);
const store = configure(mockedStore);
let tree;
let wrapper;
let cLoading = false;
let gLoading = false;
let dLoading = false;
/**
 * component function
 * creates a setup for Login component
 *
 * @return {function} mount -
 * renders a full DOM
 */
const component = () => {
  const state = {
    groupname: '',
    description: '',
  };
  const props = {
    groups: {
      groups: groups
    },
    createLoading: cLoading,
    groupsLoading: gLoading,
    deleteLoading: dLoading,
    onCreateGroup: mockData.func,
    onLoadGroups: mockData.func,
    onArchiveGroup: mockData.func,
    onLogoutUser: mockData.func,
  }
  return shallow(<Groups {...props} />);
}
describe('<Groups />: When Groups component is mounted',
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
    it('should call onLogoutUser when user is not authenticated', (done) => {
      ls.clearLocalStorage();
      wrapper = component();
      expect(wrapper.instance().props.onLogoutUser.calledTwice).toBe(true);
      done()
    });
    it('should render children as expected', (done) => {
      ls.setLocalStorage();
      const wrapper = component()
      expect(wrapper.find('Form').length).toBe(1);
      expect(wrapper.find('IconButton').length).toBe(1);
      done()
    });
    it('should display a create new group message if user has no group', (done) => {
      const wrapper = component()
      expect(wrapper.find('span').length).toBe(1);
      expect(wrapper.find('span').text()).toEqual('Pls join or create a group');
      done()
    });
    it('should render GroupCard if groups exist', (done) => {
      groups = [
        {
          id: 1,
          groupname: 'lfc'
        },
        {
          id: 2,
        }
      ]
      const wrapper = component()
      expect(wrapper.find('GroupCard').length).toBe(2);
      done()
    });
    it('should update state of the component when user attempts ' +
    'to create a new group',
    (done) => {
      wrapper = component();
      const handleChange = mockData.func;
      const groupname = wrapper.find('#groupname').simulate('change', {
        target:
        { value: mockData.staticGroups[0].groupname, id: 'groupname' }
      });
      const description = wrapper.find('#description').simulate('change', {
        target:
        { value: mockData.staticGroups[0].description, id: 'description' }
      });
      expect(wrapper.state('description'))
      .toEqual(mockData.staticGroups[0].description);
      done()
    });
    it('should not call the onCreateGroup handler if input fields are empty',
    (done) => {
      wrapper = component();
      const handleCreate = mockData.func;
      const button = wrapper.find('IconButton');
      const groupname = wrapper.find('#groupname').simulate('change', {
        target:
        { value: '', id: 'groupname' }
      });
      const description = wrapper.find('#description').simulate('change', {
        target:
        { value: '', id: 'description' }
      });
      button.simulate('click', handleCreate());
      wrapper.instance().handleCreate();
      expect(wrapper.instance().props.onCreateGroup.calledOnce).toBe(false);
      done()
    });
    it('should show progress loader and create a new group with correct details',
    (done) => {
      cLoading = true;
      wrapper = component();
      const handleCreate = mockData.func;
      const button = wrapper.find('IconButton');
      const groupname = wrapper.find('#groupname').simulate('change', {
        target:
        { value: mockData.staticGroups[0].groupname, id: 'groupname' }
      });
      const description = wrapper.find('#description').simulate('change', {
        target:
        { value: mockData.staticGroups[0].description, id: 'description' }
      });
      const groupData = { groupname, description }
      button.simulate('click', handleCreate);
      wrapper.instance().handleCreate();
      wrapper.instance().props.onCreateGroup(groupData);
      expect(wrapper.find('.progress').length).toBe(1);
      done()
    });
    it('should call onArchiveGroup when groupname is supplied',
    (done) => {
      const groupname = 'lfc';
      const groupData = { groupname };
      const swal = mockData.promiseFuncResolve;
      wrapper = component();
      const handleArchiveSpy = jest.spyOn(wrapper.instance(), 'handleArchive')
      wrapper.instance().handleArchive(groupname);
      expect(wrapper.find('.progress').length).toBe(1);
      expect(handleArchiveSpy).toHaveBeenCalledTimes(1);
      done();
    });
    it('should call not call onArchiveGroup when groupname is not supplied',
    (done) => {
      const groupname = '';
      const groupData = { groupname }
      wrapper = component();
      const handleArchiveSpy = jest.spyOn(wrapper.instance(), 'handleArchive')
      wrapper.instance().handleArchive(groupname);
      expect(wrapper.find('.progress').length).toBe(1);
      expect(handleArchiveSpy).toHaveBeenCalledTimes(1);
      done();
    });
    it('should render a connected groups component', (done) => {
      tree = shallow(
        <ConnectedGroups
          store={store}
        />);
      expect(tree.length).toBe(1);
      done()
    });

  });