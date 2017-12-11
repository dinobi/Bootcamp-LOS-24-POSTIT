/* globals expect */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import ConnectedRegister, { Register }
from '../../../../components/layout/home/signup/Register';

jest.mock('react-router-dom');
const initialState = {
  IsLoading: false,
  onSignupUser: false
}; 
const props = {
  isLoading: mockData.boolFalse,
  onSignupUser: jest.fn(),
};
const mockStore = configureStore();
let wrapper;
let store;

describe('<Register />: When Register component is mounted', () => {
  it('should render self and children as expected', (done) => {
    wrapper = shallow(<Register {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done()
  });
});