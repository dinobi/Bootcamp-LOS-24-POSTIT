/* globals expect */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import SearchWiki
  from '../../../../components/layout/dashboard/search/SearchWiki';

let wrapper;

/**
 * component function
 * creates a setup for SearchWiki component
 *
 * @return {function} shallow -
 * renders a component one level deep
 */
const component = () => {
  return shallow(<SearchWiki />);
}
describe('<SearchWiki />: When SearchWiki component is mounted',
  () => {
    it('should render self as expected', (done) => {
      wrapper = component();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.length).toBe(1);
      done()
    });
    it('should render children as expected', (done) => {
      const wrapper = component()
      expect(wrapper.find('DashboardContent').length).toBe(1);
      expect(wrapper.find('Form').length).toBe(1);
      expect(wrapper.find('SearchBox').length).toBe(1);
      done()
    });
    it('should have a handleSearch method that performs a search action', (done) => {
      const wrapper = component();
      const handleSearchSpy = jest.spyOn(wrapper.instance(), 'handleSearch')
      wrapper.instance().handleSearch({ preventDefault: () => { } })
      expect(handleSearchSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });