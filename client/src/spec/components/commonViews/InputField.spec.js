/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import mockData from '../../mocks/mockData';
import InputField from '../../../components/commonViews/InputField';

jest.mock('react-router-dom');

describe('<InputField />: When InputField component is mounted', () => {
  it('should render self and children and hold function without crashing', () => {
    const props = {
      onChange: mockData.func
    };
    const wrapper = mount(<InputField {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('label').exists()).toBe(true);
    wrapper.find('input').simulate('change');
  });
});