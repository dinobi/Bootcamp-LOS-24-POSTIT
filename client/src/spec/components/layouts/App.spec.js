/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../mocks/mockData';
import App from '../../../app/App';

const mockStore = configureStore();
let wrapper;
let store;

describe('<Login />: When Login component is mounted', () => {
  wrapper = shallow(<App />)
  it('should render self and children as expected', (done) => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done()
  });
});