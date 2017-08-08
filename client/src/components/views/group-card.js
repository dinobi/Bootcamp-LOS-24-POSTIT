import React from 'react';

const GroupCard = ({ criticalCount, urgentCount, normalCount, groupTitle, groupLink }) => {
	return (
      <div className="card">
		<div class="card-content">
		  <span className="card-title activator grey-text text-darken-4 truncate">
            { groupTitle }<i class="material-icons right">more_vert</i></span>
		  <p className="notify-counter">
            <span className="critical">{ criticalCount }</span>
            <span className="urgent">{ urgentCount }</span>
            <span className="normal">{ normalCount }</span>
          </p>
		</div>
	  </div>
	);
}

export default GroupCard;