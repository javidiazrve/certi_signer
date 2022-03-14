import { Button } from 'react-bootstrap';
import React from "react";

const Modal = ({show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        {children}
        <Button  className="modal-close">
          close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
