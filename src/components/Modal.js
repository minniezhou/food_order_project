import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
export const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={props.onClick}></div>,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal}>{props.children}</div>,
        document.getElementById("overlays")
      )}
    </>
  );
};
