import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ImageGallery from '../common/ImageGallery';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../firebase/index.js";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../common/admin/sidebar";

function EditService() {
  const service = "http://localhost:8080/api/hairService"
  const { id } = useParams();
  const [target, setTarget] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState([]);
  const [statusFromGallery, setStatusFromGallery] = useState();
  const [imagesArray, setImagesArray] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [valid, setValid] = useState({});
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
      axios.get(`${service}/${id}`, {
        headers: {
          "Authorization": "Bearer " + accessToken,
        },
      }).then((resp) => {
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

  // Lấy dữ liệu được thay đổi trong gallery ( Bao gồm dữ liệu hiện tại, hoặc dữ liệu mới)
  useEffect(() => {
    if (imagesArray !== dataView) {
      const updatedTarget = { ...dataUpdate, media: imagesArray.map((url) => url) };
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
        .patch(`${service}/${id}`, requestData, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "PATCH",
            "Access-Control-Allow-Credentials": "true",
            "Authorization": "Bearer " + accessToken,
          },
        })
        .then((resp) => {
          navigate("/listService");
          toast.success("Cập nhật thành công");
        })
        .catch((error) => {
          if (error.response) {
            // Xử lý lỗi phản hồi từ API
            const errorData = error.response.data;
            if (errorData && Array.isArray(errorData) && errorData.length > 0) {
              const validationErrors = {};
              errorData.forEach(error => {
                validationErrors[error.field] = error.defaultMessage;
              });
              setValid(validationErrors);
            }
          } else {
            // Xử lý các lỗi khác
            console.log(error);
          }
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

  const handleReset = () => {
    setTarget({
      name: "",
      price: 0,
      description: "",
      type: "",
      media: []
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
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70 text-center">
                  <h2>Chỉnh sửa dịch vụ</h2>
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
          <section id="section">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="gallery-area" style={{ 'paddingTop': '60px' }}>
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
                  <form id="form" style={{ textAlign: "left", color: "black", width: "80%" }}>
                    <div className="mt-10-huyentn" style={{ 'display': 'flex' }}>
                      <div className="col-lg-3 col-md-4">
                        {/* <p className="mt-2">Tên dịch vụ {valid.name && <span style={{error}}>{valid.name}</span>}</p> */}
                        <label htmlFor="exampleInputPassword1" className="form-label">Tên dịch vụ </label>
                      </div>
                      <div className="col-lg-9 col-md-4">
                        <input
                          placeholder="Tên dịch vụ"
                          value={dataUpdate.name}
                          type="text"
                          name='name'
                          className="single-input"
                          onChange={handleChange}
                          id="exampleInputPassword1" />
                        {valid.name && <span className="span-huyentn">{valid.name}</span>}
                      </div>
                    </div>

                    <div className="mt-10-huyentn" style={{ 'display': 'flex' }}>
                      <div className="col-lg-3 col-md-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Giá </label>
                      </div>
                      <div className="col-lg-9 col-md-4">
                        <input
                          type="number"
                          placeholder="Giá"
                          className="single-input"
                          value={dataUpdate.price}
                          name='price'
                          onChange={handleChange}
                          id="price" />
                        {valid.price && <span className="span-huyentn">{valid.price}</span>}
                      </div>
                    </div>

                    <div className="mt-10-huyentn" style={{ 'display': 'flex' }}>
                      <div className="col-lg-3 col-md-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Mô tả </label>
                      </div>
                      <div className="col-lg-9 col-md-4">
                        <textarea
                          type="text"
                          placeholder="Mô tả"
                          className="single-input"
                          value={dataUpdate.description}
                          name='description'
                          onChange={handleChange}
                          id="description" />
                        {valid.description && <span className="span-huyentn">{valid.description}</span>}
                      </div>
                    </div>

                    <div className="mt-10-huyentn" style={{ display: 'flex' }}>
                      <div className="col-lg-3 col-md-4">
                        <label htmlFor="type" className="form-label">Loại dịch vụ</label>
                      </div>
                      <div className="col-lg-9 col-md-4">
                        <select
                          id="type"
                          className="single-input"
                          value={dataUpdate.type}
                          name="type"
                          onChange={handleChange}>
                          <option value="">Chọn loại dịch vụ</option>
                          <option value="1">Chăm sóc tóc</option>
                          <option value="2">Chăm sóc da</option>
                        </select>
                        {valid.type && <span className="span-huyentn">{valid.type}</span>}
                      </div>
                    </div>

                    <div className="mt-10-huyentn" style={{ 'display': 'flex' }}>
                      <div className="col-lg-4">
                        <Link to="/listService">
                          <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn">Trở về</button>
                        </Link>
                      </div>
                      <div className="col-lg-4">
                        <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                          type="reset" onClick={handleReset}>Làm mới </button>
                      </div>
                      <div className="col-lg-4">
                        <div className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                          type="submit" onClick={updateBranch}>Cập nhật</div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default EditService;