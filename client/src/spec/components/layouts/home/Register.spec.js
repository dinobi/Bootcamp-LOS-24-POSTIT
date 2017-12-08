/* globals expect */
/* eslint-disable no-unused-vars */
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
const mockStore = configureStore();
let wrapper;
let store;

describe('<Register />: When Register component is mounted', () => {
  const props = {
    isLoading: mockData.boolFalse,
    onSignupUser: jest.fn(),
  };

  beforeEach(() => {
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState);
    wrapper = shallow(<Register {...props} />);
    // treeMount = mount( <Provider store={store}><ConnectedLogin /></Provider> )
  });
  it('should render self and children as expected', (done) => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done()
  });
});