/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Footer from '../../../components/commonViews/Footer';
import mockData from '../../mocks/mockData';

describe('Given Footer component is mounted', () => {
  it('should render self without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('footer').exists()).toBe(true);
  });
});