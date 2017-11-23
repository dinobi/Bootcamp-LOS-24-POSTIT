import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import MainHeader // eslint-disable-line no-unused-vars
	from '../MainHeader.jsx';
import {
	Footer, Form, // eslint-disable-line no-unused-vars
	InputField, // eslint-disable-line no-unused-vars
	Button, ErrorAlert // eslint-disable-line no-unused-vars
} from '../../../commonViews';
import { onLoginUser } from '../../../../actions';
import Icon from '../../../../images/postit-icon.png';

/** Login {component} */
class Login extends React.Component {
	/**
	 * Creates an instance of Login.
	 * @param {any} props
	 * @memberof Login
	 */
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
	/**
   * onFocus()
   * This method is called when the user focuses on an input field,
   * which clear any error messages afterwards.
   *
   * @memberof Login
   * @returns {void}
   */
  onFocus() {
    this.setState({ errorMessage: '' });
  }
	/**
	 * handleLogin()
	 * This method is called when a user hits the
	 * login button
	 *
	 * @returns {void}
	 * @param {any} event
	 * @memberof Login
	 */
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
	/**
	 * @returns {jsx} react element
	 *
	 * @memberof Login
	 */
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
						onSubmit={this.handleLogin}
					>
						<a href="#/">
							<img className="form-logo" src={Icon} alt="postit-icon" />
						</a>
						<p className="form-brief">Login</p>
						<InputField
							inputClass="input-field"
							onFocus={this.onFocus}
							type="text"
							id="username"
							placeholder="Enter your username or email"
							inputRef={(input) => { this.username = input; }}
							label="Username or Email"
						/>
						<InputField
							inputClass="input-field"
							onFocus={this.onFocus}
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
									{errorMessage}
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
};

const mapStateToProps = state => ({
  userData: state.auth.userData,
  message: state.auth.message
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ onLoginUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
