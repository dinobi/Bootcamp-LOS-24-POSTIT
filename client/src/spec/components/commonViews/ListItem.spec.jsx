/* globals expect */

import React from 'react';
import PropTypes from 'prop-types';
import mockData from '../../mocks/mockData';
import ListItem from '../../../components/commonViews/ListItem';

jest.mock('react-router-dom');

describe('<ListItem />: When ListItem component is mounted', () => {
  it('should render self and children without crashing', () => {
    const props = {
      onClick: mockData.func,
    };
    const wrapper = shallow(<ListItem {...props}/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('li').exists()).toBe(true);
    expect(wrapper.find('i').exists()).toBe(true);
    wrapper.find('a').simulate('click');

  });
});