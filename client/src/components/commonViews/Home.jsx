import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainHeader // eslint-disable-line no-unused-vars
  from '../layout/home/MainHeader.jsx';
import {
  Footer, Button // eslint-disable-line no-unused-vars
} from '../commonViews';
import LandingImg from '../../images/postit-landing.png';

/**
 * Home Component
 * Displays a landing page with information based on
 * a users authentication status
 *
 * @method Home
 * @returns {Object} JSX
 * @param {Object} props
 */
const Home = ({ isAuthenticated }) =>
  <div>
    <MainHeader />
    <main className="container">
      <div className="row">
        <div className="col s12 m6 headline">
          {
            isAuthenticated ?
              <div className="get-started">
                <h1 className="heading">Get Started Guide</h1>
                <h6 className="brief">1. Go to your personal dashboard </h6>
                <h6 className="brief"> 2. Create a new group </h6>
                <h6 className="brief">
                  3. Search and add members to your new group
                </h6>
                <h6 className="brief">
                  4. Post and receive broadcast right inside the
                    group message board. Want extra?&nbsp;&nbsp;
                    <i className="fa fa-level-down amber-text"></i>
                </h6>
                <h6 className="brief">
                  5. Search wikipedia and be sure of what
                    you post to your group
                </h6>
              </div>
              :
              <div>
                <h1 className="heading">
                  Communicate Group Messages Instantly
                </h1>
                <h6 className="brief">
                  PostIt is built to allow family, friends and colleagues meetup
                in groups to share messages in a fun way whenever they want.
              </h6>
                <div className="quick-access">
                  <Link to="register">
                    <Button
                      btnClass="btn btn-create"
                      name="Create an account"
                    />
                  </Link>
                  <p>Already joined PostIt? <a href="#login">Sign in</a></p>
                </div>
              </div>
          }
        </div>
        <div className="col s12 m6" id="landing-image">
          <img src={LandingImg} alt="postit-landing-img" />
        </div>
      </div>
    </main>
    <Footer />
  </div>;

Home.defaultProps = {
  isAuthenticated: false,
};
Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.userIsAuthenticated,
});

export default connect(mapStateToProps)(Home);
