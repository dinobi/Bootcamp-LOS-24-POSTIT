import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import MainHeader
	from '../MainHeader.jsx';
import {
	Footer, Form,
	InputField,
	Button, ErrorAlert
} from '../../../commonViews';
import { onLoginUser } from '../../../../actions';
import Icon from '../../../../images/postit-icon.png';

/** Login {component} */
export class Login extends React.Component {
	/**
	 * Creates an instance of Login.
	 *
	 * @param {any} props
	 *
	 * @memberof Login
	 */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      username: '',
      password: '',
      isLoading: false
    };
    this.onFocus = this.onFocus.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
	/**
   * onFocus()
   * This method is called when the user focuses on an input field,
   * which clear any error messages afterwards.
   *
   * @memberof Login
	 *
   * @returns {void}
   */
  onFocus() {
    this.setState({ errorMessage: '' });
  }
	/**
	 * handleChange(event)
   * This method ahndle state changes on an onChange event
	 *
   * @param {object} event - events object parameter
	 *
   * @return {object} newState
   */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
	/**
	 * handleLogin()
	 * This method is called when a user hits the
	 * login button
	 *
	 * @returns {void}
	 *
	 * @param {any} event
	 *
	 * @memberof Login
	 */
  handleLogin(event) {
    event.preventDefault();
    let { username, password } = this.state;
    username = username.trim();
    password = password.trim();
    if (username === '' || password === '') {
      this.setState({
        errorMessage: 'Error: Spaces or blank fields are not allowed'
      });
    } else {
      const loginCreds = { username, password };
      this.props.onLoginUser(loginCreds);
      document.getElementById('auth-form').reset();
    }
  }
	/**
	 * @returns {jsx} react element
	 *
	 * @memberof Login
	 */
  render() {
    const { username, password, errorMessage } = this.state;
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
							label="Username or Email"
							value={username}
							onChange={this.handleChange}
						/>
						<InputField
							inputClass="input-field"
							onFocus={this.onFocus}
							type="password"
							id="password"
							placeholder="Enter your password"
							label="Password"
							value={password}
							onChange={this.handleChange}
						/>
						{
							this.state.errorMessage === '' ? '' :
								<ErrorAlert
									errorMessage=
									{errorMessage}
								/>
						}
						<Button
							id="login"
							disabled={this.props.isLoading}
							type="submit"
							btnClass="btn btn-login"
							name={
								this.props.isLoading ?
									'Login in...' :
									'Login'
							}
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
  isLoading: state.auth.userIsLoading
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ onLoginUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
