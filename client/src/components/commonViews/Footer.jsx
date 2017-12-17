import React from 'react';

/**
 * Footer Component
 * Displays page footer where required
 *
 * @method Footer
 *
 * @returns {Object} JSX
 */
const Footer = () =>
	<footer className="container page-footer">
		<div className="divider"></div>
		<ul className="right">
			<li>
				<a href="api-docs">
					<i className="fa fa-file-code-o"></i>&nbsp;&nbsp;
					<span>api docs</span>
				</a>
			</li>
			<li>
				<a href="https://github.com/dinobi/Bootcamp-LOS-24-POSTIT">
					<i className="fa fa-github"></i>&nbsp;&nbsp;
					<span>github</span>
				</a>
			</li>
		</ul>
		<div className="copyright left">
			<small>&copy;Bootcamp24, Andela Nigeria. All rights reserved.</small>
		</div>
	</footer>;

export default Footer;
