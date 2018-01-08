/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import mockedStore from '../../../mockedStore';
import MessageLog
  from '../../../../components/layout/dashboard/messages/MessageLog';

let tree;
let wrapper;

/**
 * component function
 * creates a setup for AddMember component
 *
 * @return {function} shallow -
 * renders a component one level deep
 */
const component = (id, priority='normal') => {
  let props = {
    message: {
      id,
      message: 'hey guys',
      fromUser: 'enodi',
      toGroup: 'rainier team',
      priority,
      createdAt: '2017-11-23T22:37:11.129Z'
    }
  };
  return shallow(<MessageLog {...props} />);
}
describe('<MessageLog />: When MessageLog component is mounted',
() => {
  it('should render self as expected', (done) => {
    wrapper = component(1, 'normal');
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('span').text()).toEqual('normal');
    expect(wrapper.length).toBe(1);
    done()
  });
  it('should show priority tag "urgent" for urgent messages', (done) => {
    wrapper = component(2, 'urgent');
    expect(wrapper.find('span').text()).toEqual('urgent');
    done()
  });
  it('should show priority tag "critical" for critical messages', (done) => {
    wrapper = component(3, 'critical');
    expect(wrapper.find('span').text()).toEqual('critical');
    done()
  });
});