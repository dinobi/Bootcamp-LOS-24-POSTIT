import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainHeader // eslint-disable-line no-unused-vars
from '../MainHeader.jsx';
import Icon from '../../../../images/postit-icon.png';
import {
	InputField, // eslint-disable-line no-unused-vars
	Button,	Form, // eslint-disable-line no-unused-vars
	Footer, ErrorAlert // eslint-disable-line no-unused-vars
} from '../../../commonViews';
import { onRequestPassword } from '../../../../actions';
/**
 *
 * @class RequestPassword
 * @extends {React.Component}
 */
class RequestPassword extends React.Component {
	/**
	 * Creates an instance of RequestPassword.
	 * @param {props} props - class properties
	 * @memberof RequestPassword
	 */
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
   * onFocus()
   * This method is called when the user focuses on an input field,
   * which clear any error messages afterwards.
   *
   * @memberof RequestPassword
   * @returns {void}
   */
  onFocus() {
    this.setState({ errorMessage: '' });
  }

	/**
	 * handleRequestPassword
	 * This method is called when a user hits
	 * the request password button
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
      });
    } else {
      this.props.onRequestPassword({ email });
    }
  }
	/**
	 * @returns {jsx} jsx for RequestPassword
	 * @memberof RequestPassword
	 */
  render() {
    const { loader } = this.props;
    return (
			<div>
				<MainHeader />
				<section className="container">
					<Form
						id="auth-form"
						onSubmit={this.handleRequestPassword}
					>
						<a href="/#">
							<img className="form-logo" src={Icon} alt="postit-icon" />
						</a>
						<p className="form-brief">Request for a new password:</p>
						<InputField
							inputClass="input-field"
							onFocus={this.onFocus}
							type="text"
							id="email"
							placeholder="Enter your postit associated email"
							inputRef={(input) => { this.email = input; }}
							label="Email"
						/>
						{
							this.state.errorMessage === '' ? '' :
								<ErrorAlert
									errorMessage=
									{this.state.errorMessage}
								/>
						}
						<Button
							type="submit"
							btnClass="btn btn-login"
							disabled={loader}
							name=
							{
								loader ?
									<p>sending...</p> :
									<p>Send reset link</p>
							}
						/>
					</Form>
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
