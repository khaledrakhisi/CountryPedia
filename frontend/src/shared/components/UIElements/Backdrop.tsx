import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.scss';

export interface IProps {
  onClick: () => void,
}

const Backdrop: React.FunctionComponent<IProps> = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')!
  );
};

export default Backdrop;
