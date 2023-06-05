import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "../../Button/SearchForm";
import DeleteButton from "../button/DeleteButton";
import DetailButton from "../button/DetailButton";
import EditButton from "../button/EditButton";
import Page from "../common/Page";
import Sidebar from "../common/admin/sidebar";
import jwt_decode from "jwt-decode";
function DashboardBranch(props) {
  const navigate = useNavigate()
  const [list, setList] = useState({ data: { content: [] } });
  const url = "http://localhost:8080/api/admin/branch";
  const [condition, setCondition] = useState("");
  const [display, setDisplay] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    } else if (!["[ROLE_ADMIN]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
    }
  }, []);
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
        setList(res);
      });
  }

  const onSubmit = (data) => {
    setCondition(data);
    console.log(setCondition);
  };

  const rerender = () => {
    setDisplay(!display);
  };

  useEffect(() => {
    axios
      .get(`${url}?c=${condition}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setList(res);
      });
  }, [condition, display]);

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
                    <h2>Quản lý chi nhánh</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero End */}
        {/* Start Align Area */}
        <div className='row'>
          <div className="col-lg-2" style={{ backgroundColor: "black" }}>
            <Sidebar />
          </div>

          <div className="col-lg-10">
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

                    <div className="col-lg-1"></div>
                    <div className="col-lg-3 col-md-4 mt-10"></div>
                    <Link to="/branch-add">
                      <div className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn">
                        Thêm mới
                      </div>
                    </Link>
                  </aside>
                </div>
                <div className="section-top-border">
                  <h3 className="mb-30">Danh sách chi nhánh</h3>
                  <div className="progress-table-wrap">
                    <div
                      className="progress-table"
                      style={{ textAlign: "center" }}
                    >
                      <table className="table table-hover" id="table">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: "20%" }}>
                              STT
                            </th>
                            <th scope="col" style={{ width: "20%" }}>
                              Tên chi nhánh
                            </th>
                            <th scope="col" style={{ width: "33%" }}>
                              Địa chỉ
                            </th>
                            <th scope="col" style={{ width: "27%" }}>
                              Chức năng
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.data.content.length > 0 &&
                            list.data.content.map((item) => (
                              <tr
                                style={{ marginTop: "5px" }}
                                key={item.branchId}
                              >
                                <td>{item.branchId}</td>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td className="item">
                                  <DeleteButton
                                    url={url}
                                    id={item.branchId}
                                    nameBranch={item.name}
                                    type={"chi nhánh"}
                                    rerender={rerender}
                                  />
                                  <EditButton
                                    url={"branch-edit"}
                                    id={item.branchId}
                                  />
                                  <DetailButton
                                    url={"branch-detail"}
                                    id={item.branchId}
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
                  <div className="col-lg-2 ms-10 mb-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Align Area */}
      </main>
    </div>
  );
}

export default DashboardBranch;
