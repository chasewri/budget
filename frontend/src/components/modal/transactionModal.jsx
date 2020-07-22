import React from "react";
import "./modal.scss";

function TransactionModal({ show, handleClose, children }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <>
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button className="button btn btn-lg btn-light" onClick={handleClose}>
            Cancel
          </button>
        </section>
      </div>
    </>
  );
}

export default TransactionModal;
