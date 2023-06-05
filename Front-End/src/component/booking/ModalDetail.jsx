import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ModalDetail(props) {
  const [data, setData] = useState(props.data);
  const [urlVnpay, setUrlVnpay] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const urlPay = "payment";
  const name = data.name;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setData(props.data);
  });

  // console.log(`${pay}${props.pay}`);
  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   axios
  //     .get(`${pay}${props.pay}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Methods":
  //           "PUT, POST, GET, DELETE, PATCH, OPTIONS",
  //       },
  //     })
  //     .then((data) => {
  //       setUrlVnpay(data.data);
  //       window.open(data.data, "_blank");
  //     })
  //     .catch("NOT OKKKK");
  // };

  // const handleChangePayment = () => {
  //   if (data.id) {
  //     navigate("/payment/", {
  //       state: { idBooking: data?.id },
  //     });
  //   }
  // };

  return (
    <div
      className="modal fade bd-example-modal-lg"
      id={`modalDetail-${props.id}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              THÔNG TIN CHI TIẾT
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
            <div className="row" style={{ textAlign: "left" }}>
              <div className="col-7">Mã đặt lịch: {data?.id}</div>
              <div className="col-5">Ngày đặt: {data?.date}</div>
              <div className="col-7">Người đặt: {data?.name}</div>
              <div className="col-5">
                Giờ đặt: {data?.time?.substring(0, 5)}
              </div>
              <div className="col-7">Chi nhánh: Thanh Khê</div>
            </div>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên dịch vụ</th>
                  <th>Người thực hiện</th>
                  <th>Giá tiền</th>
                </tr>
              </thead>
              <tbody>
                {props.listService}
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    <b>Tổng cộng</b>
                  </td>
                  <td colSpan="2">
                    <b>{props.total}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              OK
            </button>
            <Link
              as={Link}
              className="btn btn-secondary"
              to={`/${urlPay}/${data?.id}`}
            >
            <div data-bs-dismiss="modal"
            // onClick={handleChangePayment()}
            >
              Thanh toán
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
