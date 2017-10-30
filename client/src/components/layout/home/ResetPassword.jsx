import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from '../../../images/postit-icon.png';
import { MainHeader, Footer } from '../../views';
import { onResetPassword } from '../../../actions';
/**
 *
 * @class ResetPassword
 * @extends {React.Component}
 */
class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: '',
		};
		this.onFocus = this.onFocus.bind(this);
		this.handleResetPassword = this.handleResetPassword.bind(this);
	}
	/**
  * Reset app state on focus
  * @memberof ResetPassword
  * @returns {Object} - default state
  */
	onFocus() {
		this.setState({ errorMessage: '' });
	}
	/**
	 * 
	 *
	 * @param {any} event
	 * @memberof ResetPassword
	 * @returns {*} - New State object and actions
	 */
	handleResetPassword(event) {
		event.preventDefault();
		let { password, confirmPassword } = this;
		password = password.value.trim();
		confirmPassword = confirmPassword.value.trim();
		if (password === '' || confirmPassword === '') {
			return this.setState({
				errorMessage: 'Error. All fields are required'
			});
		}
		else if (password !== confirmPassword) {
			this.setState({
				errorMessage: 'Error. Password do not match'
			});
		} else {
			this.props.onResetPassword({ password });
		}
		this.refs.resetPasswordForm.reset();
	}
	/**
	 *
	 * @memberof ResetPassword
	 * @returns {*} react elements
	 */
  render() {
		const { loader } = this.props;
    return (
			<div>
				<MainHeader />
					<section className="container">
						<form id="auth-form"
							ref="resetPasswordForm"
							onSubmit = { this.handleResetPassword }>
							<a href="/#">
								<img className="form-logo" src={Icon} alt="postit-icon" />
							</a>
							<p className="form-brief">Reset your password:</p>
							<div className="input-field">
								<input
									onFocus = { this.onFocus }
									type="password"
									className="validate"
									id="password"
									placeholder="Enter new password"
									ref={(input) => { this.password = input; }}
								/>
								<label className="active" htmlFor="password">Password:</label>
							</div>
              <div className="input-field">
								<input
									onFocus = { this.onFocus }
									type="password"
									className="validate"
									id="confirm-password"
									placeholder="Confirm password"
									ref={(input) => { this.confirmPassword = input; }}
								/>
								<label className="active" htmlFor="confirm-password">Confirm password:</label>
							</div>
							{
								this.state.errorMessage === '' ? '' :
								<p className="alert error-alert">
									<i className="fa fa-exclamation-triangle"></i>
									&nbsp;{this.state.errorMessage}
								</p>
							}
							<button type="submit" className="btn btn-login" disabled={ loader }>
								{
									loader ?
									<p>processing...</p> :
									<p>Reset</p>
								}
							</button>
						</form>
					</section>
				<Footer />
			</div>
    );
  }
}

ResetPassword.propTypes = {
  onResetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loader: state.changePassword.passwordResetIsLoading
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ onResetPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
