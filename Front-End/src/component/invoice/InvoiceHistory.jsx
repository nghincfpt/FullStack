import accounting from "accounting";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchForm from "../../Button/SearchForm";
import DeleteButton from "../button/DeleteButton";
import DetailButton from "../button/DetailButton";
import EditButton from "../button/EditButton";
import Page from "../common/Page";
import jwt_decode from "jwt-decode";
import Sidebar from "../common/admin/sidebar";
import { useNavigate } from "react-router-dom";

function InvoiceHistory(props) {
  const [condition, setCondition] = useState("");
  const [list, setList] = useState({ data: { content: [] } });
  const urlInvoiceList = "http://localhost:8080/api/invoice-management";
  const urlInvoiceSuccess = "http://localhost:8080/api/invoice-management/success";
  const accessToken = localStorage.getItem("accessToken");
  // accesToken phai ton tai
  const roles = jwt_decode(accessToken).roles;
  const [dataFirst, setDataFirst] = useState();
  const [status, setStatus] = useState("");
  const [display, setDisplay] = useState(true);
  const pay = new URL(window.location.href);
  const searchParams = new URLSearchParams(pay.search);
  const vnpResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const navigate = useNavigate()
  const onSubmit = (data) => {
    setCondition(data);
  };

  const rerender = () => {
    setDisplay(!display);
  };

  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    } else if (!["[ROLE_CUSTOMER]", "[ROLE_RECEPTIONIST]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
    }
  })
  useEffect(() => {
    if (vnpResponseCode === "00") {
      axios
        .patch(`${urlInvoiceSuccess}/${vnp_TxnRef}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods":
              "PUT, POST, GET, DELETE, PATCH, OPTIONS",
            // Authorization: "Bearer " + accessToken,
          },
        })
        .then((resp) => {
          console.log(resp);
          setStatus("OKK");
        });
    }
  }, [vnpResponseCode]);

  useEffect(() => {
    axios
      .get(`${urlInvoiceList}?c=${condition}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setList(res);
        setDataFirst(res.data.content);
      });
  }, [condition, status]);

  function handleClick(page) {
    axios
      .get(`${urlInvoiceList}?p=${page}&c=${condition}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setList(res);
        setDataFirst(res.data.content);
      }).catch((err) => {
        console.log(err);
      });
  }

  console.log(dataFirst);

  return (
    <div>
      <main>
        <div className="slider-area2">
          <div className="slider-height2 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap hero-cap2 pt-70 text-center">
                    <h2>Lịch Sử Hoá Đơn</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="col-lg-2" style={{ backgroundColor: "black" }}>
            <Sidebar />
          </div>

          <div className="col-lg-10">
            <div className="whole-wrap">
              <div className="container box_1170">
                <div className="blog_right_sidebar">
                  <aside
                    className="single_sidebar_widget search_widget col-lg-12"
                    style={{ display: "flex" }}
                  >
                    <div className="col-lg-1"></div>
                    <form action="#" className="col-lg-6">
                      <div className="form-group">
                        <SearchForm onSubmit={onSubmit} />
                      </div>
                    </form>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-3 col-md-4 mt-10"></div>
                  </aside>
                  <div className="col-lg-3"></div>
                </div>
                <div className="section-top-border">
                  <h3 className="mb-30">Danh sách hóa đơn</h3>
                  <div className="progress-table-wrap">
                    <div
                      className="progress-table"
                      style={{ textAlign: "center" }}
                    >
                      <table className="table table-hover tablecenterCSS">
                        <thead>
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Họ và Tên khách hàng</th>
                            <th scope="col">Ngày Đặt Lịch</th>
                            <th scope="col">Ngày Hoá Đơn</th>
                            <th scope="col">Tiền Thanh Toán</th>
                            <th scope="col">Trạng Thái</th>
                            <th scope="col">Chức năng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.data.content.length > 0 &&
                            list.data.content.map((item, index) => (
                              <tr
                                style={{ marginTop: "5px" }}
                                key={item.invoiceId}
                              >
                                <th scope="row">{item.invoiceId}</th>
                                <td>{item.booking.name}</td>
                                <td>{item.booking.bookingDate}</td>
                                <td>{item.invoiceTime.split("T")[0]}</td>
                                <td>
                                  {accounting.formatMoney(item.total, {
                                    symbol: "",
                                    format: "%v vnđ",
                                    precision: 0,
                                  })}
                                </td>
                                <td>
                                  {item.status === "0"
                                    ? "Chưa thanh toán"
                                    : "Đã thanh toán"}
                                </td>
                                <td>
                                  <DeleteButton
                                    url={urlInvoiceList}
                                    id={item.invoiceId}
                                    nameBranch={item.invoiceId}
                                    type={"mã hoá đơn"}
                                    rerender={rerender}
                                  />
                                  {item.status === "0" && <EditButton
                                    url={"payment"}
                                    id={item.booking.bookingId}
                                  />}
                                  <DetailButton
                                    url={"invoice"}
                                    id={item.booking.bookingId}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <section
                  className="blog_area"
                  style={{ paddingBottom: "80px" }}
                >
                  <Page
                    totalPages={list.data.totalPages}
                    number={list.data.number}
                    condition={condition}
                    handleClick={handleClick}
                  />
                </section>
                <div style={{ display: "flex" }}>
                  <div className="col-lg-10 ms-10 mb-50"></div>
                  <div className="col-lg-2 ms-10 mb-50">
                    <a
                      type="button"
                      className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                    >
                      Trở về
                    </a>
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

export default InvoiceHistory;
