import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onLogoutUser } from '../../actions';
import { ListItem } from './';
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
		const { email, username } = this.props.user;
    return (
      <div className="dashboard-menu">

				<section className="my-tab">
					<h5><i className="fa fa-circle"></i>&nbsp;&nbsp;{ username }</h5>
					<h6>{email}</h6>
					</section>
					<ul className="menu-nav">
						<ListItem
							listClass="dashboard-menu-item"
							anchorClass={ active === 'dashboard' ? 'active' : '' }
							iconClass="fa fa-home"
							url="#dashboard"
							name="My Space"
						/>
						<ListItem
							listClass="dashboard-menu-item"
							anchorClass={ active === 'groups' ? 'active' : '' }
							iconClass="fa fa-group"
							url="#groups"
							name="My Groups"
						/>
						<ListItem
							listClass="dashboard-menu-item"
							anchorClass={ active === 'search-wiki' ? 'active' : '' }
							iconClass="fa fa-wikipedia-w"
							url="#search-wiki"
							name="Search Wikipedia"
						/>
						<ListItem
							listClass="dashboard-menu-item"
							anchorClass={ active === 'account-details' ? 'active' : '' }
							iconClass="fa fa-cog"
							url="#account-details"
							name="Account Details"
						/>
						<ListItem
							listClass="dashboard-menu-item"
							onClick = { this.props.onLogoutUser }
							iconClass="fa fa-sign-out"
							name="Logout"
						/>
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
	user: state.auth.user
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ onLogoutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
