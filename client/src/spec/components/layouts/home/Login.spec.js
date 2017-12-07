/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import ConnectedLogin, { Login }
from '../../../../components/layout/home/login/Login';

/**
 * component function
 * creates a setup for Login component
 *
 * @return {function} shallow -
 * renders a component one level deep
 * @param {bool} loading 
 */
const component = (loading) => {
  const initialState = {
    userIsLoading: false,
    userIsAuthenticated: false,
    user: {}
  };
  const props = {
    userData: mockData.staticUser[0],
    isLoading: loading,
    onLoginUser: jest.fn(),
    onChange: mockData.func,
    onSubmit: mockData.func
  }
  return shallow(<Login {...props} />)
}
describe('<Login />: When Login component is mounted',
() => {
  it('should render self as expected', (done) => {
    const wrapper = component(false);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done()
  });
  it('should render children as expected', (done) => {
    const wrapper = component(false)
    expect(wrapper.find('Form').length).toBe(1);
    expect(wrapper.find('InputField').length).toBe(2);
    expect(wrapper.find('Button').length).toBe(1);
    done()
  });
  it('should call onFocus when any of the InputFields gain focus',
  (done) => {
    const wrapper = component(false)
    const onFocus = mockData.func;
    wrapper.find('#username').simulate('focus', onFocus());
    expect(onFocus.calledOnce).toBe(true);
    done();
  });
  it('should update state when the onChange method is called',
    (done) => {
      const wrapper = component(false)
      wrapper.find('#username').simulate('change', {
        target:
        { value: mockData.string, id: 'username' }
      });
      expect(wrapper.state('username')).toEqual(mockData.string);
      done();
    });
  it('should have error message state if one or more ' +
    'InputFields are empty',
    (done) => {
      const wrapper = component(false);
      const handleLogin = mockData.func;
      const button = wrapper.find('#login');
      button.simulate('click', handleLogin());
      wrapper.instance().handleLogin({ preventDefault: () => { } });
      expect(wrapper.state('errorMessage'))
        .toEqual('Error. Spaces or blank fields are not allowed');
      done();
    });
  it('should clear error message state when input' +
    'field is in focus', (done) => {
    const wrapper = component(false);
    const onFocus = mockData.func;
    wrapper.find('#username').simulate('focus', onFocus());
    expect(wrapper.state('errorMessage')).toEqual('');
    done();
  });
  it('should have button with label "Login in..." if user ' +
    'supplies correct input and it signs in the user',
    (done) => {
      const wrapper = component(true);
      const handleLogin = mockData.func;
      const button = wrapper.find('#login');
      const username = wrapper.find('#username').simulate('change', {
        target:
        { value: mockData.staticUser[0].username, id: 'username' }
      });
      const password = 
        wrapper.find('#password').simulate('change', {
        target:
        { value: mockData.staticUser[0].password, id: 'password' }
      });
      button.simulate('click', handleLogin());
      wrapper.instance().handleLogin({ preventDefault: () => { } });
      expect(wrapper.state('errorMessage')).not
        .toEqual('Error. One or more fields are empty');
      expect(button.props().name).toEqual('Login in...');
      done()
    });
});