import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
	MainHeader, Footer, Form,
	InputField, Button, ErrorAlert
} from '../../../commonViews';
import { onLoginUser } from '../../../../actions';
import Icon from '../../../../images/postit-icon.png';

/** Login {component} */
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			logoutMessage: '',
			errorMessage: '',
			isLoading: false
		};
		this.onFocus = this.onFocus.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	onFocus() {
		this.setState({ errorMessage: '' });
	}
	/** handleLogin {event} */
	handleLogin(event) {
		event.preventDefault();
		let { username, password } = this;
    username = username.value.trim();
    password = password.value.trim();
		 if (username === '' || password === '') {
			this.setState({ errorMessage: 'Error. One or more fields are empty' });
    } else {
			const loginCreds = { username, password };
			this.props.onLoginUser(loginCreds);
      
		}
	}

  render() {
		if (localStorage.getItem('userAuth') !== null) {
			location.hash = '#dashboard';
			return null;
		}
		const { errorMessage, isLoading } = this.state;
    return (
			<div>
				<MainHeader />
				<section className="container">
					<Form
						id="auth-form"
						onSubmit={ this.handleLogin }
					>
						<a href="#/">
							<img className="form-logo" src={Icon} alt="postit-icon" />
						</a>
						<p className="form-brief">Login</p>
						<InputField
							inputClass="input-field"
							onFocus = { this.onFocus }
							type="text"
							id="username"
							placeholder="Enter your username or email"
							inputRef={(input) => { this.username = input; }}
							label="Username"
						/>
						<InputField
							inputClass="input-field"
							onFocus = { this.onFocus }
							type="password"
							id="password"
							placeholder="Enter your password"
							inputRef={(input) => { this.password = input; }}
							label="Password"
						/>
						{
							this.state.errorMessage === '' ? '' :
							<ErrorAlert
								errorMessage=
								{this.state.errorMessage}
							/>
						}
						<Button
							disabled={isLoading}
							type="submit"
							btnClass="btn btn-login"
							name="Login"
						/>
					</Form>
					<section className="external">
						<div className="row">
							<div className="col s6 md6">
								<a href="#request-password">
									<i className="material-icons">memory</i>Forgot your password?
								</a>
							</div>
							<div className="col s6 md6">
								<a href="#register">
									<i className="material-icons">lock</i>Don't have an account?
								</a>
							</div>
						</div>
					</section>

				</section>
				<Footer />
			</div>
    );
  }
}

Login.propTypes = {
  onLoginUser: PropTypes.func.isRequired
  // addToastMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userData: state.auth.userData,
  message: state.auth.message
});

const mapDispatchToProps = dispatch => bindActionCreators({ onLoginUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
