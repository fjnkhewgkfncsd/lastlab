import React from "react";

import "../index.css";

function Entity({ healthPercentage, name }) {
  return (
    <div className="container">
      <h2>{name}</h2>
      <div className="healthbar">
        <div 
          className="healthbar__value" 
          style={{ width: `${Math.max(0, Math.min(100, healthPercentage))}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Entity;