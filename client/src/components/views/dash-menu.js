import React from 'react';

class SideMenu extends React.Component {
  render() {
    return (
      <div className="dashboard-menu">
        
				<section className="my-tab">My Tab</section>
					<ul className="menu-nav">
						<li className="dashboard-menu-item">
							<a className="active" href="#my-space"><i className="fa fa-home"></i>&nbsp;&nbsp;My Space</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#group"><i className="fa fa-group"></i>&nbsp;&nbsp;My Groups</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#search"><i className="fa fa-search"></i>&nbsp;&nbsp;Search PostIt</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#search-wikipedia"><i className="fa fa-wikipedia-w"></i>&nbsp;&nbsp;Search Wikipedia</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#account-details"><i className="fa fa-cog"></i>&nbsp;&nbsp;Account Details</a>
						</li>
						<li className="dashboard-menu-item">
							<a href="#login.html"><i className="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</a>
						</li>
						{ this.props.back}						
					</ul>
				<section className="utility">Hello Utility</section>

			</div>
    );
  }
}

export default SideMenu;