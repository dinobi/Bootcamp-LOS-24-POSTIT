/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import mockData from '../../mocks/mockData';
import ErrorAlert from '../../../components/commonViews/ErrorAlert';

jest.mock('react-router-dom');

describe('<ErrorAlert />: When button component is mounted', () => {
  it('should render self without crashing', () => {
    const props = {
      errorMessage: mockData.longString[0],
    };
    const wrapper = shallow(<ErrorAlert {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
    expect(wrapper.find('i').exists()).toBe(true);
    expect(wrapper.find('.alert').exists()).toBe(true);
  });
});