import React from 'react';
import './PortraitMode.css';

const PortraitMode = () => {
  return (
    <div className="portrait-mode">
      <div className="rotate-icon"></div>
      <h1>Please Rotate Your Device</h1>
      <p>This app is best viewed in landscape mode.</p>
    </div>
  );
};

export default PortraitMode;
