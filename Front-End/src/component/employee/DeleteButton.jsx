import axios from 'axios'
import React from 'react'

export default function DeleteButton(props) {
  const accessToken = localStorage.getItem("accessToken");

  const deleteItem = () => {
    if (props.id) {
      axios.delete(`${props.url}/${props.id}`, {
        headers: {
            "Authorization": "Bearer " + accessToken,
        },
    })
        .then(resp => props.rerender())
        console.log(props.url)
      return;
    }
    axios.delete(`${props.url}/delete`, props.item, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + accessToken
      }
    }).then(resp => props.rerender())
  }

  return (
    <React.Fragment>
      <button className='genric-btn danger radius' data-bs-toggle="modal" data-bs-target={`#modal-${props.id}`} >
        <i className="far fa-trash-alt"></i>
      </button>
      <div
        className="modal fade"
        id={`modal-${props.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Xóa nhân viên
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
            <div className="modal-body">
              Bạn có chắc muốn xóa nhân viên {`${props.id}`}
            </div>
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
    </React.Fragment>
  )
}
