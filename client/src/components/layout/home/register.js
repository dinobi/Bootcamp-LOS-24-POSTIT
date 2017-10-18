import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { MainHeader, Footer, SignupForm } from '../../views';
import onSignupUser from '../../../actions/signup-user';
import onLoginUser from '../../../actions/login-user';
/**
 * Registers a new user
 * @class Register
 * @extends {React.Component}
 */
class Register extends React.Component {
/**
 * Renders a registration form
 * @returns {*} - react component
 * @memberof Register
 */
  render() {
		// const { onSignupUser, message } = this.props;
    return (
      <div>
				<MainHeader />
				<main className="container">
					<div className="row">
						<div className="col s12 m4 headline">
							<h1 className="heading">Register With PostIt</h1>
							<h6 className="brief">
								PostIt is built to allow family, friends and colleagues meetup
								in groups to share messages in a fun way whenever they want.
							</h6>
							<div className="quick-access">
								<p>Already joined PostIt? <a href="#login">Sign in</a></p>
							</div>
						</div>
						<div className="col s12 m8">
							<SignupForm {...this.props} />
						</div>
					</div>
				</main>
				<Footer />
      </div>
    );
  }
}

Register.propTypes = {
	onSignupUser: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({ onSignupUser, onLoginUser }, dispatch);

export default connect(null, mapDispatchToProps)(Register);
