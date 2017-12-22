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
/**
 * component function
 * creates a setup for Group component
 *
 * @return {function} mount -
 * renders a full DOM
 * @param {bool} loading 
 */
const component = (loading) => {
  const props = {
    loading: loading,
    match:
      { params:
        { groupname: 'rainier' }
      },
    loadGroupMessages: mockData.func,
    loadGroupMembers: mockData.func,
    onLogoutUser: mockData.func,
    onAddMember: mockData.func,
    onRemoveMember: mockData.func
  };
  return shallow(<Group {...props} />);
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
    it('should render self as expected', (done) => {
      tree = shallow(<ConnectedGroup store={store} />)
      expect(tree.length).toBe(1);
      done()
    });
    it('should render self as expected', (done) => {
      tree = shallow(<ConnectedGroup store={store} />)
      expect(tree.length).toBe(1);
      done()
    });
    it('should not re-render when groupname does not change', (done) => {
      wrapper = component();
      let nextProps = {
        match: {
          params: {
            groupname: 'rainier'
          }
        }
      }
      wrapper.setProps(nextProps);
      expect(wrapper.instance().props.match.params.groupname)
      done()
    });
    it('should re-render when groupname changes', (done) => {
      wrapper = component();
      let nextProps = {
        match: {
          params: {
            groupname: 'lfc'
          }
        }
      }
      wrapper.setProps(nextProps);
      expect(wrapper.instance().props.match.params.groupname).toEqual('lfc');
      done()
    });
    it('should show a loader when loading state is set to true', (done) => {
      const wrapper = component(true);
      expect(wrapper.instance().props.loading).toBe(true);
      done()
    });
    it('should save state of an authorized user', (done) => {
      const wrapper = component();
      expect(wrapper.state().username).toBe('john_doe');
      done()
    });
    it('should not save state of an unauthorized user', (done) => {
      ls.clearLocalStorage();
      const wrapper = component();
      expect(wrapper.state().username).toBe('');
      done()
    });
  });