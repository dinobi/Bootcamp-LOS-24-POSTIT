import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputField, Form } from '../../../commonViews';

class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: ''
		}
		this.onFocus = this.onFocus.bind(this);
		this.onSubmitClick = this.onSubmitClick.bind(this);
	}

	onFocus() {
		this.setState({ errorMessage: '' });
	}

	onSubmitClick(e) {
    e.preventDefault();
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
