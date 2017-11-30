/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../components/commonViews/Modal';
import mockData from '../../mocks/mockData';

describe('<Modal />: When component is mounted', () => {
  it('should render itself and child components as expected', () => {
    const props = {
      modalTitle: mockData.string[1]
    };
    const onClick = mockData.func;
    const wrapper = mount(<Modal {...props}>children</Modal>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('h5').exists()).toBe(true);
  });
});