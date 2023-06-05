import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import ImageGallery from "../common/ImageGallery";
import { storage } from "../firebase/index.js";
import Sidebar from "../common/admin/sidebar";
import jwt_decode from "jwt-decode";
function EditBranch() {
  const url = "http://localhost:8080/api/admin/branch";
  const { id } = useParams();
  const [target, setTarget] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState([]);
  const [statusFromGallery, setStatusFromGallery] = useState();
  const [imagesArray, setImagesArray] = useState([]);
  const [uploading, setUploading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    } else if (!["[ROLE_ADMIN]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
    }
  }, []);
  //Get data vào target
  useEffect(() => {
    if (id) {
      axios
        .get(`${url}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods":
              "PUT, POST, GET, DELETE, PATCH, OPTIONS",
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((resp) => {
          setTarget(resp.data);
          setDataUpdate(resp.data);
        });
    }
  }, [id]);

  // Get data cho dataview, hiển thị hình ảnh trong gallery
  useEffect(() => {
    if (target && target.media) {
      const urlArray = target.media.map((item) => item.url);
      setDataView(urlArray);
      DeleteMedia();
    }
  }, [target]);

  // Lấy đữ liệu được thay đổi trong gallery ( Bao gồm dữ liệu hiện tại, hoặc dữ liệu mới)
  useEffect(() => {
    if (imagesArray !== dataView) {
      const updatedTarget = {
        ...dataUpdate,
        media: imagesArray.map((url) => url),
      };
      setDataUpdate(updatedTarget);
    }
  }, [imagesArray]);

  //Xoá dữ liệu trong media của target
  const DeleteMedia = () => {
    setDataUpdate((prevData) => ({
      ...prevData,
      media: [],
    }));
  };

  const handleDataFromImageGallery = (data) => {
    setImagesArray(data);
  };

  const handleStatusFromGallery = (data) => {
    setStatusFromGallery(data);
  };

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setUploading(false);
    if (id) {
      const requestData = data ? data : dataUpdate;
      axios
        .patch(`${url}/${id}`, requestData, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods":
              "PUT, POST, GET, DELETE, PATCH, OPTIONS",
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((resp) => {
          navigate("/branch");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const UpdateMedia = () => {
    const updatedTarget = { ...dataUpdate };
    updatedTarget.media = dataView.map((url) => url);
    setDataUpdate(updatedTarget);
  };

  const handleChange = (element) => {
    const { name, value } = element.target;
    setDataUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Refresh
  const handleReset = () => {
    setDataUpdate({
      name: "",
      address: "",
    });
  };

  const handleUploadMultiImage = async () => {
    try {
      setUploading(true);
      const updatedData = { ...dataUpdate };
      updatedData.media = [];

      await Promise.all(
        imagesArray.map(async (image) => {
          const imageref = ref(storage, `images/${v4() + image.name}`);
          const snapshot = await uploadBytes(imageref, image);
          const url = await getDownloadURL(snapshot.ref);
          updatedData.media.push(url);
        })
      );

      onSubmit(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBranch = () => {
    if (statusFromGallery === true) {
      handleUploadMultiImage();
    } else {
      UpdateMedia();
      onSubmit();
    }
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
                    <h2>Chỉnh sửa chi nhánh</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero End */}
        {/* Services Area Start */}
        <div className="row">
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
                        <ImageGallery
                          data={dataView}
                          sendDataToParent={handleDataFromImageGallery}
                          sendStatus={handleStatusFromGallery}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8">
                    <h3 className="mb-30">Chỉnh sửa chi nhánh</h3>
                    <form action="#">
                      <div className="mt-80" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Tên Chi Nhánh</p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <input
                            type="text"
                            name="name"
                            placeholder="256 Nguyễn Văn Linh"
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                            onBlur={(e) => {
                              e.target.placeholder = "Tên Chi Nhánh";
                            }}
                            required
                            className="single-input"
                            value={dataUpdate.name}
                            // defaultValue={dataUpdate.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="mt-80" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Địa chỉ</p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <input
                            type="text"
                            name="address"
                            placeholder="Hải Châu"
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                            onBlur={(e) => {
                              e.target.placeholder = "Địa chỉ";
                            }}
                            required
                            className="single-input"
                            value={dataUpdate.address}
                            // defaultValue={dataUpdate.address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </form>
                    <div className="mt-110" style={{ display: "flex" }}>
                      <div className="col-lg-4 ms-10">
                        <Link to="/branch">
                          <div className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn">
                            Trở về
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-4 ms-10">
                        <button
                          className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                          type="reset"
                          onClick={handleReset}
                        >
                          Làm mới
                        </button>
                      </div>
                      <div className="col-lg-4">
                        <button
                          className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                          type="submit"
                          onClick={updateBranch}
                        >
                          Cập nhật
                        </button>
                      </div>
                    </div>
                  </div>
                  {uploading && <div className="progress-bar"></div>}
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

export default EditBranch;
