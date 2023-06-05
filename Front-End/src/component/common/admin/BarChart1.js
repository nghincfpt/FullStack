import axios from "axios";

import { faCoffee, faUser, faDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import jwt_decode from "jwt-decode";
import Header from "../../../controller/register/common/Header";
// import Sidebar from "./sidebar";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Sidebar from "./sidebar";

ChartJS.register(...registerables);

// import { useNavigate } from "react-router-dom";

export default function BarChart1() {
  const accessToken = localStorage.getItem("accessToken");
  const [chart, setChart] = useState([]);
  const [bychart, setByChart] = useState([]);
  const [month, setMonth] = useState(["1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",])
  const [user, setUser] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('BRA001');
  const [limit, setLimit] = useState([]);

  const [branch, setBranch] = useState([]);



  // const navigate = useNavigate();

  const toCustomer = () => {
    navigate("/user");
  };
  const toEmployee = () => {
    navigate("/employee");
  };
  const toService = () => {
    navigate("/listService");
  };
  const toBranch = () => {
    navigate("/branch");
  };
  const toChart = () => {
    navigate("/chart");
  };


  useEffect(() => {

    if (accessToken == null) {
      navigate("/login");
      return
    } else if (!["[ROLE_ADMIN]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
      return
    } else {
      loadChart();
      loadUser();
      loadTotal();
      loadLimit();
    }
  }, []);


  const loadChart = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/admin/chart/chart",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    setChart(result.data);
  };

  const loadUser = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/admin/chart/totalUser",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    setUser(result.data[0].totalUser);

  };
  console.log(bychart)
  const loadTotal = async () => {
    await axios
      .get("http://localhost:8080/api/admin/chart/total", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {

        setTotal(res.data[0]?.total);
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    const result = await axios.get(
      `http://localhost:8080/api/admin/chart/checkDay?sd=${formData.startDay}&ed=${formData.endDay}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    let array = [];

    for (let i = +formData.startDay; i <= +formData.endDay; i++) {
      console.log("i now : ", i);
      array.push(i);
    }
    setChart(result.data);
    console.log(array);
    setMonth(array);
  }




  const loadLimit = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/admin/chart/limmit",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    setLimit(result.data);
  };


  const loadBranch = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/admin/chart/branch",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      }

    );
    setBranch(result.data);
  };

  const loadFindByChart = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/admin/chart/FindBychart?branch=${selectedValue}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    setByChart(result.data);

  };

  const handleSelectvalue = (event) => {
    setSelectedValue(event.target.value);
  };


  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getThongKe = () => {
    return {
      labels: month,
      datasets: [
        {
          label: "Doanh thu theo tháng",
          data: chart.map((data) => data.quantity),
          backgroundColor: [
            "#FFA500",
            "#FFFFFF",
            "rgba(75,192,192,1)",
            "#800080",
            "#FFFF00",
            "#000000",
            "#FFFFFF",
            "#964B00",
            "#0000FF",
            "#00FFFF",
            "#FFA500",
            "#FFC0CB",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
  };

  const getThongKeBychart = () => {
    return {
      labels: bychart.map(item => item.month),

      datasets: [
        {
          label: "Chart Month",
          data: bychart.map((data) => data.quantity),
          backgroundColor: [
            "#FFFFFF",
            "rgba(75,192,192,1)",
            "#800080",
            "#FFFF00",
            "#FFFFFF",
            "#964B00",
            "#0000FF",
            "#00FFFF",
            "#FFA500",
            "#FFC0CB",
            "#81f32f",
            "rgba(75,192,192,1)"
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
  };

  useEffect(() => {
    loadChart();
    loadUser();
    loadTotal();
    loadLimit();
    loadBranch();
    loadFindByChart();
  }, []);


  useEffect(() => {
    loadFindByChart();
  }, [selectedValue]);



  useEffect(() => {
    const role = jwt_decode(accessToken);
    if (role.roles !== "[ROLE_ADMIN]") {
      navigate("/main");
    }

  }, [selectedValue, chart, month]);

  return (
    <div className="">
      <Header />
      <div class="slider-area2">
        <div class="slider-height2 d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="hero-cap hero-cap2 pt-70 text-center">
                  <h2>QUẢN LÝ THỐNG KÊ</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2" style={{ backgroundColor: "black" }}>
          <Sidebar />
        </div>
        <div className="col-10 pt-5">
          <div>
            <div className="row">
              <div class="col">
                <p class="form-label">Loại thời gian</p>
                <select class="form-select">
                  <option value="">Báo cáo theo tháng</option>


                </select>
              </div>
              <div class="col">
                <p class="form-label">Chi nhánh</p>
                <select class="form-select" onChange={handleSelectvalue}
                >
                  {branch.map((branch1) => (
                    <option
                      value={branch1.branchId}
                    >
                      {branch1.address}
                    </option>
                  ))}
                </select>

              </div>



              <div class="col">
                <p class="form-label">Loại biểu đồ</p>
                <select
                  class="form-select"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value="1">Biểu đồ đường</option>
                  <option value="2">Biểu đồ cột</option>
                </select>
              </div>
            </div>
            <form onSubmit={onSubmit}>
              <div className="row pt-5">
                <div class="col d-flex justify-content-between" style={{ height: "35px" }}>

                  <select class="custom-select" name="startDay" style={{ height: "30px" }}>
                    <option selected>Vui lòng chọn</option>
                    <option value="1">Tháng 1</option>
                    <option value="2">Tháng 2</option>
                    <option value="3">Tháng 3</option>
                    <option value="4">Tháng 4</option>
                    <option value="5">Tháng 5</option>
                    <option value="6">Tháng 6</option>
                    <option value="7">Tháng 7</option>
                    <option value="8">Tháng 8</option>
                    <option value="9">Tháng 9</option>
                    <option value="10">Tháng 10</option>
                    <option value="11">Tháng 11</option>
                    <option value="12">Tháng 12</option>
                  </select>
                </div>
                <div class="col d-flex justify-content-between" style={{ height: "35px" }}>
                  <select class="custom-select" name="endDay" style={{ height: "30px" }}>
                    <option selected>Vui lòng chọn</option>
                    <option value="1">Tháng 1</option>
                    <option value="2">Tháng 2</option>
                    <option value="3">Tháng 3</option>
                    <option value="4">Tháng 4</option>
                    <option value="5">Tháng 5</option>
                    <option value="6">Tháng 6</option>
                    <option value="7">Tháng 7</option>
                    <option value="8">Tháng 8</option>
                    <option value="9">Tháng 9</option>
                    <option value="10">Tháng 10</option>
                    <option value="11">Tháng 11</option>
                    <option value="12">Tháng 12</option>
                  </select>
                </div>
                <div class="col ">
                  <div class="position-relative ">
                    <div class="position-absolute top-50 start-50 translate-middle d-flex justify-content-center">
                      <button
                        type="submit"
                        class="btn btn-success"
                        style={{ height: "45px" }}
                      >
                        Phân Tích
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

          </div>


          <div className="d-flex pt-5">
            <div className="col-4">
              <div>
                <div
                  className="info-box shadow-lg primary"
                  style={{
                    borderRadius: "10px",
                    padding: "20px",
                    width: "250px",
                  }}
                >
                  <div className="" style={{ display: "flex" }}>
                    <div className="info-box-content">
                      <h4 className="info-box-text">TỔNG KHÁCH HÀNG</h4>
                      <div>
                        {" "}
                        <h1>{user} người </h1>
                      </div>
                    </div>

                    <div
                      className="info-box-icon "
                      style={{
                        marginLeft: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "orange",
                        borderRadius: "50%",
                        width: "60px",
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} size="xl" />
                    </div>
                  </div>
                  <div className="" style={{ marginTop: "20px" }}>
                    {/* <div
                      className="progress-bar progress-bar-striped bg-info"
                      role="progressbar"
                      style={{ width: `${user}%` }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="1000"
                    ></div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div>
                <div
                  className="info-box shadow-lg primary"
                  style={{
                    borderRadius: "10px",
                    padding: "20px",
                    width: "250px",
                    height: "127.98px",
                  }}
                >
                  <div className="" style={{ display: "flex" }}>
                    <div className="info-box-content">
                      <h4 className="info-box-text">DOANH THU</h4>
                      <div>
                        {" "}
                        {total && <h1> ${total} </h1>}
                      </div>
                    </div>
                    <div
                      className="info-box-icon "
                      style={{
                        marginLeft: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#6366f1",
                        borderRadius: "50%",
                        width: "60px",
                      }}
                    >
                      <FontAwesomeIcon icon={faDollar} size="xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div>
                <div
                  className="info-box shadow-lg primary"
                  style={{
                    borderRadius: "10px",
                    padding: "20px",
                    width: "250px",
                    height: "127.98px",
                  }}
                >
                  <div className="" style={{ display: "flex" }}>
                    <div className="info-box-content">
                      <h4 className="info-box-text"></h4>
                      <div>
                        {" "}
                        {total && <h1> ${total} </h1>}
                      </div>
                    </div>
                    <div
                      className="info-box-icon "
                      style={{
                        marginLeft: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#11b981",
                        borderRadius: "50%",
                        width: "60px",
                      }}
                    >
                      <FontAwesomeIcon icon={faDollar} size="xl" />
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <div>
                      <h4 style={{ display: "inline", color: "red" }}>
                        &#9660; 16%{" "}
                      </h4>
                      <span style={{ display: "inline" }}>
                        KỂ TỪ THÁNG TRƯỚC
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* <div className="container-fluid" style={{ height: '250px' }}>
            <Bar data={getThongKe()} />
          </div> */}
          <div className="pt-5">
            <div className="d-flex">
              <div className="col-1"></div>
              <div className="col-4 Regular shadow p-5">

                {/* {selectedValue ===  && <Pie data={getThongKeBychart()} />} */}
                <Pie data={getThongKeBychart()} />
              </div>
              <div className="col-1"></div>
              <div className="col-5 shadow">
                <div>
                  {selectedOption === "1" && <Line data={getThongKe()} />}
                  {selectedOption === "2" && <Bar data={getThongKe()} />}
                  <h3 style={{ textAlign: 'center', marginTop: "20px" }}>Khách hàng thân thiết</h3>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Họ Tên</th>
                        <th scope="col">Số tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {limit.map((staff, index) => (
                        <tr>
                          <th scope="row" key={index}>
                            {staff.user_id}
                          </th>
                          <td>{staff.full_name}</td>
                          <td>{staff.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
