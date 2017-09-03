import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onLoginUser from '../../../actions';
import api from '../../helpers/api';
import Icon from '../../../images/postit-icon.png';


class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			hasErrored: false,
			errorMessage: '',
			success: false,
			successMessage: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleChange(e) {
		this.setState({
			username: this.refs.username.value,
			password: this.refs.password.value
		})
	}
	handleLogin(e) {
		e.preventDefault();
		console.log('state: ', this.state);
		let { username, password } = this.state;
		if (username !== '' || password !== '') {
			const userData = `username=${username}&password=${password}`;
			api(userData, 'api/user/signin', 'POST').then((res) => {
				if (res.error === undefined) {
					const loginRes = () => this.props.handleLogin(JSON.stringify(res));
					sessionStorage.setItem('user', loginRes);
					this.setState({ 
						success: true,
						successMessage: loginRes.message
					});
					location.hash = '#dashboard';
				} else {
					this.setState({
						hasErrored: true,
						errorMessage: res.error.message
					});
				}
			});
		} else {
			this.setState({
				hasErrored: true,
				errorMessage: 'Login error. One or more fields are empty' });
		}
	}

  render() {
    return (
      <section className="container">

				<form id="auth-form" onSubmit={ this.handleSubmit }>
					<a href="#/">
						<img className="form-logo" src={Icon} alt="postit-icon" />
					</a>
					<p className="form-brief">Login to your postit account:</p>
					<div className="input-field">
						<input
							type="text"
							id="username"
							placeholder="Enter your username or email"
							ref="username"
							value={ this.state.username }
							onChange={ this.handleChange }
						/>
						<label className="active" htmlFor="username">Username</label>
					</div>
					<div className="input-field">
						<input
							type="password"
							className="validate"
							id="password"
							placeholder="Enter your password"
							ref="password"
							value={ this.state.password }
							onChange={ this.handleChange }
						/>
						<label className="active" htmlFor="password">Password</label>
					</div>
					{this.state.hasErrored ?
						<p class="alert error-alert">
							<i className="fa fa-exclamation-triangle"></i>
							&nbsp;{this.state.errorMessage}
						</p> : ''
					}
					{this.state.success ?
						<p class="alert success-alert">{this.state.successMessage}</p> : ''
					}
					<button type="submit" className="btn btn-login" onClick={ this.handleLogin }>Submit</button>
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
							<a href="#reset-password">
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: user => dispatch(onLoginUser(user))
  };
};

export default connect(null, mapDispatchToProps)(Login);
