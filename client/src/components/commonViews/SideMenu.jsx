import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onLogoutUser } from '../../actions';
import { ListItem } from './'; // eslint-disable-line no-unused-vars

/**
 * SideMenu Component
 * Displays a side menu on the dashboard
 *
 * @method SideMenu
 * @returns {Object} JSX
 * @param {Object} props
 */
const SideMenu = ({ active, user, back, onLogoutUser }) =>
	(<div className="dashboard-menu">
		<section className="my-tab">
			<h5><i className="fa fa-circle">
				</i>&nbsp;&nbsp;{user.username}
			</h5>
			<h6>{user.email}</h6>
		</section>
		<ul className="menu-nav">
			<ListItem
				listClass="dashboard-menu-item"
				anchorClass={active === 'dashboard' ? 'active' : ''}
				iconClass="fa fa-home"
				url="#dashboard"
				name="My Space"
			/>
			<ListItem
				listClass="dashboard-menu-item"
				anchorClass={active === 'groups' ? 'active' : ''}
				iconClass="fa fa-group"
				url="#groups"
				name="My Groups"
			/>
			<ListItem
				listClass="dashboard-menu-item"
				anchorClass={active === 'search-wiki' ? 'active' : ''}
				iconClass="fa fa-wikipedia-w"
				url="#search-wiki"
				name="Search Wikipedia"
			/>
			<ListItem
				listClass="dashboard-menu-item"
				onClick={ onLogoutUser }
				iconClass="fa fa-sign-out"
				name="Logout"
			/>
			{back}
		</ul>
		{/* Todo: Add a quick actions window here */}
		<section className="utility">
			<a href="#search">
				<i className="fa fa-search"></i>
			</a>&nbsp;&nbsp;&nbsp;&nbsp;
			<a>
				<i className="fa fa-archive"></i>
			</a>&nbsp;&nbsp;&nbsp;&nbsp;
			<a>
				<i className="fa fa-cubes"></i>
			</a>&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="#groups">
				<i className="fa fa-group"></i>
			</a>&nbsp;&nbsp;&nbsp;&nbsp;
			</section>

	</div>);

SideMenu.defaultProps = {
  active: '',
  user: {},
  onLogoutUser: () => { }
};
SideMenu.propTypes = {
  active: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  back: PropTypes.object,
  onLogoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ onLogoutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
