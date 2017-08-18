import React from "react";
import Icon from "../../../images/postit-icon.png";

class ResetPassword extends React.Component {
/**
 * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
 */
  render() {
    return (
      <section className="container">

				<form id="auth-form">
					<a href="#/">
						<img className="form-logo" src={Icon} alt="postit-icon" />
					</a>
					<p className="form-brief">Reset your password:</p>
					<div className="input-field">
						<input
							type="text"
							id="email"
							placeholder="Enter your postit associated email "
						/>
						<label className="active" htmlFor="username">Email:</label>
					</div>
					<button type="submit" className="btn btn-login">Send reset link</button>
				</form>

      </section>
    );
  }
}

export default ResetPassword;
