/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import DashboardContent from '../../../components/commonViews/DashboardContent';
import mockData from '../../mocks/mockData';

describe('<DashboardComponent/>: When component is mounted', () => {
  it('should render itself and child components as expected', () => {
    const props = {
      title: mockData.string[1],
      wrapperClass: mockData.string[2]
    };
    const wrapper = mount(<DashboardContent {...props}>children</DashboardContent>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h3').exists()).toBe(true);
    expect(wrapper.find('i').exists()).toBe(true);
  });
});