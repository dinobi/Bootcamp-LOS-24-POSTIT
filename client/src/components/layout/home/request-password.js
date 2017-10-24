import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from '../../../images/postit-icon.png';
import { MainHeader, Footer } from '../../views';
import { onRequestPassword } from '../../../actions';

class RequestPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: '',
			isLoading: false
		};
		this.onFocus = this.onFocus.bind(this);
		this.handleRequestPassword = this.handleRequestPassword.bind(this);
	}
  /**
  * Reset app state on focus
  * @memberof RequestPassword
  * @returns {Object} - default state
  */
	onFocus() {
		this.setState({ errorMessage: '' });
	}

	/**
	 * 
	 *
	 * @param {any} event
	 * @memberof RequestPassword
	 * @returns {*} - New State object and actions
	 */
	handleRequestPassword(event) {
		event.preventDefault();
		let { email } = this;
		email = email.value.trim();
		if (email === '') {
			this.setState({
				errorMessage: 'Error. email is required'
			})
		} else {
			this.props.onRequestPassword({ email });
		}

	}
  render() {
		const { loader } = this.props;
    return (
			<div>
				<MainHeader />
					<section className="container">
						<form id="auth-form" onSubmit = { this.handleRequestPassword }>
							<a href="/#">
								<img className="form-logo" src={Icon} alt="postit-icon" />
							</a>
							<p className="form-brief">Request for a new your password:</p>
							<div className="input-field">
								<input
									onFocus = { this.onFocus }
									type="text"
									id="email"
									placeholder="Enter your postit associated email "
									ref={(input) => { this.email = input; }}
								/>
								<label className="active" htmlFor="email">Email:</label>
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
									<p>sending...</p> :
									<p>Send reset link</p>
								}
							</button>
						</form>
					</section>
				<Footer />
			</div>
    );
  }
}

RequestPassword.propTypes = {
  onRequestPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loader: state.changePassword.passwordRequestIsLoading
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ onRequestPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequestPassword);
