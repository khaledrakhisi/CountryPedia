import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

import "./Modal.scss";

interface IModalProps{
  className?: string,
  style?: CSSProperties,
  headerClass?: string,
  header?: string,
  footer?: React.ReactChildren,
  contentClass?: string,
  footerClass?: string,
  onSubmit?: ()=>void,
}
export interface IProps extends IModalProps{
  show: boolean,
  OnCancelHandle: ()=>void,
}

const ModalOverlay: React.FunctionComponent<IModalProps> = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.className}`}>
          {props.children}
        </div>
        <div className={`modal__footer ${props.className}`}>{props.footer}</div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook")!);
};

const Modal: React.FunctionComponent<IProps> = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.OnCancelHandle} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
          <ModalOverlay {...props}/>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
