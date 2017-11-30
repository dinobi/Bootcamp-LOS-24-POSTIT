import React from 'react';
import PropTypes from 'prop-types';
import {
	Button, InputField, Form // eslint-disable-line no-unused-vars
} from '../../../commonViews';
/**
 *
 *
 * @class SignupForm
 * @extends {React.Component}
 */
class SignupForm extends React.Component {
	/**
	 * Creates an instance of SignupForm.
	 * @param {props} props - class properties
	 * @memberof SignupForm
	 */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    };
    this.onFocus = this.onFocus.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
	/**
   * onFocus()
   * This method is called when the user focuses on an input field,
   * which clear any error messages afterwards.
   *
   * @memberof SignupForm
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
   * @return {object} newState
   */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
	/**
	 * onSubmitClick()
	 * This method is called when a user
	 * hits the register button after filling
	 * the signup form
	 *
	 * @returns {void}
	 * @param {any} event
	 * @memberof SignupForm
	 */
  onSubmitClick(event) {
    event.preventDefault();
    let {
			username, email, password,
			confirmPassword, phone
		} = this.state;
    username = username.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();
    phone = phone.trim();
    if (
			username === '' ||
			email === '' ||
			password === '' ||
			confirmPassword === '' ||
			phone === '') {
      this.setState({ errorMessage: 'Error. One or more fields are empty' });
    } else if (password !== confirmPassword) {
      this.setState({ errorMessage: 'Error. Passwords do not match' });
    } else {
        // collect user input
      const userData = { username, email, password, phone };
        // call the signup form action
      this.props.onSignupUser(userData);
    }
  }
	/**
	 * @returns {jsx} jsx for SignupForm
	 * @memberof SignupForm
	 */
  render() {
    const {
			username, email,
			password, confirmPassword,
			phone } = this.state;
    return (
      <div>
				<Form
				id="signup-form"
				onSubmit={this.onSubmitClick}
				>
					<div className="row">
					<InputField
							inputClass="input-field col s12"
							placeHolder="Enter a user name"
							id="username"
							type="text"
							onFocus={this.onFocus}
							label = "Username"
							value={username}
							onChange={this.handleChange}
						/>
					</div>
					<div className="row">
						<InputField
							inputClass="input-field col s12"
							placeHolder="Enter your email"
							id="email"
							type="email"
							onFocus={this.onFocus}
							label = "Email"
							value={email}
							onChange={this.handleChange}
						/>
					</div>
					<div className="row">
						<InputField
							inputClass="input-field col s6"
							placeHolder="Enter a password"
							id="password"
							type="password"
							onFocus={this.onFocus}
							label = "Password"
							value={password}
							onChange={this.handleChange}
						/>
						<InputField
							inputClass="input-field col s6"
							placeHolder="Confirm password"
							id="confirmPassword"
							type="password"
							onFocus={this.onFocus}
							label="ConfirmPassword"
							value={confirmPassword}
							onChange={this.handleChange}
						/>
					</div>
					<div className="row">
						<InputField
							inputClass="input-field col s12"
							placeHolder="Enter your phone"
							id="phone"
							type="number"
							onFocus={this.onFocus}
							label="Phone Number"
							value={phone}
							onChange={this.handleChange}
						/>
					</div>
					{ this.state.errorMessage === '' ? '' :
						<p className="alert error-alert">
							<i className="fa fa-exclamation-triangle"></i>
							&nbsp;{this.state.errorMessage}
						</p>
					}
					<Button
						id="register"
						name={
							this.props.isLoading ?
							'Processing...' :
							'Register'
						}
						type="submit"
						btnClass="btn btn-create"
						disable={ this.props.isLoading }
					/>
				</Form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  onSignupUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default SignupForm;
