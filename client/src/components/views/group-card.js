import React from 'react';

class GroupCard extends React.Component {
	constructor() {
		super();
		this.state = {
		}
	}
  render() {
		const { criticalCount, urgentCount, normalCount, location } = this.props;
		return (
			<div className="col s12 m4">
				<div className="card">
					<div className="card-content">
						<span className="card-title activator grey-text text-darken-4 truncate">
							{ location }
						</span>
						<p className="notify-counter">
							<span className="critical">{ criticalCount }</span>
							<span className="urgent">{ urgentCount }</span>
							<span className="normal">{ normalCount }</span>
						</p>
					</div>
				</div>
			</div>
		);
  }
}

GroupCard.defaultProps = {
	criticalCount: 0,
	urgentCount: 0,
	normalCount: 0,
}

export default GroupCard;