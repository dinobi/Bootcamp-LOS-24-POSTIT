import React from 'react';
import Logout from '../../actions/logout';

class SideMenu extends React.Component {
  render() {
		const { active = 'my-space', onLogout } = this.props;
    return (
      <div className="dashboard-menu">
        
				<section className="my-tab">My Tab</section>
					<ul className="menu-nav">
						<li className="dashboard-menu-item">
							<a className={ active === 'my-space' ? 'active' : ''} href="#my-space"><i className="fa fa-home"></i>&nbsp;&nbsp;My Space</a>
						</li>
						<li className="dashboard-menu-item">
							<a className={ active === 'groups' ? 'active' : ''} href="#groups"><i className="fa fa-group"></i>&nbsp;&nbsp;My Groups</a>
						</li>
						<li className="dashboard-menu-item">
							<a className={ active === 'search' ? 'active' : ''} href="#search"><i className="fa fa-search"></i>&nbsp;&nbsp;Search PostIt</a>
						</li>
						<li className="dashboard-menu-item">
							<a className={ active === 'search-wiki' ? 'active' : ''} href="#search-wiki"><i className="fa fa-wikipedia-w"></i>&nbsp;&nbsp;Search Wikipedia</a>
						</li>
						<li className="dashboard-menu-item">
							<a className={ active === 'account-details' ? 'active' : ''} href="#account-details"><i className="fa fa-cog"></i>&nbsp;&nbsp;Account Details</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#login" onClick={ () => Logout(onLogout) }><i className="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</a>
						</li>							
					</ul>
				<section className="utility">Hello Utility</section>

			</div>
    );
  }
}

export default SideMenu;