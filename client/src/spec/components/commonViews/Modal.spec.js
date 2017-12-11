/* globals expect */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../components/commonViews/Modal';
import mockData from '../../mocks/mockData';

/**
 * component function
 * creates a setup for Modal component
 *
 * @return {function} mount -
 * renders a component to the DOM
 * @param {bool} loading 
 */
const component = (opened, action) => {
  const initialState = {
    modalOpened: opened
  };
  const props = {
    onClick: mockData.func,
    modalTitle: mockData.string[1],
    action: action
  }
  return mount(<Modal {...props} />)
}

describe('<Modal />: When component is mounted', () => {
  it('should render self as expected', (done) => {
    const wrapper = component(false, 'create group');
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done()
  });
  it('should render itself and child components as expected', () => {
    const wrapper = component(false, 'create group');
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('h5').exists()).toBe(true);
    expect(wrapper.instance().props.modalTitle.length).toBe(4);
  });
  it('should call modalToggle when "a" tag is click',
  (done) => {
    const wrapper = component(false, 'create group');
    const modalToggle = mockData.func;
    wrapper.find('a').simulate('click', modalToggle());
    expect(modalToggle.calledOnce).toBe(true);
    done();
  });
  it('should update state when "a" is clicked',
  (done) => {
    const wrapper = component(false, 'create group')
    const modalToggle = mockData.func;
    wrapper.find('a').simulate('click', modalToggle());
    expect(wrapper.state('modalOpened')).toEqual(true);
    done();
  });
});