/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import mockedStore from '../../../mockedStore';
import AddMemberModal
  from '../../../../components/layout/dashboard/members/AddMemberModal';

const middleware = [thunk];
let users = {

}
let groups = ['lfc', 'kfc'];
const configure = configureStore(middleware);
const store = configure(mockedStore);
let tree;
let wrapper;
let props = {
  addMemberModal: {
    modalTitle: 'Search and add members by username',
    addMemberButton: 'Add Member',
    onAddMember: mockData.func
  }
};
/**
 * component function
 * creates a setup for AddMember component
 *
 * @return {function} mount -
 * renders a full DOM
 */
const component = () => {
  return mount(<AddMemberModal {...props} />);
}
describe('<AddMemberModal />: When AddMemberModal component is mounted',
  () => {
    it('should render self as expected', (done) => {
      wrapper = component();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.length).toBe(1);
      done()
    });
    it('should render children as expected', (done) => {
      const wrapper = component(false)
      expect(wrapper.find('Modal').length).toBe(1);
      expect(wrapper.find('Form').length).toBe(1);
      expect(wrapper.find('InputField').length).toBe(1);
      expect(wrapper.find('SearchResult').length).toBe(1);
      done()
    });
    it('should call onFocus when any of the InputFields gain focus',
    (done) => {
      const tree = shallow(<AddMemberModal {...props}/>)
      const onFocus = mockData.func;
      tree.find('#searchTerm').simulate('focus', onFocus());
      expect(onFocus.calledOnce).toBe(true);
      done();
    });
    it('should update search form state with search term from ' +
    'input field', (done) => {
      const tree = shallow(<AddMemberModal {...props} />);
      tree.find('#searchTerm').simulate('change', {
        target:
        { value: mockData.string[0], id: 'searchTerm' }
      });
      expect(tree.state('searchTerm')).toEqual(mockData.string[0]);
      done();
    });
    it('should call the handleChange method as user performs an on change event', (done) => {
      const tree = shallow(<AddMemberModal {...props} />);
      const handleChange = mockData.func;
      const handleSearch = mockData.func;
      tree.find('#searchTerm').simulate('change', {
        target:
        { value: mockData.staticUser[0].username, id: 'searchTerm' }
      });
      expect(tree.instance().handleChange.length).toBe(1);
      expect(tree.state('searchTerm'))
      .toEqual(mockData.staticUser[0].username);
      done();
    });
  });