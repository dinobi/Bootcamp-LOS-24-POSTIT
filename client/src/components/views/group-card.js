import React from 'react';

class GroupCard extends React.Component {
	constructor() {
		super();
		this.state = {
      groupName: 'Group name',
	    normalCount: 0,
		  urgentCount: 0,
			criticalCount: 0,
		}
	}
  render() {
	return (
	  <div className="col s12 m4">
			<div className="card">
				<div className="card-content">
					<span className="card-title activator grey-text text-darken-4 truncate">
					<a href="#group">{ this.state.groupName }</a><i className="material-icons right">more_vert</i></span>
					<p className="notify-counter">
						<span className="critical">{ this.state.criticalCount }</span>
						<span className="urgent">{ this.state.urgentCount }</span>
						<span className="normal">{ this.state.normalCount }</span>
					</p>
				</div>
			</div>
	  </div>
	);
  }
}

export default GroupCard;