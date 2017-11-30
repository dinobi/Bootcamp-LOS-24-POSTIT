/* globals expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../mocks/mockData';
import { SideMenu } from '../../../components/commonViews/SideMenu';

jest.mock('react-router-dom');
jest.unmock('../../../components/commonViews/SideMenu');

describe('<SideMenu/> Component: Given SideMenu component is mounted', () => {
  const props = {
    active: 'groups',
    onLogOutUser: sinon.spy,
    groups: [],
    user: {
      username: '',
      email: ''
    }
  }
  const initialState = { user: [], groups: []};
  const mockStore = configureStore();
  let store;
  let wrapperShallow, wrapperMount;
  const logout = mockData.func;
  const setup = () => shallow(<SideMenu {...props} />)
  beforeEach(() => {
    store = mockStore(initialState);
    wrapperShallow = shallow(<SideMenu {...props} store={store} />);
    // wrapperMount = mount(
    //   <SideMenu {...props} />
    // );
  });

  it('should render components', () => {
    wrapperMount = setup();
    expect(wrapperMount.find('section').exists()).toBe(true);
    expect(wrapperMount.find('li').exists()).toBe(true);
  });

  // it('calls componentDidMount', () => {
  //   sinon.spy(SideMenu.prototype, 'componentDidMount');
  //   const wrapper = mount(<SideMenu {...props} store={store} />);
  //   expect(SideMenu.prototype.componentDidMount.calledOnce).to.equal(true);
  // });

  // it('should render connected component properly', () => {
  //   expect(wrapperShallow.length).toBe(1);
  // });
});