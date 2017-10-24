import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { MainHeader, Footer } from '../../views';
import onLoginUser from '../../../actions/login-user';
import Icon from '../../../images/postit-icon.png';

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
	/** handleLogin {e} */
	handleLogin(e) {
		e.preventDefault();
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

					<form id="auth-form" onSubmit = { this.handleLogin }>
						<a href="#/">
							<img className="form-logo" src={Icon} alt="postit-icon" />
						</a>
						<p className="form-brief">Login to your postit account:</p>
						<div className="input-field">
							<input
								onFocus = { this.onFocus }
								type="text"
								id="username"
								placeholder="Enter your username or email"
								ref={(input) => { this.username = input; }}
							/>
							<label className="active" htmlFor="username">Username</label>
						</div>
						<div className="input-field">
							<input
								onFocus = { this.onFocus }
								type="password"
								className="validate"
								id="password"
								placeholder="Enter your password"
								ref={(input) => { this.password = input; }}
							/>
							<label className="active" htmlFor="password">Password</label>
						</div>
						{this.state.errorMessage === '' ? '' :
							<p className="alert error-alert">
								<i className="fa fa-exclamation-triangle"></i>
								&nbsp;{this.state.errorMessage}
							</p>
						}
						<button disabled={isLoading} type="submit" className="btn btn-login">Login</button>
						<p className="form-brief">Or login with any of this services:</p>
						<div className="external">
							<div className="row">
								<div className="col s6 md6 google-auth">
									<i className="fa fa-google-plus" />
								</div>
								<div className="col s6 md6 facebook-auth">
									<i className="fa fa-facebook" />
								</div>
							</div>
						</div>
					</form>
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
