/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import mockData from '../../mocks/mockData';
import InputField from '../../../components/commonViews/InputField';

jest.mock('react-router-dom');

describe('<InputField />: When button component is mounted', () => {
  it('should render self children and hold function without crashing', () => {
    const props = {
      onClick: mockData.func,
    };
    const wrapper = shallow(<InputField {...props}/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('label').exists()).toBe(true);
    wrapper.find('button').simulate('onClick');
  });
});