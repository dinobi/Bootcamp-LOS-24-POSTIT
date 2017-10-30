import React from 'react';

const WelcomeCard = (props) => {
  return (
    <div className="col s12">
    <h2 className="header">Horizontal Card</h2>
    <div className="card horizontal">
      <div className="card-image">
        <img src="" />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <h5 className="black-text">{ props.emptyBoard }</h5>
        </div>
      </div>
    </div>
  </div>
  );
};

export default WelcomeCard;
