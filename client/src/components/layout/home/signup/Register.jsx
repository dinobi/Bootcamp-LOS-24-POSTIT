import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SignupForm
	from './SignupForm.jsx';
import MainHeader
	from '../MainHeader.jsx';
import {
	InputField,
	Button, Footer
} from '../../../commonViews';
import { onSignupUser } from '../../../../actions';

/**
 * Register Page
 *
 * Registers a new user on the application
 *
 * @class Register
 * @extends {React.Component}
 */
export class Register extends React.Component {
	/**
	 * Renders a registration form
	 * @returns {jsx} - jsx for Register component
	 * @memberof Register
	 */
  render() {
    return (
			<div>
				<MainHeader />
				<main className="container">
					<div className="row">
						<div className="col s12 m4 headline">
							<h1 className="heading">Register With PostIt</h1>
							<h6 className="brief">
								PostIt is built to allow family, friends and
								colleagues meetup	in groups to share messages
								in a fun way whenever they want.
							</h6>
							<div className="quick-access">
								<p>Already joined PostIt?&nbsp;&nbsp;
									<a href="#login">Sign in</a>
								</p>
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
  onSignupUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isLoading: state.auth.userIsLoading
});
const mapDispatchToProps = dispatch =>
	bindActionCreators({ onSignupUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
