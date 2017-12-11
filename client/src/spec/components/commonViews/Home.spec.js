/* globals expect */

import React from 'react';
import PropTypes from 'prop-types';
import mockData from '../../mocks/mockData';
import ls from '../../localStorage';
import { Home } from '../../../components/commonViews/Home';

jest.mock('react-router-dom');

describe('<Home />: When home component is mounted', () => {
  beforeAll(() => {
    ls.setLocalStorage();
  })
  it('should render self without crashing', () => {
    const props = {
      isAuthenticated: mockData.boolFalse,
    };
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});