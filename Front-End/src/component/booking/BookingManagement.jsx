import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteButton from "../button/DeleteButton";

import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchForm from "../../Button/SearchForm";
import Page from "../common/Page";
import DetailInfoButton from "./DetailButton";
import Sidebar from "../common/admin/sidebar";

export default function BookingManagement() {
  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
      return;
    } else if (accessToken != null && !["[ROLE_CUSTOMER]", "[ROLE_RECEPTIONIST]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
    }
  }, []);
  const [list, setList] = useState({ data: { content: [] } });
  const url = "http://localhost:8080/api/booking-management";
  const [condition, setCondition] = useState("");
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();
  const pay = new URL(window.location.href);
  const searchParams = new URLSearchParams(pay.search);
  const vnpResponseCode = searchParams.get("vnp_ResponseCode");
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);



  function handleClick(page) {
    axios
      .get(`${url}?p=${page}&c=${condition}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        setList(res);
      });
  }
  console.log(list);

  const onSubmit = (data) => {
    setCondition(data);
  };

  const rerender = () => {
    setDisplay(!display);
  };

  const handleEditBooking = (id) => {
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
        navigate("/booking/" + id, {
          state: { selectService: res.data.serviceList, formData: res.data },
        });
      });
  };

  useEffect(() => {
    const role = jwt_decode(accessToken);
    if (
      role.roles != "[ROLE_CUSTOMER]" &&
      role.roles != "[ROLE_RECEPTIONIST]"
    ) {
      navigate("/main");
    } else {
      axios
        .get(`${url}?c=${condition}`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          setList(res);
          console.log(res);
        });
    }
  }, [condition, display]);

  const handleDeleteModal = () => { };

  useEffect(() => {
    if (vnpResponseCode === "00") {
      toast.success("Thanh toán thành công");
    }
  }, [vnpResponseCode]);

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
                    <h2>Quản lý lịch hẹn</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero End */}
        {/* Start Align Area */}
        <div className="row">
          {jwt_decode(accessToken).roles == "[ROLE_RECEPTIONIST]" && (
            <div className="col-lg-2" style={{ backgroundColor: "black" }}>
              <Sidebar />
            </div>
          )}

          <div
            className={` ${jwt_decode(accessToken).roles == "[ROLE_RECEPTIONIST]"
              ? "col-lg-10"
              : "container"
              }`}
          >
            <div className="whole-wrap">
              <div className="container-fluid box_1170">
                <div className="blog_right_sidebar">
                  <aside
                    className="single_sidebar_widget search_widget col-lg-12"
                    style={{ display: "flex" }}
                  >
                    <div className="col-lg-1"></div>

                    <div className="form-group">
                      <SearchForm onSubmit={onSubmit} />
                    </div>
                  </aside>
                  <div className="col-lg-3">
                    <Link to="/booking">
                      <div className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn">
                        Thêm mới
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="section-top-border">
                  <h3 className="mb-30">Danh sách lịch hẹn</h3>
                  <div className="progress-table-wrap">
                    <div
                      className="progress-table"
                      style={{ textAlign: "center" }}
                    >
                      <table className="table table-hover" id="table">
                        <thead>
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mã đặt lịch</th>
                            <th scope="col">Tên người đặt lịch</th>
                            <th scope="col">Chi nhánh</th>
                            <th scope="col">Đặt ngày</th>
                            <th scope="col">Giờ đặt</th>
                            <th scope="col">Ghi chú</th>
                            <th scope="col" style={{ width: "27%" }}>
                              Chức năng
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.data.content.length > 0 &&
                            list.data.content.map((item, index) => (
                              <tr
                                style={{ marginTop: "5px" }}
                                key={item.bookingId}
                              >
                                <td>
                                  {index +
                                    1 +
                                    list.data.number * list.data.size}
                                </td>
                                <td>{item.bookingId}</td>
                                <td>{item.name}</td>
                                <td>{item.branch.name}</td>
                                <td>{item.bookingDate}</td>
                                <td>
                                  {item.bookingDetailList[0]?.workingTime.timeZone.substring(
                                    0,
                                    5
                                  )}
                                </td>
                                <td>{item.note}</td>
                                <td className="item">
                                  <DeleteButton
                                    url={url}
                                    id={item.bookingId}
                                    nameBranch={item.bookingId}
                                    type={"Mã đặt lịch"}
                                    rerender={rerender}
                                  />

                                  <button
                                    className="genric-btn success"
                                    onClick={() =>
                                      handleEditBooking(item.bookingId)
                                    }
                                  >
                                    <i className="fas fa-pencil-alt"></i>
                                  </button>
                                  <DetailInfoButton
                                    url={
                                      "http://localhost:8080/api/booking-management/details"
                                    }
                                    id={item.bookingId}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <Page
                  totalPages={list.data.totalPages}
                  number={list.data.number}
                  condition={condition}
                  handleClick={handleClick}
                />
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
