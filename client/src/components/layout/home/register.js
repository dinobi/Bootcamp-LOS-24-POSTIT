import React from 'react';
import { MainHeader, Footer } from '../../views';

class Register extends React.Component {
  render() {
    return (
      <div>
        <MainHeader/>
        <main className="container">
          <div className="row">
			      <div className="col s12 m4 headline">
							<h1 className="heading">Register with PostIt</h1>
							<h6 className="brief">
								PostIt is built to allow family, friends and colleagues meetup in groups to share messages in a fun way whenever they want.
							</h6>
							<div className="quick-access">
								<p>Already joined PostIt? <a href="#login">Sign in</a></p>
							</div>
					  </div>
						<div className="col s12 m8">			
							<form id="signup-form">
							<div className="row">
								<div className="input-field col s6">
								<input placeholder="Enter your first name" id="first_name" type="text" className="validate"/>
								<label className="active" htmlFor="first_name">First Name</label>
								</div>
								<div className="input-field col s6">
								<input placeholder="Enter your last name" id="last_name" type="text" className="validate"/>
								<label className="active" htmlFor="last_name">Last Name</label>
								</div>
							</div>
						<div className="row">
							<div className="input-field col s12">
							<input placeholder="Enter a user name" id="username" type="text" className="validate"/>
							<label className="active" htmlFor="username">Username</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input placeholder="Enter your email" id="email" type="email" className="validate"/>
							<label className="active" htmlFor="email">Email</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s6">
							<input placeholder="Enter a password" id="password" type="password" className="validate"/>
							<label className="active" htmlFor="password">Password</label>
							</div>
							<div className="input-field col s6">
							<input placeholder="Enter your phone" id="phone-number" type="number" className="validate"/>
							<label className="active" htmlFor="phone-number">Phone Number</label>
							</div>
						</div>
						<button type="submit" className="btn btn-create">Submit</button>
						</form>
					</div>
					</div>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default Register;