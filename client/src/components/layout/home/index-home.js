import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MainHeader, Footer } from '../../views';
import * as actionCreators from '../../../actions';

import LandingImg from '../../../images/postit-landing.png';

class IndexHome extends React.Component {
  constructor (props) {
    super(props);
  }
/**
 * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
 * 
 * @param {component} <MainHeader/> - The landing page main header navigation.
 * @param {component} <Footer/> - The landing page footer navigation.
 */
  render() {
    return (
      <div>
        <MainHeader />
        <main className="container">
          <div className="row">
            <div className="col s12 m6 headline">
              <h1 className="heading">Communicate Group Messages Instantly</h1>
              <h6 className="brief">
                PostIt is built to allow family, friends and colleagues meetup
                in groups to share messages in a fun way whenever they want.
              </h6>
              <div className="quick-access">
                <a href="#register">
                  <button className="btn btn-create">Create an account</button>
                </a>
                <p>Already joined PostIt? <a href="#login">Sign in</a></p>
              </div>
            </div>
            <div className="col s12 m6" id="landing-image">
              <img src={LandingImg} alt="postit-landing-img" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authMessage: state.auth.message,
    groups: state.groups,
    search: state.search,
    messages: state.messages,
    users: state.users,
    members: state.members
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexHome);
