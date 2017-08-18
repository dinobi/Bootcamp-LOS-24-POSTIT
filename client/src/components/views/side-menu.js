import React from 'react';

class SideMenu extends React.Component {
 
  render() {
		const { active = 'dashboard' } = this.props;
    return (
      <div className="dashboard-menu">
        
				<section className="my-tab">My Tab</section>
					<ul className="menu-nav">
						<li className="dashboard-menu-item">
							<a href="#dashboard" className={ active === 'dashboard' ? 'active' : '' }><i className="fa fa-home"></i>&nbsp;&nbsp;My Space</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#groups" className={ active === 'groups' ? 'active' : '' }><i className="fa fa-group"></i>&nbsp;&nbsp;My Groups</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#search" className={ active === 'search' ? 'active' : '' }><i className="fa fa-search"></i>&nbsp;&nbsp;Search PostIt</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#search-wiki" className={ active === 'search-wiki' ? 'active' : '' }><i className="fa fa-wikipedia-w"></i>&nbsp;&nbsp;Search Wikipedia</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#account-details" className={ active === 'account-details' ? 'active' : '' }><i className="fa fa-cog"></i>&nbsp;&nbsp;Account Details</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#login"><i className="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</a>
						</li>
						{ this.props.back}						
					</ul>
				<section className="utility">Hello Utility</section>

			</div>
    );
  }
}

export default SideMenu;