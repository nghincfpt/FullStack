import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../common/admin/sidebar";
import jwt_decode from "jwt-decode";
function DetailEmployee(props) {
  const url = "http://localhost:8080/api/employee/listAllEmp";
  const { id } = useParams();
  const [target, setTarget] = useState({});
  const [dataView, setDataView] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();


  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    } else if (!["[ROLE_ADMIN]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
    }
  }, []);
  useEffect(() => {
    if (id) {
      axios.get(`${url}/${id}`, {
        headers: {
          "Authorization": "Bearer " + accessToken,
        },
      }).then((resp) => {
        setTarget(resp.data);
      });
    }
  }, [id]);
  console.log(target);
  useEffect(() => {
    if (target && target.media) {
      const urlArray = target.media.map((item) => item.url);
      setDataView(urlArray);
    }
  }, [target]);


  console.log(target);
  console.log(target.type);

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
                    <h2>Xem thông tin nhân viên</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero End */}
        {/* Services Area Start */}
        <div className='row'>
          <div className="col-lg-2" style={{ backgroundColor: "black" }}>
            <Sidebar />
          </div>
          <div className="col-lg-10">
            <section className="service-area section-padding300">
              <div className="container">
                {/* Section caption */}
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div
                      className="gallery-area"
                      style={{ paddingTop: "100px" }}
                    >
                      <div className="col-lg-12 col-md-6 col-sm-6">
                        <div className="box snake thien_snake">
                          <div className="gallery-img">
                            <img
                              className="thien_avatar"
                              src={target.avatar}
                              alt="avatar"
                            // value={target.user?.avatar}
                            />
                          </div>
                          <div className="overlay"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8">
                    <h3 className="mb-30">Xem thông tin nhân viên</h3>
                    <div className="mt-10" style={{ display: "flex" }}>
                      <div className="col-lg-3 col-md-4">
                        <p className="mt-2">EmployeeId</p>
                      </div>
                      <div class="col-lg-9 col-md-4">
                        <p className="mt-2">{target.employee?.employeeId}</p>
                      </div>
                    </div>
                    <div className="mt-10" style={{ display: "flex" }}>
                      <div className="col-lg-3 col-md-4">
                        <p className="mt-2">Họ Tên</p>
                      </div>
                      <div class="col-lg-9 col-md-4">
                        <p className="mt-2">{target.fullName}</p>
                      </div>
                    </div>
                    <div className="mt-10" style={{ display: "flex" }}>
                      <div className="col-lg-3 col-md-4">
                        <p className="mt-2">Ngày sinh</p>
                      </div>
                      <div className="col-lg-9 col-md-4">
                        <p className="mt-2">{target.dateOfBirth}</p>
                      </div>
                    </div>

                    <div className="mt-10" style={{ display: "flex" }}>
                      <div className="col-lg-3 col-md-4">
                        <p className="mt-2">Số điện thoại</p>
                      </div>
                      <div className="col-lg-9 col-md-4">
                        <p className="mt-2">{target.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="mt-10" style={{ display: "flex" }}>
                      <div className="col-lg-3 col-md-4">
                        <p className="mt-2">Giới tính</p>
                      </div>
                      <div className="col-lg-9 col-md-4" style={{ display: "flex" }}>
                        <div className="col-lg-3" style={{ display: "flex" }}>
                          <div className="col-lg-3 mt-1">
                            <div className="confirm-radio">
                              <input
                                type="checkbox"
                                id="confirm-radio"
                                checked
                              />
                              <label for="confirm-radio"></label>
                            </div>
                          </div>
                          <div className="col-lg-7">
                            <label for="html">{target.gender}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10" style={{ display: "flex" }}>
                      <div className="col-lg-3 col-md-4">
                        <p className="mt-2">Email</p>
                      </div>
                      <div className="col-lg-9 col-md-4">
                        <p className="mt-2">{target.account?.email}</p>
                      </div>
                    </div>

                    <div className="mt-10" style={{ display: "flex" }}>
                      <div className="col-lg-3 col-md-4">
                        <p className="mt-2">Kiểu nhân viên</p>
                      </div>
                      <div className="col-lg-9 col-md-4">
                        <input
                          style={{ width: "100%", height: "80%", border: "none" }}
                          name="type"
                          defaultValue=""
                          value={
                            target.employee?.type === "1" ? "Hair dresser" :
                              target.employee?.type === "2" ? "Skinner" :
                                target.employee?.type === "3" ? "Lễ tân" :
                                  ""
                          }
                          readOnly
                        />

                      </div>

                    </div>
                    <div className="input-group-icon mt-10" style={{ display: "flex" }}>
                      <div className="col-lg-3 col-md-4">
                        <p className="mt-2">Chi nhánh</p>
                      </div>
                      <div className="col-lg-9 col-md-4">
                        <p className="mt-2">Nguyễn Văn Linh</p>
                      </div>
                    </div>

                    <div className="mt-110" style={{ display: "flex" }}>
                      <div className="col-lg-3 ms-10">
                        <Link to="/employee">
                          <div className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn">
                            Trở về
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-3 ms-10"></div>
                      <div className="col-lg-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* Services Area End */}
      </main>
    </div>
  );
}

export default DetailEmployee;
