import React from 'react';
import Icon from "../../../images/postit-icon.png";
import { MainHeader, Footer } from '../../views';

class RequestPassword extends React.Component {
/**
 * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
 */
  render() {
    return (
			<div>
				<MainHeader />
					<section className="container">
						<form id="auth-form">
							<a href="/#">
								<img className="form-logo" src={Icon} alt="postit-icon" />
							</a>
							<p className="form-brief">Request for a new your password:</p>
							<div className="input-field">
								<input
									type="text"
									id="email"
									placeholder="Enter your postit associated email "
								/>
								<label className="active" htmlFor="email">Email:</label>
							</div>
							<button type="submit" className="btn btn-login">Send reset link</button>
						</form>
					</section>
				<Footer />
			</div>
    );
  }
}

export default RequestPassword;
