/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import mockData from '../../mocks/mockData';
import IconButton from '../../../components/commonViews/IconButton';

jest.mock('react-router-dom');

describe('<IconButton />: When IconButton component is mounted', () => {
  it('should render self without crashing', () => {
    const props = {
      onClick: mockData.func,
    };
    const wrapper = shallow(<IconButton {...props}/>);
    expect(wrapper.exists()).toBe(true);
    wrapper.find('i').simulate('onClick');
  });
});