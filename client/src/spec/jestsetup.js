import Enzyme, { shallow, render, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import jwt from 'jsonwebtoken';
import localStorage from 'mock-local-storage'
import jquery from 'jquery/dist/jquery';
// React 15 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

global.window = {}

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
global.$ = jquery;
$.prototype.tooltip = () => { };
$.prototype.collapsible = () => { };
$.prototype.dropdown = () => { };
$.prototype.sideNav = () => { };




// Mock browser api and make it available in all test files without importing

const localStorageMock = {
  getItem: function (key) {
    return this[key];
  },
  setItem: function (key, value) {
      this[key] = value;
  },
  removeItem: function (key) {
      delete this[key];
  },
  clear: function (key, value) {
    delete this[key];
  }
};
global.localStorage = localStorageMock;


