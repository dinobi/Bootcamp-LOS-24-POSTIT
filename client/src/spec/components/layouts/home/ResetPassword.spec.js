/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import { ResetPassword }
from '../../../../components/layout/home/password-update/ResetPassword';

/**
 * component function
 * creates a setup for ResetPassword component
 *
 * @return {function} shallow -
 * renders a component one level deep
 * 
 * @param {bool} loading 
 */
const component = (loading) => {
  const initialState = {
    errorMessage: '',
    password: '',
    confirmPassword: ''
  };
  const props = {
    loader: loading,
    onResetPassword: jest.fn(),
    onChange: mockData.func,
    onSubmit: mockData.func
  }
  return shallow(<ResetPassword {...props} />)
}
describe('<ResetPassword />: When component is mounted',
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
    wrapper.find('#password').simulate('focus', onFocus());
    expect(onFocus.calledOnce).toBe(true);
    done();
  });
  it('should update state when the onChange method is called',
    (done) => {
      const wrapper = component(false)
      wrapper.find('#confirmPassword').simulate('change', {
        target:
        { value: mockData.string, id: 'confirmPassword' }
      });
      expect(wrapper.state('confirmPassword')).toEqual(mockData.string);
      done();
    });
  it('should have error message state if one or more ' +
    'InputFields are empty',
    (done) => {
      const wrapper = component(false);
      const handleResetPassword = mockData.func;
      const button = wrapper.find('#reset-password');
      button.simulate('click', handleResetPassword());
      wrapper.instance().handleResetPassword({ preventDefault: () => { } });
      expect(wrapper.state('errorMessage'))
        .toEqual('Error. All fields are required');
      done();
    });
    it('should have error message if password and ' +
    'confirm password fields do not match',
    (done) => {
      const wrapper = component(false);
      const handleResetPassword = mockData.func;
      const button = wrapper.find('#reset-password');
      const password =
        wrapper.find('#password').simulate('change', {
          target:
          { value: mockData.staticUser[0].password, id: 'password' }
        });
      const confirmPassword =
        wrapper.find('#confirmPassword').simulate('change', {
          target:
          { value: mockData.staticUser[1].password, id: 'confirmPassword' }
        });
      button.simulate('click', handleResetPassword());
      wrapper.instance().handleResetPassword({ preventDefault: () => { } });
      expect(wrapper.state('errorMessage'))
        .toEqual('Error. Passwords do not match');
      done();
    });
  it('should clear error message state when input' +
    'field is in focus', (done) => {
    const wrapper = component(false);
    const onFocus = mockData.func;
    wrapper.find('#password').simulate('focus', onFocus());
    expect(wrapper.state('errorMessage')).toEqual('');
    done();
  });
  it('should have button with label "processing..." if user ' +
    'supplies correct passwords input',
    (done) => {
      const wrapper = component(true);
      const handleResetPassword = mockData.func;
      const button = wrapper.find('#reset-password');
      const password = 
        wrapper.find('#password').simulate('change', {
        target:
        { value: mockData.staticUser[0].password, id: 'password' }
      });
      const confirmPassword = 
      wrapper.find('#confirmPassword').simulate('change', {
      target:
      { value: mockData.staticUser[0].password, id: 'confirmPassword' }
    });
      button.simulate('click', handleResetPassword());
      wrapper.instance().handleResetPassword({ preventDefault: () => { } });
      expect(wrapper.state('errorMessage')).not
        .toEqual('Error. One or more fields are empty');
      expect(button.props().name).toEqual('processing...');
      done()
  });
});