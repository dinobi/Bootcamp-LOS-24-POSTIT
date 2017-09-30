import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: '',
      isLoading: false,
		}
		this.onFocus = this.onFocus.bind(this);
		this.onSubmitClick = this.onSubmitClick.bind(this);
	}

	onFocus() {
		this.setState({ errorMessage: ''});
	}

	onSubmitClick(e) {
    e.preventDefault();
    console.log(this.props);
		this.firstname = firstname.value.trim();
		this.lastname = lastname.value.trim();
		this.username = username.value.trim();
		this.email = email.value.trim();
		this.password = password.value.trim();
		this.phone = phone.value.trim();
		if (
			firstname === '' ||
			lastname === '' ||
			username === '' ||
			email === '' ||
			password === '' ||
			phone === '') {
			this.setState({ errorMessage: 'Error. One or more fields are empty' });
			} else {
        // collect user input
        const userData = { firstname, lastname, username, email, password, phone };
        // call the signup form action
				this.props.onSignupUser(userData);
				this.refs.signupForm.reset();
			}
	}

  render() {
    return (
      <div>
				<form ref="signupForm" id="signup-form" onSubmit = { this.onSubmitClick }>
					<div className="row">
						<div className="input-field col s6">
							<input
								onFocus = { this.onFocus }
								placeholder="Enter your first name"
								id="firstname"
								type="text"
								className="validate"
								ref = {(input) => { this.firstname = input; }}
							/>
							<label className="active" htmlFor="firstname">
								First Name
							</label>
						</div>
						<div className="input-field col s6">
							<input
								onFocus = { this.onFocus }
								placeholder="Enter your last name"
								id="lastname"
								type="text"
								className="validate"
								ref = {(input) => { this.lastname = input; }}
							/>
							<label className="active" htmlFor="lastname">
								Last Name
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								onFocus = { this.onFocus }
								placeholder="Enter a user name"
								id="username"
								type="text"
								className="validate"
								ref = {(input) => { this.username = input; }}
							/>
							<label className="active" htmlFor="username">
								Username
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								onFocus = { this.onFocus }
								placeholder="Enter your email"
								id="email"
								type="email"
								className="validate"
								ref = {(input) => { this.email = input; }}
							/>
							<label className="active" htmlFor="email">Email</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6">
							<input
								onFocus = { this.onFocus }
								placeholder="Enter a password"
								id="password"
								type="password"
								className="validate"
								ref = {(input) => { this.password = input; }}
							/>
							<label className="active" htmlFor="password">
								Password
							</label>
						</div>
						<div className="input-field col s6">
							<input
								onFocus = { this.onFocus }
								placeholder="Enter your phone"
								id="phone"
								type="number"
								className="validate"
								ref = {(input) => { this.phone = input; }}
							/>
							<label className="active" htmlFor="phone">
								Phone Number
							</label>
						</div>
					</div>
					{ this.state.errorMessage === '' ? '' :
						<p className="alert error-alert">
							<i className="fa fa-exclamation-triangle"></i>
							&nbsp;{this.state.errorMessage}
						</p>
					}
					<button id="register"
						type="submit"
						className="btn btn-create">Register
					</button>
				</form>
      </div>
    );
  }
}

// SignupForm.propTypes = {
//   onSignupUser: PropTypes.func.isRequired
// };

export default SignupForm;
