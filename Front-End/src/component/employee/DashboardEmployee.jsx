import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Page from '../../utils/Page';
import DeleteButton from '../employee/DeleteButton';
import SearchForm from '../../Button/SearchForm';
import DetailButton from '../../Button/DetailButton';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../common/admin/sidebar";
import jwt_decode from "jwt-decode";
function DashboardEmployee(props) {
  const url = "http://localhost:8080/api/employee/listAllEmp";
  const [list, setList] = useState({ data: { content: [] } });
  const [condition, setCondition] = useState("");
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    } else if (!["[ROLE_ADMIN]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
    }
  }, []);

  function handleClick(page) {
    axios.get(`${url}?p=${page}&c=${condition}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods":
          "PUT, POST, GET, DELETE, PATCH, OPTIONS",
        "Authorization": "Bearer " + accessToken,
      },
    }).then((res) => {
      console.log(res);
      setList(res);
    });
    // axios.get(`${url}?p=${page}&c=${condition}`).then(res => {
    //     setList(res);
    // });
  }

  const onSubmit = (data) => {
    setCondition(data);
    console.log(setCondition);
  }

  const rerender = () => {
    setDisplay(!display);
  }

  useEffect(() => {
    // axios.get(`${url}?c=${condition}`).then(res => {
    //     setList(res);
    // })
    axios.get(`${url}?c=${condition}`, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      },
    }).then((res) => {
      setList(res);
      console.log(res);
    });
  }, [condition, display])

  console.log(list);

  const editEmp = (employeeId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + accessToken);
    var requestOptions = { method: "GET", redirect: "follow", headers: myHeaders };
    fetch(
      `http://localhost:8080/api/employee/edit?employeeId=${employeeId}`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        navigate("/emp/edit", { state: { result } });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div>
      {/* <PreLoader /> */}
      {/* <Modal /> */}
      <main>
        {/* Hero Start */}
        <div className="slider-area2">
          <div className="slider-height2 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap hero-cap2 pt-70 text-center">
                    <h2>Quản lý nhân viên</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero End */}
        {/* Start Align Area */}
        <div className="row">
          <div className="col-lg-2" style={{ backgroundColor: "black" }} >
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
                    <div className="col-lg-2"></div>
                    <div className="form-group col-8">
                      {/* <div className="input-group mb-3"> */}
                      <SearchForm
                        onSubmit={onSubmit}
                      />
                      {/* </div> */}
                    </div>
                  </aside>
                </div>
                <div class="mt-10 col-lg-10" style={{ display: "flex" }}>
                  <div class="mt-10 col-lg-4">
                    <Link to="/employee-add">
                      <div className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn">
                        Thêm mới nhân viên
                      </div>
                    </Link>
                  </div>
                  <div class="mt-10 col-lg-4">
                    <Link to="/employee-addRec">
                      <div className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn">
                        Thêm mới lễ tân
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="section-top-border">
                  <h3 className="mb-30">Danh sách nhân viên</h3>
                  <div className="progress-table-wrap">
                    <div
                      className="progress-table"
                      style={{ textAlign: "center" }}
                    >
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Ngày sinh</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Email</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Nhân viên</th>
                            <th scope="col">Chi nhánh</th>
                            <th scope="col">Chức năng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.data.content.length > 0 &&
                            list.data.content.map((item) =>
                              <tr style={{ marginTop: "5px" }} key={item.employee.employeeId}>
                                <th scope="row">{item.employee.employeeId}</th>
                                <td>{item.fullName}</td>
                                <td>{item.dateOfBirth}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.account.email}</td>
                                <td>{item.gender}</td>
                                <td>
                                  {
                                    item.employee.type === "1" ? "Hair dresser" :
                                      item.employee.type === "2" ? "Skinner" :
                                        item.employee.type === "3" ? "Lễ tân" :
                                          ""
                                  }
                                </td>
                                <td>{item.employee.branch.name}</td>
                                <td style={{ display: "flex" }}>
                                  <DeleteButton url={url} id={item.employee.employeeId} rerender={rerender} />

                                  <button
                                    type="button"
                                    className="genric-btn success radius"
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => editEmp(item.employee.employeeId)}
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#deleteModal"
                                  >
                                    <i className="fas fa-pencil-alt"></i>
                                  </button>
                                  {/* <EditButton url={url} id={ item.employeeId } /> */}

                                  <DetailButton url={'employee'} id={item.employee.employeeId} />
                                </td>
                              </tr>
                            )}

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
              </div>
            </div>
          </div>
        </div>
        {/* End Align Area */}
      </main>
    </div>
  );
}

export default DashboardEmployee;
