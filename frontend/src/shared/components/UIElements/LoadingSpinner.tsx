import React from 'react';

import './LoadingSpinner.scss';

interface IProps{
  asOverlay: Boolean
}

const LoadingSpinner: React.FunctionComponent<IProps> = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
