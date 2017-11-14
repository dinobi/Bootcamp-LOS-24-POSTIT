import React from 'react';

const Card = ({ children, cardControl }) =>
  <div className={cardControl}>
    <div className="card-content">
      { children }
    </div>
  </div>;

export default Card;
