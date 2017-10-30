import React from 'react';

const Card = ({ children, size }) =>
  <div className={ size }>
    <div className="card card-control">
      <div className="card-content">
        { children }
      </div>
    </div>
  </div>;

export default Card;
