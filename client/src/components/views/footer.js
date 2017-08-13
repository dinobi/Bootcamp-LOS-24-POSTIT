import React from 'react';

class Footer extends React.Component {
	render() {
		return (
		<footer className="container page-footer">				
			<div className="divider"></div>
			<ul className="right">
				<li>
					<a href="#google-plus">
						<i className="fa fa-google-plus"></i>
					</a>
				</li>					
				<li>
					<a href="https://github.com/dinobi/Bootcamp-LOS-24-POSTIT">
					  <i className="fa fa-github"></i>
					</a>
				</li>
				<li>
					<a href="#facebook">
						<i className="fa fa-facebook"></i>
					</a>
				</li>
				<li>
					<a href="#twitter">
						<i className="fa fa-twitter"></i>
					</a>
				</li>
			</ul>
			<div className="copyright left">
				<small>&copy;Bootcamp24, Andela Nigeria. All rights reserved.</small>
			</div>
			</footer>
		);
  }
}

export default Footer;

