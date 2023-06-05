import React from "react";

function Modal({ id, title, message, deleteItem }) {
  return (
    <div
      className="modal fade"
      id={`modal-${id}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {title}
            </h1>
            <div
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Không
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={deleteItem}
            >
              Có
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
