import React from 'react';

class GroupCard extends React.Component {
	render() {
		return (
			<div className="col s12 m4">
				<div className="card">
					<div className="card-content">
						<span className="card-title activator grey-text text-darken-4 truncate">
							{ this.props.groupTitle }<i className="material-icons right">more_vert</i></span>
						<p className="notify-counter">
							<span className="critical">{ this.props.criticalCount }</span>
            	<span className="urgent">{ this.props.urgentCount }</span>
            	<span className="normal">{ this.props.normalCount }</span>
						</p>
					</div>
				</div>
			</div>
	  );
	}
}

export default GroupCard;