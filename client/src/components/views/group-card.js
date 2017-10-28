import React from 'react';

const GroupCard = (props) => {
	const { location, description } = props;
	return (
		<div className="col s12 m4">
			<div className="card">
				<div className="card-content">
					<span className="card-title activator grey-text text-darken-4 truncate">
					{ location }
					</span>
					<p className="group-description truncate grey-text">
						{ description }
					</p>
				</div>
			</div>
		</div>
	);
}

GroupCard.defaultProps = {
	description: 'No description'
}

export default GroupCard;
