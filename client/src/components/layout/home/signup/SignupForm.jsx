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
      errorMessage: ''
    };
    this.onFocus = this.onFocus.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
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
		} = this;
    username = username.value.trim();
    email = email.value.trim();
    password = password.value;
    confirmPassword = confirmPassword.value;
    phone = phone.value.trim();
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
							inputRef = {(input) => { this.username = input; }}
							label = "Username"
						/>
					</div>
					<div className="row">
						<InputField
							inputClass="input-field col s12"
							placeHolder="Enter your email"
							id="email"
							type="email"
							onFocus={this.onFocus}
							inputRef = {(input) => { this.email = input; }}
							label = "Email"
						/>
					</div>
					<div className="row">
						<InputField
							inputClass="input-field col s6"
							placeHolder="Enter a password"
							id="password"
							type="password"
							onFocus={this.onFocus}
							inputRef = {(input) => { this.password = input; }}
							label = "Password"
						/>
						<InputField
							inputClass="input-field col s6"
							placeHolder="Confirm password"
							id="confirm-password"
							type="password"
							onFocus={this.onFocus}
							inputRef={(input) => { this.confirmPassword = input; }}
							label="Confirm Password"
						/>
					</div>
					<div className="row">
						<InputField
							inputClass="input-field col s12"
							placeHolder="Enter your phone"
							id="number"
							type="number"
							onFocus={this.onFocus}
							inputRef={(input) => { this.phone = input; }}
							label="Phone Number"
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
						name="Register"
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
