import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkAuthUser from '../helpers/checkAuthUser';
import { onLogoutUser, onLoadGroups } from '../../actions';
import { ListItem, IconButton } from './'; // eslint-disable-line no-unused-vars
/**
 * SideMenu component
 * Shows a side menu navigation on the dashboard
 *
 * @class SideMenu
 * @extends {React.Component}
 */
export class SideMenu extends React.Component {
	/**
	 * Creates an instance of SideMenu.
	 * @param {any} props
	 * @memberof SideMenu
	 */
  constructor(props) {
    super(props);
    this.state = {};
  }
	/**
	 * @returns {void}
   * @memberof SideMenu
   * */
  componentWillMount() {
    // const token = localStorage.getItem('userAuth');
    // if (checkAuthUser(token) === 'invalid') {
    //   localStorage.clear();
    //   location.hash = '#login';
    //   return;
    // }
    this.props.onLoadGroups();
  }
	/**
	 * @returns {jsx} jsx component for side menu
	 * @memberof SideMenu
	 */
  render() {
    const { active, back, toggle, groups } = this.props;
    const { email, username } = this.props.user;
    return (
			<div className="dashboard-menu">
				<section className="my-tab">
					<h5><i className="fa fa-circle">
						</i>&nbsp;&nbsp;{username}
					</h5>
					<h6>{email}</h6>
				</section>
				<ul className="menu-nav">
					<ListItem
						listClass="dashboard-menu-item"
						anchorClass={active === 'dashboard' ? 'active' : ''}
						iconClass="fa fa-home side-icon"
						url="#dashboard"
						name="My Space"
					/>
					<ListItem
						listClass="dashboard-menu-item"
						anchorClass={active === 'groups' ? 'active' : ''}
						iconClass={toggle}
						url="#groups"
						name="Groups Control"
					/>
					<ListItem
						listClass="dashboard-menu-item"
						anchorClass={active === 'search-wiki' ? 'active' : ''}
						iconClass="fa fa-wikipedia-w side-icon"
						url="#search-wiki"
						name="Search Wikipedia"
					/>
					{back}
					<ul class="collapsible active-group" data-collapsible="accordion">
						<li>
							<div className="collapsible-header">
								<i className="fa fa-plug"></i>
								Active Groups
							</div>
							{
								groups.length > 0 ?
								groups.map(group =>
									<div className="collapsible-body" key={group.id}>
										<a href={`#groups/${group.groupname}`}>
											<i className="fa fa-folder"></i>
											&nbsp;&nbsp;{group.groupname}
										</a>
									</div>
								) :
								<div className="collapsible-body"><span>None</span></div>
							}
						</li>
					</ul>
				</ul>
				<section className="utility">
					<a className="dropdown-button" data-activates='more-menu'>
						<i className="fa fa-gear"></i>
					</a>&nbsp;&nbsp;&nbsp;&nbsp;
						<ul id='more-menu' class='dropdown-content'>
							<li><a href="#groups">Groups Control</a></li>
							<li className="divider"></li>
							<li>
								<a id="logout" onClick={this.props.onLogoutUser}>Logout</a>
							</li>
						</ul>
					</section>

			</div>
    );
  }
}

SideMenu.defaultProps = {
  active: '',
  user: {},
  toggle: '',
  onLoadGroups: () => { },
  onLogoutUser: () => { }
};
SideMenu.propTypes = {
  active: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  toggle: PropTypes.string.isRequired,
  back: PropTypes.object
};

const mapDispatchToProps = dispatch =>
bindActionCreators({ onLogoutUser, onLoadGroups }, dispatch);

const mapStateToProps = state => ({
  user: state.auth.user,
  groups: state.groups.groups
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);

