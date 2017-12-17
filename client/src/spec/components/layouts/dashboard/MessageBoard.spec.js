/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';
import ls from '../../../localStorage.js';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import mockedStore from '../../../mockedStore';
import ConnectedMessageBoard, { MessageBoard }
  from '../../../../components/layout/dashboard/messages/MessageBoard';

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
 * creates a setup for MessageBoard component
 *
 * @return {function} mount -
 * renders a component to the DOM
 * @param {bool} loading 
 */
const component = () => {
  return shallow(<MessageBoard {...props} />);
}
describe('<MessageBoard />: When MessageBoard component is mounted',
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
      expect(wrapper.find('Form').length).toBe(1);
      expect(wrapper.find('TextArea').length).toBe(1);
      expect(wrapper.find('Select').length).toBe(1);
      expect(wrapper.find('Button').length).toBe(1);
      expect(wrapper.find('.postlogs').length).toBe(1);
      done()
    });
  });