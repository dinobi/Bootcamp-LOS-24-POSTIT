import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { MainHeader, Footer } from '../../views';
import { SignupForm } from '../../views';
import onSignupUser from '../../../actions/signup-user';
import onLoginUser from '../../../actions/login-user';

class Register extends React.Component {

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

// Register.propTypes = {
// 	onSignupUser: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
	message: state.signup
})

const mapDispatchToProps = dispatch =>
	bindActionCreators({ onSignupUser, onLoginUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
