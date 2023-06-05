import accounting from "accounting";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../common/Modal";

function Payment() {
  const user = "http://localhost:8080/api/user/detail";
  const test = "http://localhost:8080/api/receptionist/invoice/details";
  const pay = "http://localhost:8080/api/payment/vnpay";
  const [urlVnpay, setUrlVnpay] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const [detailInfo, setDetailInfo] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const idUser = jwt_decode(accessToken).aud;
  const [serviceData, setServiceData] = useState([]);
  const [statusInvoice, setStatusInvice] = useState("0");
  const [formData, setFormData] = useState({ isDelete: 0 });
  const [dataTam, setDataTam] = useState();
  const [serviceListId, setServiceListId] = useState([]);
  const [status, setStatus] = useState();
  const [statusPay, setStatusPay] = useState(false);
  // const invoiceTime = new Date();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
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
        setStatus("OK");
      });
  }, []);

  useEffect(() => {
    if (location.state != null && location.state.formData != null) {
      setDataTam({ ...location.state.formData });
    }
  }, [status]);

  useEffect(() => {
    if (serviceData.length > 0) {
      const updatedServiceListId = serviceData.map(
        (element) => element.serviceId
      );
      setServiceListId(updatedServiceListId);
    }
  }, [serviceData]);

  useEffect(() => {
    if (serviceListId.length > 0) {
      setFormData({
        userId: detailInfo.userIdBooking,
        isDelete: 0,
        serviceList: serviceListId,
        invoiceTime: "",
        status: statusInvoice,
        total: detailInfo.total,
        bookingId: id,
        skinnerId: dataTam?.skinnerId,
        styleId: dataTam?.styleId,
      });
    }
  }, [serviceListId, statusInvoice, dataTam]);

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

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = "00";
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleEditBooking = () => {
    axios
      .get(
        "http://localhost:8080/api/emp/booking/get-booking?bookingId=" + id,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods":
              "PUT, POST, GET, DELETE, PATCH, OPTIONS",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        navigate("/payment-edit/" + id, {
          state: { selectService: res.data.serviceList, formData: res.data },
        });
      });
  };

  const handleSaveInvoice = (e) => {
    axios
      .post(
        "http://localhost:8080/api/receptionist/invoice/create?bookingid",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods":
              "PUT, POST, GET, DELETE, PATCH, OPTIONS",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        toast.success("Lưu hoá đơn thành công!", {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/invoice-history", {
          state: null,
        });
      })
      .catch((error) => {
        console.error("NOOOO", error);
      });
  };

  const togglePay = () => {
    setStatusPay(true);
  };

  useEffect(() => {
    if (statusPay === true && detailInfo) {
      handleSaveInvoice();
      axios
        .get(`${pay}/${detailInfo.total}/${detailInfo.id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods":
              "PUT, POST, GET, DELETE, PATCH, OPTIONS",
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((data) => {
          setUrlVnpay(data.data);
          window.open(data.data, "_blank");
        })
        .catch("NOT OKKKK");
    }
  }, [statusPay, detailInfo]);

  const deleteItem = () => {
    const newFormData = {
      ...formData,
      status: "1",
    };
    axios
      .post(
        "http://localhost:8080/api/receptionist/invoice/create?bookingid",
        newFormData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods":
              "PUT, POST, GET, DELETE, PATCH, OPTIONS",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        toast.success("Lưu hoá đơn thành công!", {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/invoice-history", {
          state: null,
        });
      })
      .catch((error) => {
        console.error("NOOOO", error);
      });
  };

  return (
    <div>
      <main>
        {/* Hero Start */}
        <div className="slider-area2">
          <div className="slider-height2 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap hero-cap2 pt-70 text-center">
                    <h2>Thanh Toán</h2>
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
              <aside
                className="single_sidebar_widget search_widget col-lg-12"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "nowrap",
                }}
              >
                <div
                  className="col-auto"
                  style={{ fontWeight: "500", fontSize: "25px" }}
                >
                  Đơn hàng: # {detailInfo?.id}
                </div>
                <div className="col-auto">
                  <a
                    type="button"
                    className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                  >
                    Trở về
                  </a>
                </div>
              </aside>
            </div>

            <div className="section-top-border">
              <div className="row autoWrap">
                <div className="col-12" style={{ order: "1" }}>
                  <table className="table table-borderless mb-0">
                    <thead>
                      <tr>
                        <th scope="col" colSpan="8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{detailInfo.name}</td>
                        <td>
                          <div>
                            <i className="fas fa-edit"></i>
                          </div>
                        </td>
                        <td>Đặt lịch từ:</td>
                        <td>Web</td>
                      </tr>
                      <tr>
                        <td>{detailInfo.phoneUerBooking}</td>
                        <td></td>
                        <td>Ngày hóa đơn:</td>
                        <td>{getCurrentDate()}</td>
                      </tr>
                      <tr>
                        <td>id: {detailInfo.userIdBooking}</td>
                        <td></td>
                        <td>Giờ vào / ra:</td>
                        <td>
                          {detailInfo.time} - {getCurrentTime()}
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
                        <th scope="col" colSpan="2">
                          Đơn giá
                        </th>
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
                          <td></td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="4">
                          <div className="text-center">
                            <div
                              className="btn btn-secondary w-100"
                              onClick={() => handleEditBooking()}
                            >
                              Kiểm tra & thanh toán +
                            </div>
                          </div>
                        </td>
                      </tr>
                      {location.state && location.state.formData && <tr>
                        <th colSpan="2">Thanh Toán</th>
                        <td colSpan="1">
                          {accessToken && jwt_decode(accessToken).roles == "[ROLE_RECEPTIONIST]" && <div className="text-center">
                            <button
                              className="button rounded-0 primary-bg text-white boxed-btn"
                              data-bs-toggle="modal"
                              data-bs-target={`#modal-${detailInfo.id}`}
                            >
                              Tại quầy
                            </button>
                            <Modal
                              id={detailInfo.id}
                              title={`Thanh toán hoá đơn ${detailInfo.id}`}
                              message={`Bạn có chắc muốn thanh toán hoá đơn ${detailInfo.id}`}
                              deleteItem={deleteItem}
                            />
                          </div>}
                        </td>
                        <td>
                          <div className="text-center">
                            <div
                              className="button rounded-0 primary-bg text-white boxed-btn"
                              onClick={togglePay}
                            >
                              VNPay
                            </div>
                          </div>
                        </td>
                      </tr>}
                    </tbody>
                  </table>
                  <div className="text-right mt-5">
                    <div
                      className="btn btn-secondary"
                      onClick={() => handleSaveInvoice()}
                    >
                      Lưu
                    </div>
                  </div>
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
