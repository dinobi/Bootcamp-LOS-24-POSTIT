/* globals expect */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import { SignupForm }
from '../../../../components/layout/home/signup/SignupForm';

/**
 * component function
 * creates a setup for SignupForm component
 *
 * @return {function} shallow -
 * renders a component one level deep
 * 
 * @param {bool} loading 
 */
const component = (loading) => {
  const props = {
    onChange: mockData.func,
    onSubmit: mockData.func,
    onSignupUser: mockData.promiseFuncResolve,
    isLoading: loading
  }
  return shallow(<SignupForm {...props} />)
}
describe('<SignupForm />: When SignupForm component is mounted',
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
    expect(wrapper.find('InputField').length).toBe(5);
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
      const onSubmitClick = mockData.func;
      const button = wrapper.find('#register');
      button.simulate('click', onSubmitClick());
      wrapper.instance().onSubmitClick({ preventDefault: () => { } });
      expect(wrapper.state('errorMessage'))
        .toEqual('Error: One or more fields are empty');
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
  it('should have error message if username is less than ' +
  '3 characters',
  (done) => {
    const wrapper = component(false);
    const onSubmitClick = mockData.func;
    const button = wrapper.find('#register');
    const username = wrapper.find('#username').simulate('change', {
      target:
      { value: 'ki', id: 'username' }
    });
    const email = wrapper.find('#email').simulate('change', {
      target:
      { value: mockData.staticUser[0].email, id: 'email' }
    });
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
    const phone = wrapper.find('#phone').simulate('change', {
      target:
      { value: mockData.staticUser[0].phone, id: 'phone' }
    });
    button.simulate('click', onSubmitClick());
    wrapper.instance().onSubmitClick({ preventDefault: () => { } });
    expect(wrapper.state('errorMessage'))
      .toEqual('Error: Username should be atleast 3 characters long');
    done();
  });
  it('should have error message if username is contain invalid ' +
  'characters',
  (done) => {
    const wrapper = component(false);
    const onSubmitClick = mockData.func;
    const button = wrapper.find('#register');
    const username = wrapper.find('#username').simulate('change', {
      target:
      { value: '#hello', id: 'username' }
    });
    const email = wrapper.find('#email').simulate('change', {
      target:
      { value: mockData.staticUser[0].email, id: 'email' }
    });
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
    const phone = wrapper.find('#phone').simulate('change', {
      target:
      { value: mockData.staticUser[0].phone, id: 'phone' }
    });
    button.simulate('click', onSubmitClick());
    wrapper.instance().onSubmitClick({ preventDefault: () => { } });
    expect(wrapper.state('errorMessage'))
      .toEqual('Error: Username can contain only alphabets, numbers, or underscore');
    done();
  });
  it('should have error message if username exceed 18 characters',
  (done) => {
    const wrapper = component(false);
    const onSubmitClick = mockData.func;
    const button = wrapper.find('#register');
    const username = wrapper.find('#username').simulate('change', {
      target:
      { value: 'This_is_too_long_for_a_username', id: 'username' }
    });
    const email = wrapper.find('#email').simulate('change', {
      target:
      { value: mockData.staticUser[0].email, id: 'email' }
    });
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
    const phone = wrapper.find('#phone').simulate('change', {
      target:
      { value: mockData.staticUser[0].phone, id: 'phone' }
    });
    button.simulate('click', onSubmitClick());
    wrapper.instance().onSubmitClick({ preventDefault: () => { } });
    expect(wrapper.state('errorMessage'))
      .toEqual('Error: Username should not exceed 18 characters');
    done();
  });
  it('should have error message if email is invalid',
  (done) => {
    const wrapper = component(false);
    const onSubmitClick = mockData.func;
    const button = wrapper.find('#register');
    const username = wrapper.find('#username').simulate('change', {
      target:
      { value: mockData.staticUser[0].username, id: 'username' }
    });
    const email = wrapper.find('#email').simulate('change', {
      target:
      { value: 'john_doe@gmail', id: 'email' }
    });
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
    const phone = wrapper.find('#phone').simulate('change', {
      target:
      { value: mockData.staticUser[0].phone, id: 'phone' }
    });
    button.simulate('click', onSubmitClick());
    wrapper.instance().onSubmitClick({ preventDefault: () => { } });
    expect(wrapper.state('errorMessage'))
      .toEqual('Error: Enter a valid email address');
    done();
  });
  it('should have error message if password is less than 6 characters',
  (done) => {
    const wrapper = component(false);
    const onSubmitClick = mockData.func;
    const button = wrapper.find('#register');
    const username = wrapper.find('#username').simulate('change', {
      target:
      { value: mockData.staticUser[0].username, id: 'username' }
    });
    const email = wrapper.find('#email').simulate('change', {
      target:
      { value: mockData.staticUser[0].email, id: 'email' }
    });
    const password =
      wrapper.find('#password').simulate('change', {
        target:
        { value: 'joe12', id: 'password' }
      });
    const confirmPassword =
      wrapper.find('#confirmPassword').simulate('change', {
        target:
        { value: mockData.staticUser[1].password, id: 'confirmPassword' }
      });
    const phone = wrapper.find('#phone').simulate('change', {
      target:
      { value: mockData.staticUser[0].phone, id: 'phone' }
    });
    button.simulate('click', onSubmitClick());
    wrapper.instance().onSubmitClick({ preventDefault: () => { } });
    expect(wrapper.state('errorMessage'))
      .toEqual('Error: Password should be up to 6 characters long');
    done();
  });
  it('should have error message if password and ' +
    'confirm password fields do not match',
    (done) => {
      const wrapper = component(false);
      const onSubmitClick = mockData.func;
      const button = wrapper.find('#register');
      const username = wrapper.find('#username').simulate('change', {
        target:
        { value: mockData.staticUser[0].username, id: 'username' }
      });
      const email = wrapper.find('#email').simulate('change', {
        target:
        { value: mockData.staticUser[0].email, id: 'email' }
      });
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
      const phone = wrapper.find('#phone').simulate('change', {
        target:
        { value: mockData.staticUser[0].phone, id: 'phone' }
      });
      button.simulate('click', onSubmitClick());
      wrapper.instance().onSubmitClick({ preventDefault: () => { } });
      expect(wrapper.state('errorMessage'))
        .toEqual('Error: Passwords do not match');
      done();
    });
  it('should have button with label "processing" if user ' +
    'supplies correct input and it signup the user',
    (done) => {
      const wrapper = component(true);
      const onSubmitClick = mockData.func;
      const button = wrapper.find('#register');
      const username = wrapper.find('#username').simulate('change', {
        target:
        { value: mockData.staticUser[0].username, id: 'username' }
      });
      const email = wrapper.find('#email').simulate('change', {
        target:
        { value: mockData.staticUser[0].email, id: 'email' }
      });
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
      const phone = wrapper.find('#phone').simulate('change', {
        target:
        { value: mockData.staticUser[0].phone, id: 'phone' }
      });
      button.simulate('click', onSubmitClick());
      wrapper.instance().onSubmitClick({ preventDefault: () => { } });
      expect(wrapper.state('errorMessage')).not
        .toEqual('Error. Passwords do not match');
      expect(wrapper.state('errorMessage')).not
        .toEqual('Error. One or more fields are empty');
      expect(button.props().name).toEqual('Processing...');
      done()
    });
});