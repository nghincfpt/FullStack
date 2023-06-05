import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageGalleryEdit from "../common/ImageGalleryEdit";
import accounting from "accounting";
import Sidebar from "../common/admin/sidebar";
import jwt_decode from "jwt-decode";
function DetailService(props) {
  const url = "http://localhost:8080/api/hairService";
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
  const onSubmit = (e) => {
    console.log(target);
    e.preventDefault();
    if (id) {
      axios
        .get(`${url}/${id}`, target, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Credentials": "true",
            "Authorization": "Bearer " + accessToken,
          },
        })
        .then((resp) => {
          navigate("/listService");
        });
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`${url}/${id}`, {
        headers: {
          "Authorization": "Bearer " + accessToken,
        },
      }).then((resp) => {
        setTarget(resp.data);
        setTarget(resp.data);
      });
    }
  }, [id]);


  useEffect(() => {
    if (target && target.media) {
      const urlArray = target.media.map((item) => item.url);
      setDataView(urlArray);
    }
  }, [target]);
  console.log(target);

  return (
    <div>
      <main>
        <form id="form" onSubmit={onSubmit}></form>
        {/* Hero Start */}
        <div className="slider-area2">
          <div className="slider-height2 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap hero-cap2 pt-70 text-center">
                    <h2>Xem thông tin dịch vụ</h2>
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
                      style={{ paddingTop: "50px" }}
                    >
                      <div className="col-lg-12 col-md-6 col-sm-6">
                        {dataView !== undefined && dataView !== null && (
                          <ImageGalleryEdit data={dataView} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8">
                    <form action="#">
                      <div className="mt-80" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Mã Dịch Vụ: </p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <p className="mt-2">{target.serviceId}</p>
                        </div>
                      </div>
                      <div className="mt-80" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Tên Dịch Vụ: </p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <p className="mt-2">{target.name}</p>
                        </div>
                      </div>
                      <div className="mt-80" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Giá: </p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <p className="mt-2">{accounting.formatMoney(target.price, {
                            symbol: "",
                            format: "%v vnđ",
                            precision: 0,
                          })}</p>
                        </div>
                      </div>
                      <div className="mt-80" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Mô tả: </p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <p className="mt-2">{target.description}</p>
                        </div>
                      </div>

                    </form>
                    <div className="mt-110" style={{ display: "flex" }}>
                      <div className="col-lg-4 ms-10">
                        <Link to="/listService">
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

export default DetailService;
