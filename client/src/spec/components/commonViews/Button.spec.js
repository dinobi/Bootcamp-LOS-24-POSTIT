/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import mockData from '../../mocks/mockData';
import Button from '../../../components/commonViews/Button';

jest.mock('react-router-dom');

describe('<Button />: When button component is mounted', () => {
  it('should render self children and hold function without crashing', () => {
    const props = {
      onClick: mockData.func,
    };
    const wrapper = shallow(<Button {...props}/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
    wrapper.find('button').simulate('onClick');
  });
});