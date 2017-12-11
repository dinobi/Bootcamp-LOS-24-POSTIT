/* globals expect */

import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../../components/commonViews/Select';
import mockData from '../../mocks/mockData';

describe('Component: When select component is mounted', () => {
  it('should render as expected', () => {
    const props = {
      selectRef: mockData.func,

    };
    const wrapper = mount(<Select {...props}>children</Select>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('select').exists()).toBe(true);
  });
});