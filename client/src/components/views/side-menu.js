import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import { onLogoutUser } from '../../actions';
/**
 *
 *
 * @class SideMenu
 * @extends {React.Component}
 */
class SideMenu extends React.Component {
	/**
	 *
	 *
	 * @returns {*}
	 * @memberof SideMenu
	 */
  render() {
		const { active, back } = this.props;
		const userAuth = localStorage.getItem('userAuth');
		const userData = jwtDecode(userAuth);
		const { email, username, phone } = userData.data;
    return (
      <div className="dashboard-menu">

				<section className="my-tab">
					<h5><i className="fa fa-lock"></i>&nbsp;&nbsp;{ username }</h5>
					<h6><i className="fa fa-asterisk"></i>&nbsp;&nbsp;{email}</h6>
					<h6><i className="fa fa-asterisk"></i>&nbsp;&nbsp;{phone}</h6>
					</section>
					<ul className="menu-nav">
						<li className="dashboard-menu-item">
							<a href="#dashboard"
							className={ active === 'dashboard' ? 'active' : '' }
							>
								<i className="fa fa-home"></i>&nbsp;&nbsp;My Space
							</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#groups"
							className={ active === 'groups' ? 'active' : '' }
							>
								<i className="fa fa-group"></i>&nbsp;&nbsp;My Groups
							</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#search"
							className={ active === 'search' ? 'active' : '' }
							>
								<i className="fa fa-search"></i>&nbsp;&nbsp;Search PostIt
							</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#search-wiki"
							className={ active === 'search-wiki' ? 'active' : '' }
							>
								<i className="fa fa-wikipedia-w"></i>
								&nbsp;&nbsp;Search Wikipedia
							</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#account-details"
							className={ active === 'account-details' ? 'active' : '' }
							>
								<i className="fa fa-cog"></i>&nbsp;&nbsp;Account Details
							</a>
						</li>
						<li className="dashboard-menu-item">
							<a onClick = { this.props.onLogoutUser }>
								<i className="fa fa-sign-out"></i>
								&nbsp;&nbsp;Logout
							</a>
						</li>
						{ back }
					</ul>
				{/* Todo: Add a quick actions window here */}
				<section className="utility">
				<a href="#search"><i className="fa fa-search"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a><i className="fa fa-archive"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a><i className="fa fa-cubes"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="#groups"><i className="fa fa-group"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
				</section>

			</div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ onLogoutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
