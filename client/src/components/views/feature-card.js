import React from 'react';

const FeatureCard = (imgDesc, imgAlt, featTitle, featLink, linkTitle, featDesc) => {
	return (
	  <div className="card small">
	    <div className="card-image waves-effect waves-block waves-light">
		    <img className="activator" src={ imgDesc } alt={ imgAlt }/>
			</div>
			<div className="card-content">
				<span className="card-title activator grey-text text-darken-4">{ featTitle }<i className="material-icons right">more_vert</i></span>
				<p><a href= { featLink }>{ linkTitle }</a></p>
			</div>
			<div className="card-reveal">
				<span className="card-title grey-text text-darken-4">Write Post<i className="material-icons right">close</i></span>
				<p>{ featDesc }</p>
			</div>
	  </div>
	);
}

export default FeatureCard;