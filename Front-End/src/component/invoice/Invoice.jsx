import accounting from "accounting";
import axios from "axios";
import jwt_decode from "jwt-decode";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Payment() {
  const user = "http://localhost:8080/api/user/detail";
  const test = "http://localhost:8080/api/receptionist/invoice/details";
  const urlInvoiceDetail =
    "http://localhost:8080/api/invoice-management/detail/";
  const accessToken = localStorage.getItem("accessToken");
  const [detailInfo, setDetailInfo] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const idUser = jwt_decode(accessToken).aud;
  const [serviceData, setServiceData] = useState([]);
  const [timeInvoice, setTimeInvoice] = useState();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  useEffect(() => {

    if (accessToken == null) {
      navigate("/login");
    } else if (!["[ROLE_CUSTOMER]", "[ROLE_RECEPTIONIST]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
    }

    axios
      .get(`${test}?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((resp) => {
        setDetailInfo(resp.data);
        setServiceData(resp.data.service);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${urlInvoiceDetail}` + id, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((resp) => {
        resp.data.map((item) => setTimeInvoice(item.invoiceTime));
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${user}/${idUser}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((resp) => {
        setDataUser(resp.data);
      });
  }, []);

  console.log(dataUser);

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div>
      <main>
        <div className="slider-area2">
          <div className="slider-height2 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap hero-cap2 pt-70 text-center">
                    <h2>THÔNG TIN HOÁ ĐƠN</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero End */}
        {/* Start Align Area */}
        <div className="whole-wrap">
          <div className="container box_1170">
            <div className="blog_right_sidebar">
              <aside className="single_sidebar_widget search_widget col-lg-12">
                <div className="col-auto">
                  <Link
                    as={Link}
                    to={"/invoice-history"}
                    type="button"
                    className="button rounded-0 primary-bg text-white btn_1 boxed-btn"
                  >
                    Trở về
                  </Link>
                </div>
              </aside>
            </div>

            <div className="section-top-border">
              <div className="row autoWrap">
                <div className="col-12" style={{ order: "1" }}>
                  <table className="table table-bordered mb-0">
                    <thead>
                      <tr>
                        <th scope="col" colSpan="8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tên Khách Hàng</td>
                        <td>{detailInfo.name}</td>
                        <td>Đặt lịch từ:</td>
                        <td>Web</td>
                      </tr>
                      <tr>
                        <td>Số điện thoại khách hàng</td>
                        <td>{detailInfo.phoneUerBooking}</td>
                        <td>Ngày hóa đơn:</td>
                        <td>{getCurrentDate()}</td>
                      </tr>
                      <tr>
                        <td>Mã khách hàng</td>
                        <td>{detailInfo.userIdBooking}</td>
                        <td>Giờ vào / ra:</td>
                        <td>
                          {detailInfo.time} -{" "}
                          {moment(timeInvoice).format("HH:mm:ss")}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td>Nhân viên thu ngân:</td>
                        <td>{dataUser.fullName}</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr className="mt-5 mb-5" />
                  <table className="table table-bordered mb-0">
                    <thead>
                      <tr>
                        <th scope="col" colSpan="2">
                          Sản Phẩm & Dịch Vụ
                        </th>
                        <th scope="col">Đơn giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceData?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.serviceName}</td>
                          <td>
                            {accounting.formatMoney(item.price, {
                              symbol: "",
                              format: "%v vnđ",
                              precision: 0,
                            })}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <th colSpan="2">Thành Tiền</th>
                        <td colSpan="2">
                          {accounting.formatMoney(detailInfo.total, {
                            symbol: "",
                            format: "%v vnđ",
                            precision: 0,
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Payment;
